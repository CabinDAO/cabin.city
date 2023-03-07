import { MeFragment, UpdateProfileInput } from '@/generated/graphql'

export interface UpdateProfileProps {
  editProfileInput: UpdateProfileInput | null
  onChange: (input: UpdateProfileInput) => void
  user: MeFragment
}
