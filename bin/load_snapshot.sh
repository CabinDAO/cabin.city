#!/bin/bash

set -euo pipefail
#set -x

DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
SNAPSHOT=${1:-}  # if no snapshot path is provided, it will load directly from POSTGRES_SNAPSHOT_SRC_URL

# only load env vars from .env file if POSTGRES_URL is not set
[ -z "${POSTGRES_URL:-}" ] && [ -f "$DIR/../.env" ] && source "$DIR/../.env"

# to load into prod, set POSTGRES_URL to the prod db url and pass a snapshot file as an argument
# to load into dev, set POSTGRES_URL to the dev db url and POSTGRES_SNAPSHOT_SRC_URL to the prod db url (or pass a snapshot file as an argument)

[ -z "${POSTGRES_URL:-}" ] && echo "\$POSTGRES_URL must be set" && exit 1
[ -z "${SNAPSHOT}" ] && [ -z "${POSTGRES_SNAPSHOT_SRC_URL:-}" ] && echo "\$POSTGRES_SNAPSHOT_SRC_URL must be set or a snapshot file must be provided as an argument" && exit 1

if [[ $POSTGRES_URL =~ postgres(ql)?://([A-Za-z0-9]+):([^@]+)@([A-Za-z0-9.-]+)(:([0-9]+))?/([A-Za-z0-9]+) ]]; then
    user="${BASH_REMATCH[2]}"
    pass="${BASH_REMATCH[3]}"
    host="${BASH_REMATCH[4]}"
    port="${BASH_REMATCH[6]:-5432}"
    db="${BASH_REMATCH[7]}"
else
  echo "POSTGRES_URL must include user, password, host, port, and db name"
  exit 1
fi


connections=$(PGPASSWORD="$pass" psql -U "$user" -h "$host" -p "$port" postgres -t \
  -c "SELECT COUNT(*) FROM pg_stat_activity where usename='$user';" | \
  tr -d '[:space:]')

[ "$connections" -gt 1 ] && echo "Close all other active db connections before loading snapshot" && exit 1


if [ -z "$SNAPSHOT" ]; then
  echo "testing remote connection before dropping local db"
  pg_dump "$POSTGRES_SNAPSHOT_SRC_URL" --schema-only -t pg_namespace > /dev/null || (echo "Failed to connect to snapshot source db" && exit 1)
fi


echo "dropping and recreating db"
PGPASSWORD="$pass" psql -U "$user" -h "$host" -p "$port" postgres \
  -c "DROP DATABASE IF EXISTS $db;" \
  -c "CREATE DATABASE $db;"


postgres_url_trimmed="${POSTGRES_URL%%\?*}" ## Remove options query string
if [ -n "$SNAPSHOT" ]; then
  echo "loading snapshot from ${SNAPSHOT}"
  cat "$SNAPSHOT" | psql "$postgres_url_trimmed"
else
  echo "loading snapshot from src db"
  pg_dump "$POSTGRES_SNAPSHOT_SRC_URL" | psql "$postgres_url_trimmed"
fi


if [[ $postgres_url_trimmed == *"localhost"* ]]; then
  echo 'update "Profile" set "citizenshipStatus" = '"'Verified'"', "citizenshipTokenId" = 3, "citizenshipMintedAt" = '"'2023-04-01 12:00:00'"', "isAdmin" = true, "privyDID" = '"'did:privy:cllbg13gx00gvl308y233umlo'"' where id = 822;' | psql "$postgres_url_trimmed"
fi

### how to load only data without db drop/create
# npx prisma migrate reset
# pg_dump --data-only --exclude-table _prisma_migrations "$POSTGRES_SNAPSHOT_SRC_URL" | psql "$POSTGRES_URL"
