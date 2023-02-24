import {
  ProfileContactFieldInput,
  ProfileRoleInput,
  useUpdateProfileMutation,
} from '@/generated/graphql'
import { useUser } from '../auth/useUser'

interface UpdateUserProps {
  roles?: ProfileRoleInput[]
  bio?: string
  location?: string
  contactFields?: ProfileContactFieldInput[]
}

export function useUpdateProfile() {
  const { user } = useUser()
  const [updateProfileMutation] = useUpdateProfileMutation()

  const updateProfile = async (input: UpdateUserProps) => {
    if (user) {
      const { data } = await updateProfileMutation({
        variables: {
          id: user._id,
          ...input,
        },
      })

      if (data?.partialUpdateProfile) {
        return data.partialUpdateProfile
      } else {
        return null
      }
    }
  }

  return { updateProfile }
}
