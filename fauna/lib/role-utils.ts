import { query as q } from 'faunadb'
import { Privilege } from 'fauna-gql-upload'

export const publicOrAuthenticatedPrivileges: Privilege[] = [
  /* Collections */
  {
    resource: q.Collection('Location'),
    actions: {
      read: true,
    },
  },
  {
    resource: q.Collection('Profile'),
    actions: {
      read: true,
    },
  },
  /* Indexes */
  {
    resource: q.Index('locations_by_location_type'),
    actions: {
      read: true,
    },
  },
  /* Functions */
  {
    resource: q.Function('get_locations_by_location_type'),
    actions: {
      call: true,
    },
  },
]
