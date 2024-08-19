#!/bin/bash

set -euo pipefail
#set -x

DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

[ -f "$DIR/../.env" ] && source "$DIR/../.env"

[ -z "${POSTGRES_URL:-}" ] && echo "\$POSTGRES_URL must be set" && exit 1
[ -z "${POSTGRES_SNAPSHOT_SRC_URL:-}" ] && echo "\$POSTGRES_SNAPSHOT_SRC_URL must be set" && exit 1

if [[ $POSTGRES_URL =~ postgresql://([A-Za-z0-9]+):([^@]+)@([A-Za-z0-9.]+):([0-9]+)/([A-Za-z0-9]+) ]]; then
    user="${BASH_REMATCH[1]}"
    pass="${BASH_REMATCH[2]}"
    host="${BASH_REMATCH[3]}"
    port="${BASH_REMATCH[4]}"
    db="${BASH_REMATCH[5]}"
else
  echo "POSTGRES_URL must include user, password, host, port, and db name"
  exit 1
fi


connections=$(PGPASSWORD="$pass" psql -U "$user" -h "$host" -p "$port" postgres -t \
  -c "SELECT COUNT(*) FROM pg_stat_activity where usename='$user';" | \
  tr -d '[:space:]')

[ "$connections" -gt 1 ] && echo "Close all other active db connections before loading snapshot" && exit 1


echo "testing remote connection before dropping local db"
pg_dump "$POSTGRES_SNAPSHOT_SRC_URL" --schema-only -t pg_namespace > /dev/null || (echo "Failed to connect to snapshot source db" && exit 1)


PGPASSWORD="$pass" psql -U "$user" -h "$host" -p "$port" postgres \
  -c "DROP DATABASE IF EXISTS $db;" \
  -c "CREATE DATABASE $db;"


echo "loading snapshot"
postgres_url_trimmed="${POSTGRES_URL%%\?*}" ## Remove options query string
pg_dump "$POSTGRES_SNAPSHOT_SRC_URL" | psql "$postgres_url_trimmed"
