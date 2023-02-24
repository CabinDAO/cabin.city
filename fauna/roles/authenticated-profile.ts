import { RoleResource } from 'fauna-gql-upload'
import { query as q } from 'faunadb'

const authenticatedProfileRole: RoleResource = {
  name: 'authenticated-profile',
  privileges: [
    /* Collections */
    {
      resource: q.Collection('Account'),
      actions: {
        read: true,
        write: true,
      },
    },
    {
      resource: q.Collection('Profile'),
      actions: {
        read: true,
        create: true,
        write: true,
      },
    },
    {
      resource: q.Collection('account_hats'),
      actions: {
        read: true,
      },
    },
    {
      resource: q.Collection('Activity'),
      actions: {
        read: true,
        create: true,
      },
    },
    {
      resource: q.Collection('Hat'),
      actions: {
        read: true,
      },
    },
    {
      resource: q.Collection('OtterspaceBadge'),
      actions: {
        read: true,
      },
    },
    {
      resource: q.Collection('OtterspaceBadgeSpec'),
      actions: {
        read: true,
      },
    },
    {
      resource: q.Collection('TrackingEvent'),
      actions: {
        create: true,
        write: true,
        read: true,
      },
    },
    /* Indexes */
    {
      resource: q.Index('account_badges_by_account'),
      actions: {
        read: true,
      },
    },
    {
      resource: q.Index('account_by_address_casefold'),
      actions: {
        read: true,
      },
    },
    {
      resource: q.Index('account_hats_by_account'),
      actions: {
        read: true,
      },
    },
    {
      resource: q.Index('account_hats_by_account_and_hat'),
      actions: {
        read: true,
      },
    },
    {
      resource: q.Index('account_hats_by_hat'),
      actions: {
        read: true,
      },
    },
    {
      resource: q.Index('account_profile_by_account'),
      actions: {
        read: true,
      },
    },
    {
      resource: q.Index('tracking_events_by_key_and_profile'),
      actions: {
        read: true,
      },
    },
    {
      resource: q.Index('profile_trackingEvents_by_profile'),
      actions: {
        read: true,
      },
    },
    {
      resource: q.Index('activities_sorted_by_timestamp'),
      actions: {
        read: true,
      },
    },
    {
      resource: q.Index('accounts_with_cabin_token_balance'),
      actions: {
        read: true,
      },
    },
    {
      resource: q.Index('profiles_by_citizenship_status'),
      actions: {
        read: true,
      },
    },
    /* Functions */
    {
      resource: q.Function('me'),
      actions: {
        call: true,
      },
    },
    {
      resource: q.Function('log_tracking_event'),
      actions: {
        call: true,
      },
    },
    {
      resource: q.Function('all_activities'),
      actions: {
        call: true,
      },
    },
    {
      resource: q.Function('profiles_count'),
      actions: {
        call: true,
      },
    },
    {
      resource: q.Function('token_holders_count'),
      actions: {
        call: true,
      },
    },
    {
      resource: q.Function('profiles_by_citizenship_status_count'),
      actions: {
        call: true,
      },
    },
  ],
  membership: [
    {
      resource: q.Collection('Profile'),
    },
  ],
}

export default authenticatedProfileRole
