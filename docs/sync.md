# Synchronization

The app caches data from on-chain sources and subgraphs to make it easier to query and display.

The sync jobs that support this app are somewhat complicated so we're documenting some important
notes about how they work and how to test them.

## How synchronization works

Each sync job is run periodically on its own cron schedule. See `vercel.json` for cron
configuration.

A sync job is invoked by calling its respective endpoint, e.g. `/api/sync/cabin-token`.

Sync attempts target a specific block range. Block ranges are used when synchronizing directly from
on-chain data sources (cabin token) and also from subgraphs (hats, otterspace).

Sync attempts are locked via the Fauna database to prevent duplicate jobs from colliding with one
another and to facilitate retries in the case of failures.

Synchronized data is expected to work at the `Account` level, meaning a registered `Profile` does
not need to exist in order for data to be imported. This allows synchronized data to be available to
end users immediately after their `Profile` is created.

## Synchronization test scenarios

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
