import { RoleResource } from 'fauna-gql-upload'
import { query as q } from 'faunadb'

const publicRole: RoleResource = {
  name: 'public',
  privileges: [
    {
      resource: q.Collection('Account'),
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
  ],
}

export default publicRole
