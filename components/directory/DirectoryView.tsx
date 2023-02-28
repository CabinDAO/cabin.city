import { ProfileFragment, useGetProfilesQuery } from '@/generated/graphql'
import { ProfileList } from '../core/ProfileList'
import { ProfileListItem } from '../core/ProfileListItem'
import { TitleCard } from '../core/TitleCard'
import { SingleColumnLayout } from '../layouts/SingleColumnLayout'

export const DirectoryView = () => {
  const { data } = useGetProfilesQuery()
  const profiles =
    data?.allProfiles.data.filter((a): a is ProfileFragment => !!a) ?? []

  // TODO: This needs to come from a separate `count/total` query
  const totalProfiles = profiles?.length ?? 0

  return (
    <SingleColumnLayout>
      <TitleCard title="Census" icon="members"></TitleCard>
      <ProfileList total={totalProfiles}>
        {profiles.map((profile) => (
          <ProfileListItem key={profile._id} profile={profile} />
        ))}
      </ProfileList>
    </SingleColumnLayout>
  )
}
