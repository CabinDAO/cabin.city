import { MeFragment, ProfileEditParams } from '@/utils/types/profile'

export interface UpdateProfileProps {
  user: MeFragment
  profileEditParams: ProfileEditParams['data'] | null
  onChange: (input: ProfileEditParams['data']) => void
}
