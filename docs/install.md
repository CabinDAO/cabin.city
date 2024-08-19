# Getting the app up and running locally

The app is developed on Linux, so these instructions will be best for that platform. 
It's also been tried on Mac but may not be up to date. If you're on Windows, you're on your own.

## Dependencies

### Git

Linux: `sudo apt install git`
Mac: `brew install git`

To commit, you'll need a github.com account. Make sure you add your ssh key to that account.

### Postgres 16

Linux: `sudo apt install postgresql-16`
Mac: [Postgres.app](https://postgresapp.com) or `brew install postgresql`. Make sure `psql` is installed too.

### Node.js

We recommend installing Node with [n-install](https://github.com/mklement0/n-install) for both Linux and Mac.

```bash
curl -L https://bit.ly/n-install | bash
```

### An editor

We use [WebStorm](https://www.jetbrains.com/webstorm/), but [Visual Studio Code](https://code.visualstudio.com) is also good.

Make sure to set the Node path in the settings and enable Prettier formatting on save.

## Get the Code

```bash
git clone git@github.com:CabinDAO/cabin.city.git
cd cabin.city
npm install
```

## Database setup

```sql
CREATE DATABASE cabin;
CREATE USER cabin WITH PASSWORD 'cabin';
ALTER USER cabin CREATEDB;
GRANT ALL PRIVILEGES ON DATABASE cabin TO cabin;
ALTER DATABASE cabin OWNER TO cabin;
```


## Env setup

Copy the `.env.example` file to `.env` and fill in the values, especially the db connection info.

```bash
cp .env.example .env
```

### Google Maps Places API

Follow [these instructions](https://developers.google.com/maps/documentation/places/web-service/get-api-key)
to create an API key for the `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` env var.


## Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
