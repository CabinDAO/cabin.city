[Cabin](https://cabin.city) is building a network city of modern villages. Together, 
we are growing intergenerational neighborhoods: places where we know our neighbors and 
raise kids together. Cabin neighborhoods are located in walkable pockets of family-friendly 
urbanism with nearby parks and nature. Our goal is to create neighborhoods where 
we'd want to grow up.

This repo is the code for the Cabin app.

## Dev Setup

See the [installation guide](docs/install.md) for instructions.


## Smart Contracts Management

[More info here](docs/contracts.md).


## Development/Deployment Flow

When working on a new feature, follow these steps:

- Create a new branch from `dev`
- Make your changes
- Create a PR to `dev`
    - This will create a preview deployment on Vercel
- Once the PR is approved, merge it into `dev`
    - This will also run migrations, if any, so that the database is up to date
    - The changes will be live on the dev environment: https://cabin-census-dev.vercel.app/
- Once the changes are tested and ready to be deployed to production, create a PR from `dev`
  to `main`
    - Make sure you double check all the changes previously merged to `dev`
- Once the PR is approved, merge it into `main` and push it
    - Migrations will be run against the production database


## Google Analytics

[More info here](docs/analytics.md).


## UI Components

*Removed for now. It's lazy-universal-dotenv dependency had an ancient dotenv version and broke our
env var loading*

Storybook is used to document and develop UI components. To run storybook:

```bash
npm run storybook
```


## Onchain Data Sync

[More info here](docs/sync.md).


## Deployment

Commits to `main` are deployed automatically. 

To deploy manually:

```bash
# Login if not already logged in
vercel login

# Deploy to dev
vercel

# Deploy to prod
vercel --prod
```


## Github Actions

TODO


## Code Generation

To generate GQL code for Hats and Otterspace synced data, run:

```bash
npm run codegen
```

To generate the smart contract types:

- get ABI file for the contract you want from Etherscan and put it in the `lib/abi` dir
    - eg go to https://etherscan.io/address/0x1934e252f840aa98dfce2b6205b3e45c41aef830#code, scroll down to Contract ABI and export in JSON format
- run `npm run contract:gen`, which puts generated files into `generated/contract` dir
