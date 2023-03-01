import { query as q } from 'faunadb'
import { FunctionResource } from 'fauna-gql-upload'
import { SetApprenticeRoles } from '../lib/SetApprenticeRoles'
import { Coalesce } from '../lib/Coalesce'

const updateProfile: FunctionResource = {
  name: 'update_profile',
  body: q.Query(
    q.Lambda(
      ['id', 'data', 'roleTypes'],
      q.Let(
        {
          profileRef: q.Ref(q.Collection('Profile'), q.Var('id')),
          profile: q.Get(q.Var('profileRef')),
          // If the data contains roleTypes, these need to be merged with the existing roles
          newRoles: q.If(
            q.Not(q.IsNull(q.Var('roleTypes'))),
            SetApprenticeRoles(q.Var('profile'), q.Var('roleTypes')),
            q.Select(['data', 'roles'], q.Var('profile'))
          ),
          // Merge the new roles with the new data
          newData: q.Merge(Coalesce(q.Var('data'), {}), {
            roles: q.Var('newRoles'),
          }),
          // Merge the new data with the existing data
          mergedData: q.Merge(
            q.Select(['data'], q.Var('profile')),
            q.Var('newData')
          ),
        },
        q.Update(q.Var('profileRef'), {
          data: q.Var('mergedData'),
        })
      )
    )
  ),
}

export default updateProfile
