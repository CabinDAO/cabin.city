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
