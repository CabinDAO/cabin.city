import {
  ProfileRoleType,
  UpdateProfileInput,
  useUpdateProfileMutation,
} from '@/generated/graphql'

interface UpdateProfileProps {
  data?: UpdateProfileInput
  roleTypes?: ProfileRoleType[]
}

export function useUpdateProfile(profileId: string | undefined) {
  const [updateProfileMutation] = useUpdateProfileMutation()

  const updateProfile = async (props: UpdateProfileProps) => {
    if (profileId) {
      const { data } = await updateProfileMutation({
        variables: {
          id: profileId,
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
