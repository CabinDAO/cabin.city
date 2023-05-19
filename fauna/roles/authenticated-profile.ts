import { RoleResource } from 'fauna-gql-upload'
import { query as q } from 'faunadb'
import { deleteOnlyBy } from './predicates/deleteOnlyBy'
import { publicOrAuthenticatedPrivileges } from '../lib/role-utils'
import { writeOnlyBy } from './predicates/writeOnlyBy'

const authenticatedProfileRole: RoleResource = {
  name: 'authenticated-profile',
  privileges: [
    ...publicOrAuthenticatedPrivileges,
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
      resource: q.Collection('ProfileVouch'),
      actions: {
        read: true,
        create: true,
        write: true,
        delete: true,
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
        delete: deleteOnlyBy('profile'),
      },
    },
    {
      resource: q.Collection('ActivityReaction'),
      actions: {
        read: true,
        create: true,
        delete: true,
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
    {
      resource: q.Collection('Location'),
      actions: {
        read: true,
        create: true,
        delete: deleteOnlyBy('caretaker'),
        write: writeOnlyBy('caretaker'),
      },
    },
    {
      resource: q.Collection('Offer'),
      actions: {
        create: true,
        read: true,
        write: true,
        delete: true,
      },
    },
    {
      resource: q.Collection('LocationVote'),
      actions: {
        read: true,
        delete: true,
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
      resource: q.Index('activityReaction_activity_by_activity'),
      actions: {
        read: true,
      },
    },
    {
      resource: q.Index('activityReaction_by_activity_and_profile'),
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
    {
      resource: q.Index('allProfiles'),
      actions: {
        read: true,
      },
    },
    {
      resource: q.Index('profiles_sort_by_createdAt_asc'),
      actions: {
        read: true,
      },
    },
    {
      resource: q.Index('profiles_sort_by_createdAt_desc'),
      actions: {
        read: true,
      },
    },
    {
      resource: q.Index('profiles_sort_by_cabinBalance_asc'),
      actions: {
        read: true,
      },
    },
    {
      resource: q.Index('profiles_sort_by_cabinBalance_desc'),
      actions: {
        read: true,
      },
    },
    {
      resource: q.Index('profiles_sort_by_badgeCount_asc'),
      actions: {
        read: true,
      },
    },
    {
      resource: q.Index('profiles_sort_by_badgeCount_desc'),
      actions: {
        read: true,
      },
    },

    {
      resource: q.Index('profiles_by_role'),
      actions: {
        read: true,
      },
    },
    {
      resource: q.Index('profiles_by_level'),
      actions: {
        read: true,
      },
    },
    {
      resource: q.Index('activities_by_profile'),
      actions: {
        read: true,
      },
    },
    {
      resource: q.Index('unique_profile_vouches'),
      actions: {
        read: true,
      },
    },
    {
      resource: q.Index('profile_vouches_by_vouchee'),
      actions: {
        read: true,
      },
    },
    {
      resource: q.Index('receivedVouches_by_profile'),
      actions: {
        read: true,
      },
    },
    {
      resource: q.Index('givenVouches_by_profile'),
      actions: {
        read: true,
      },
    },
    {
      resource: q.Index('profiles_by_name_ngram'),
      actions: {
        read: true,
      },
    },
    {
      resource: q.Index('profile_vouches_by_voucher'),
      actions: {
        read: true,
      },
    },
    {
      resource: q.Index('unique_Activity_key'),
      actions: {
        read: true,
      },
    },
    {
      resource: q.Index('caretakerLocations_by_profile'),
      actions: {
        read: true,
      },
    },
    {
      resource: q.Index('referredLocations_by_profile'),
      actions: {
        read: true,
      },
    },
    {
      resource: q.Index('location_offers_by_location'),
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
      resource: q.Function('account_by_address'),
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
    {
      resource: q.Function('update_profile'),
      actions: {
        call: true,
      },
    },
    {
      resource: q.Function('get_profiles'),
      actions: {
        call: true,
      },
    },
    {
      resource: q.Function('get_activities_by_profile'),
      actions: {
        call: true,
      },
    },
    {
      resource: q.Function('vouch_profile'),
      actions: {
        call: true,
      },
    },
    {
      resource: q.Function('unvouch_profile'),
      actions: {
        call: true,
      },
    },
    {
      resource: q.Function('like_activity'),
      actions: {
        call: true,
      },
    },
    {
      resource: q.Function('unlike_activity'),
      actions: {
        call: true,
      },
    },
    {
      resource: q.Function('my_vouches_this_year'),
      actions: {
        call: true,
      },
    },
    {
      resource: q.Function('create_text_activity'),
      actions: {
        call: true,
      },
    },
    {
      resource: q.Function('create_location'),
      actions: {
        call: true,
      },
    },
    {
      resource: q.Function('create_offer'),
      actions: {
        call: true,
      },
    },
    {
      resource: q.Function('delete_location'),
      actions: {
        call: true,
      },
    },
    {
      resource: q.Function('delete_offer'),
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
