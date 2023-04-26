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
  {
    resource: q.Collection('Offer'),
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
  {
    resource: q.Index('offers_by_offerType'),
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
  {
    resource: q.Function('get_offers'),
    actions: {
      call: true,
    },
  },
  {
    resource: q.Function('offers_count'),
    actions: {
      call: true,
    },
  },
]
