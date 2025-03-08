import { BaseLayout } from '@/components/core/BaseLayout'
import { TitleCard } from '@/components/core/TitleCard'
import { ListEmptyState } from '@/components/core/ListEmptyState'
import { List } from '@/components/core/List'
import { StampWithRecipientsFragment } from '@/utils/types/stamp'
import { AutoImage } from '@/components/core/AutoImage'
import { getStampImageUrl } from '@/components/core/Stamp'
import { ProfileListItem } from '@/components/core/ProfileListItem'

export const StampView = ({
  stamp,
}: {
  stamp: StampWithRecipientsFragment
}) => {
  return (
    <BaseLayout>
      <TitleCard title={stamp.name} icon="stamp"></TitleCard>
      <div style={{ maxWidth: '256px', margin: '0 auto' }}>
        <AutoImage
          src={getStampImageUrl(stamp.id)}
          alt={stamp.name}
          width={100}
          height={100}
        />
      </div>
      <List
        total={stamp.recipients.length}
        unitWords={{ singular: 'Recipient' }}
      >
        {stamp.recipients.length === 0 ? (
          <ListEmptyState iconName="profile2" />
        ) : (
          stamp.recipients.map((profile) => (
            <ProfileListItem
              key={profile.externId}
              profile={{ stampCount: 0, ...profile }}
            />
          ))
        )}
      </List>
    </BaseLayout>
  )
}
