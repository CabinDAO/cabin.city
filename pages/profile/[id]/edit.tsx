import { useRouter } from '@/components/hooks/useRouter'
import { EditProfileView } from '@/components/profile/EditProfileView'

export default function ProfileEditPage() {
  const router = useRouter()
  const { id } = router.query
  return <EditProfileView profileExternId={id as string} />
}
