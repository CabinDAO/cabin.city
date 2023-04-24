import { RoleResource } from 'fauna-gql-upload'
import { query as q } from 'faunadb'
import { publicOrAuthenticatedPrivileges } from '../lib/role-utils'

const publicRole: RoleResource = {
  name: 'public',
  privileges: [
    ...publicOrAuthenticatedPrivileges,
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
