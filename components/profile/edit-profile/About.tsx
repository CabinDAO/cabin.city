import { AboutInput } from '../AboutInput'
import { UpdateProfileProps } from './UpdateProfileProps'
import { UpdateSection } from './UpdateSection'

export const About = ({
  editProfileInput,
  onChange,
  user,
}: UpdateProfileProps) => {
  const bio = editProfileInput?.bio ?? user?.bio ?? ''
  const location = editProfileInput?.location ?? user?.location ?? ''

  return (
    <UpdateSection title="About">
      <AboutInput
        bio={bio}
        location={location}
        onBioChange={(bio) => onChange({ ...editProfileInput, bio })}
        onLocationChange={(location) =>
          onChange({ ...editProfileInput, location })
        }
      />
    </UpdateSection>
  )
}
