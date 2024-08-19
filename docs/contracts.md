# Smart Contracts Management

## Pre-requisites

Make sure foundry is updated: https://book.getfoundry.sh/getting-started/installation

You can install the lastest version with `curl -L https://foundry.paradigm.xyz | bash`

Helpful commands:

- format: `npm run lint:contracts:fix` (update .sol files to adhere to styling rules)
- install: `forge install` install Solidity dependencies
- test: `forge test` (optionally add `-v` through `-vvvv` for failure message verbosity)

## Unlock Hooks

This [Smart Contract](contracts/src/CabinUnlockHooks.sol) is used to manage the Unlock hooks for the
Cabin app. See the Unlock Protocol
documentation [here](https://docs.unlock-protocol.com/core-protocol/public-lock/hooks/) for more
information. You can run.

## Mock Cabin Token Contract

This [Smart Contract](contracts/src/cabin-token/MockCabinToken.sol) is used to mock the Cabin Token
contract. It is used for testing purposes only.
