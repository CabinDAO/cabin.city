[Cabin](https://www.cabin.city) encourages coliving in nature for creators and remote workers.

The Census is Cabin’s membership directory.

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

### Setup database

1. Create a database following the [quick start](https://docs.fauna.com/fauna/current/learn/quick_start/quick_start).
2. From your database dashboard, go to `Security` -> `New Key` to create a new key with the `Admin` role.
3. Copy the key into the value for the `FGU_SECRET` in `.env.fauna.local`.
4. Run `npm run fauna` to initialize resources in your database.
5. Go to `Security` -> `New Key` again to create a new key with the `public` role.
6. Copy the key into the value for the `NEXT_PUBLIC_FAUNA_CLIENT_KEY` in `.env.local`.
7. Create a key with the `Server` role and copy it into the value for `FAUNA_SERVER_SECRET` in `.env.local`

### Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Smart Contracts Management

TBD

## Deployment

TBD

## UI Components

Storybook is used to document and develop UI components. To run storybook:

```bash
npm run storybook
```

## Fauna Database

### Test/Demo Setup

Since this app is dependent on data coming from outside sources, it is sometimes necessary to walk through some manual steps in a local or dev environment in order to set up a prod-like experience.

1. Reset the database
   `bin/run_script reset-db.ts`
2. Create one or more profiles by going through onboarding
3. To be able to test citizenship flows, you need to have one account that already has a citizenship NFT. You can do this via Airdrop via Unlock.
4. To test the Citizenship/Unlock moda locally, run ngrok update the `NEXT_PUBLIC_VERCEL_URL` environment variable
   `ngrok http 3000`

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

The sync jobs that support this app are somewhat complicated so we're documenting some important notes about how they work and how to test them.

### How synchronization works

Each sync job is run periodically on its own cron schedule.

A sync job is invoked by calling its respective endpoint, e.g. `/api/sync/cabin-token`.

Sync attempts target a specific block range. Block ranges are used when synchronizing directly from on-chain data sources (cabin token) and also from subgraphs (hats, otterspace).

Sync attempts are locked via the Fauna database to prevent duplicate jobs from colliding with one another and to facilitate retries in the case of failures.

Synchronized data is expected to work at the `Account` level, meaning a registered `Profile` does not need to exist in order for data to be imported. This allows synchronized data to be available to end users immediatelty after their `Profile` is created.

### Account -> Profile synchronization

Some `Account` data is denormalized to the `Profile` collection to better support sorting and filtering via Fauna indexes.

This synchronization occurs in 2 primary areas:

1. When a new `Profile` is created, some `Account` data is denormalized to the new `Profile`. See `SyncProfileBadgeCount.ts` for an example.
2. When a synchronization job runs and results in data updates for an `Account` the associated `Profile` data is also updated if it exists.

### Synchronization test scenarios

New `Profile` for `Account` with prior `cabinTokenBalance`

1. Run the `/sync/cabin-token` job until an account is created that has a `cabinTokenBalance` greater than zero.
2. Create a new profile, either through onboarding or using the `createProfile` mutation.
3. Verify the `cabinTokenBalanceInt` on the `Profile` is an accurate integer representation of the 18-decimal balance.

New `Profile` for `Account` with prior `badges`

1. Run the `/sync/otterspace-badges` job until an account is created that has badges.
2. Create a new profile, either through onboarding or using the `createProfile` mutation.
3. Verify the `badgeCount` on the `Profile` matches the number of badges owned by the `Account`.

Existing `Profile` with updated `cabinTokenBalance`

1. Create a new `Profile` that is associated with an `Account` that does not yet have a `cabinTokenBalance` or has a balance that has recently changed on-chain.
2. Run `/sync/cabin-token` until the `Account` has a `cabinTokenBalance`.
3. Verify the `cabinTokenBalanceInt` on the `Profile` is an accurate integer representation of the 18-decimal balance.

Existing `Profile` with updated `badges`

1. Create a new `Profile` that is associated with an `Account` that does not yet have `badges` or has `badges` that have recently been changed on-chain.
2. Run `/sync/otterspace-badges` until the `Account` has the updated `badges`.
3. Verify the `badgeCount` on the `Profile` matches the number of badges owned by the `Account`.
