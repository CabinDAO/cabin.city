[Cabin](https://www.cabin.city) encourages coliving in nature for creators and remote workers.

The Census is Cabin’s membership directory.

Production environment: https://app.cabin.city
Dev environment: https://cabin-census-dev.vercel.app/

## Setup

### Dependencies

Make sure you are using the right node version. We recommend using `nvm` to manage node versions.

```bash
nvm use
```

Install dependencies:

```bash
npm install
```

### Setup environment variables

Copy the `.env.example` file to `.env` and fill in the values.

```bash
cp .env.example .env
```

### Fauna local dev db setup

Fauna is our hosted db. There are two shared databases: dev (really more like staging) and prod.

To create your own db for local dev:

1. Create a database following
   the [quick start](https://docs.fauna.com/fauna/current/learn/quick_start/quick_start).
2. From your database dashboard, go to `Security` -> `New Key` to create a new key with the `Admin`
   role.
3. Copy the key into the value for the `FGU_SECRET` in `.env.fauna.local`.
4. Run `npm run fauna` to initialize resources in your database. There are no fixtures (initial
   data) yet (I think?).
5. Go to `Security` -> `New Key` again to create a new key with the `public` role.
6. Copy the key into the value for the `NEXT_PUBLIC_FAUNA_CLIENT_KEY` in `.env.local`.
7. Create a key with the `Server` role and copy it into the value for `FAUNA_SERVER_SECRET`
   in `.env.local`

### Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Setup Google Maps Places API

Follow [these instructions](https://developers.google.com/maps/documentation/places/web-service/get-api-key)
to create an API key and set the `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` env var.

## Smart Contracts Management

### Pre-requisites

Make sure foundry is updated: https://book.getfoundry.sh/getting-started/installation

You can install the lastest version with `curl -L https://foundry.paradigm.xyz | bash`

Helpful commands:

- format: `npm run lint:contracts:fix` (update .sol files to adhere to styling rules)
- install: `forge install` install Solidity dependencies
- test: `forge test` (optionally add `-v` through `-vvvv` for failure message verbosity)

### Unlock Hooks

This [Smart Contract](contracts/src/CabinUnlockHooks.sol) is used to manage the Unlock hooks for the
Cabin app. See the Unlock Protocol
documentation [here](https://docs.unlock-protocol.com/core-protocol/public-lock/hooks/) for more
information. You can run.

### Mock Cabin Token Contract

This [Smart Contract](contracts/src/cabin-token/MockCabinToken.sol) is used to mock the Cabin Token
contract. It is used for testing purposes only.

## Development/Deployment Flow

When working on a new feature, follow these steps:

- Create a new branch from `dev`
- Make your changes
- Create a PR to `dev`
    - This will create a preview deployment on Vercel
- Once the PR is approved, merge it into `dev`
    - This will also run fauna migrations, if any, so that the database is up to date
    - The changes will be live on the dev environment: https://cabin-census-dev.vercel.app/
- Once the changes are tested and ready to be deployed to production, create a PR from `dev`
  to `main`
    - Make sure you double check all the changes previously merged to `dev`
- Once the PR is approved, merge it into `main`
    - Fauna migrations will be run against the production database

## Google Analytics

The following custom events are being tracked:

- **share:** it tracks when a user shares a profile
- **sign_in_click:** when a user clicks the sign in button
- **vote_modal_click:** triggered when a user clicks the vote button
- **contact_caretaker_click:** tracked when a user clicks the contact caretaker button
- **apply_to_experience_click:** tracked when a user clicks on the apply now button
- **external_link_click:** generic event to track external URLs such as discord, twitter, notion
  docs, etc.
- **react_to_post:** tracked when a user reacts to a post (like or unlike)
- **mint_button:** tracked when a user clicks on the citizenship mint button
- **view_city_directory**: tracked when a user clicks on the view city directory button. Optionally,
  it can track an specific listing by passing the `listing_id` as a parameter.
- **view_experiences:** tracked when a user clicks on the view experiences button. Optionally, it
  can track an specific listing by passing the `experience_id` as a parameter.
- **nav_bar_click:** tracked when a user clicks on any of the nav bar links
- **faqItemExpand:** tracked when a user expands a FAQ item
- **role_cards_slideshow**: whenever a user clicks on the next or previous button on the role cards
  slideshow
- **found_citizen_learn_more:** tracked when a user clicks on the learn more button on the found
  citizen section
- **signal_interest:** tracked when a user clicks on the signal interest button
- **citizenship_share_discord:** tracked when a user clicks on the share on discord button
- **subscribe_to_newsletter:** tracked when a user subscribes to the newsletter

## UI Components

*Removed for now. It's lazy-universal-dotenv dependency had an ancient dotenv version and broke our
env var loading*

Storybook is used to document and develop UI components. To run storybook:

```bash
npm run storybook
```

## Fauna Database

### Test/Demo Setup

Since this app is dependent on data coming from outside sources, it is sometimes necessary to walk
through some manual steps in a local or dev environment in order to set up a prod-like experience.

1. Reset the database
   `bin/run_script reset-db.ts`
2. Create one or more profiles by going through onboarding
3. To be able to test citizenship flows, you need to have one account that already has a citizenship
   NFT. You can do this via Airdrop via Unlock.
4. To test the Citizenship/Unlock modal locally, run ngrok and update the `NEXT_PUBLIC_VERCEL_URL`
   environment variable
   `ngrok http 3000`

### Troubleshooting

Sometimes the Fauna GraphQL schema doesn't update correctly, e.g. when updating types for existing
queries. The quick fix for this is usally to run `npm run fauna -- --mode replace`.

### Clear all documents in a collection

```typescript
// Change `OtterspaceBadge` to the collection you want to clear
q.Map(
  q.Paginate(q.Documents(q.Collection('OtterspaceBadge')), {
    size: 9999,
  }),
  q.Lambda(['ref'], q.Delete(q.Var('ref')))
)
```

## Synchronization

The sync jobs that support this app are somewhat complicated so we're documenting some important
notes about how they work and how to test them.

### How synchronization works

Each sync job is run periodically on its own cron schedule. See `vercel.json` for cron
configuration.

A sync job is invoked by calling its respective endpoint, e.g. `/api/sync/cabin-token`.

Sync attempts target a specific block range. Block ranges are used when synchronizing directly from
on-chain data sources (cabin token) and also from subgraphs (hats, otterspace).

Sync attempts are locked via the Fauna database to prevent duplicate jobs from colliding with one
another and to facilitate retries in the case of failures.

Synchronized data is expected to work at the `Account` level, meaning a registered `Profile` does
not need to exist in order for data to be imported. This allows synchronized data to be available to
end users immediatelty after their `Profile` is created.

### Account -> Profile synchronization

Some `Account` data is denormalized to the `Profile` collection to better support sorting and
filtering via Fauna indexes.

This synchronization occurs in 2 primary areas:

1. When a new `Profile` is created, some `Account` data is denormalized to the new `Profile`.
   See `SyncProfileBadgeCount.ts` for an example.
2. When a synchronization job runs and results in data updates for an `Account` the
   associated `Profile` data is also updated if it exists.

### Synchronization test scenarios

New `Profile` for `Account` with prior `cabinTokenBalance`

1. Run the `/sync/cabin-token` job until an account is created that has a `cabinTokenBalance`
   greater than zero.
2. Create a new profile, either through onboarding or using the `createProfile` mutation.
3. Verify the `cabinTokenBalanceInt` on the `Profile` is an accurate integer representation of the
   18-decimal balance.

New `Profile` for `Account` with prior `badges`

1. Run the `/sync/otterspace-badges` job until an account is created that has badges.
2. Create a new profile, either through onboarding or using the `createProfile` mutation.
3. Verify the `badgeCount` on the `Profile` matches the number of badges owned by the `Account`.

Existing `Profile` with updated `cabinTokenBalance`

1. Create a new `Profile` that is associated with an `Account` that does not yet have
   a `cabinTokenBalance` or has a balance that has recently changed on-chain.
2. Run `/sync/cabin-token` until the `Account` has a `cabinTokenBalance`.
3. Verify the `cabinTokenBalanceInt` on the `Profile` is an accurate integer representation of the
   18-decimal balance.

Existing `Profile` with updated `badges`

1. Create a new `Profile` that is associated with an `Account` that does not yet have `badges` or
   has `badges` that have recently been changed on-chain.
2. Run `/sync/otterspace-badges` until the `Account` has the updated `badges`.
3. Verify the `badgeCount` on the `Profile` matches the number of badges owned by the `Account`.

## Deployment

```bash
# Login if not already logged in
vercel login

# Deploy to dev
vercel

# Deploy to prod
vercel --prod
```

## Github Actions

Github actions rely on two secrets:

- FGU_SECRET_PROD
- FGU_SECRET_DEV

If needed, this can be changed by going into [Fauna Dashboard](https://dashboard.fauna.com/), then
Security > Database Keys, and adding a new Admin key. The key can then be added to the Github
Secrets. See how this works in the [Github Actions Workflow](.github/workflows/fauna.yml).

## Code Generation

To generate Fauna GQL code for Hats and Otterspace synced data, run:

```bash
npm run codegen
```
