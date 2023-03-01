import {
  ProfileRoleType,
  UpdateProfileInput,
  useUpdateProfileMutation,
} from '@/generated/graphql'
import { useUser } from '../auth/useUser'

interface UpdateProfileProps {
  data?: UpdateProfileInput
  roleTypes?: ProfileRoleType[]
}

export function useUpdateProfile() {
  const { user } = useUser()
  const [updateProfileMutation] = useUpdateProfileMutation()

  const updateProfile = async (props: UpdateProfileProps) => {
    if (user) {
      const { data } = await updateProfileMutation({
        variables: {
          id: user._id,
          data: props.data,
          roleTypes: props.roleTypes,
        },
      })

      if (data?.updateProfile) {
        return data.updateProfile
      } else {
        return null
      }
    }
  }

  return { updateProfile }
}
