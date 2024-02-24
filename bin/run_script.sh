#!/bin/bash

# Example usage:
#   bin/run_script reset-db.ts
#   bin/run_script sync-until-done.ts http://localhost:3000/api/sync/hats

npx ts-node --skipProject --require dotenv/config "scripts/$1" "${@:2}"
