import { RoleResource } from 'fauna-gql-upload'
import { query as q } from 'faunadb'

const authenticatedProfileRole: RoleResource = {
  name: 'authenticated-profile',
  privileges: [
    {
      resource: q.Collection('Account'),
      actions: {
        read: true,
        write: true,
      },
    },
    {
      resource: q.Function('me'),
      actions: {
        call: true,
      },
    },
    {
      resource: q.Collection('Profile'),
      actions: {
        read: true,
        create: true,
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
  ],
  membership: [
    {
      resource: q.Collection('Profile'),
    },
  ],
}

export default authenticatedProfileRole
