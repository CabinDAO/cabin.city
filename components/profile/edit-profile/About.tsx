import { AboutInput } from '../AboutInput'
import { UpdateProfileProps } from './UpdateProfileProps'
import { UpdateSection } from './UpdateSection'

export const About = ({
  user,
  profileEditParams,
  onChange,
}: UpdateProfileProps) => {
  const bio = profileEditParams?.bio ?? user?.bio ?? ''
  const location = profileEditParams?.location ?? user?.location ?? ''

  return (
    <UpdateSection title="About">
      <AboutInput
        bio={bio}
        location={location}
        onBioChange={(bio) => onChange({ ...profileEditParams, bio })}
        onLocationChange={(location) =>
          onChange({ ...profileEditParams, location })
        }
      />
    </UpdateSection>
  )
}
