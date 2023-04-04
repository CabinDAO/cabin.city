import { Post } from '@/components/core/post/Post'
import {
  ActivityType,
  CitizenshipStatus,
  ProfileRoleLevelType,
  ProfileRoleType,
} from '@/generated/graphql'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { subHours } from 'date-fns'

export default {
  title: 'Core/Post',
  component: Post,
} as ComponentMeta<typeof Post>

const Template: ComponentStory<typeof Post> = (args) => <Post {...args} />

export const ProfileCreated = Template.bind({})
ProfileCreated.args = {
  activityItem: {
    hasReactionByMe: false,
    reactionCount: 0,
    activity: {
      _id: '123',
      timestamp: subHours(new Date(), 1).toISOString(),
      type: ActivityType.ProfileCreated,
      profile: {
        _id: '123',
        name: 'Jaylon Kenter',
        roles: [
          {
            role: ProfileRoleType.Builder,
            level: ProfileRoleLevelType.Apprentice,
          },
        ],
        avatar: {
          url: 'https://fastly.picsum.photos/id/278/200/200.jpg?hmac=ttIZUII9b-qTWIpyIHChMPIA802dHskBJGR2EAa-Ywc',
        },
      },
    },
  },
  baseDate: new Date(),
}

export const LeveledUpToBuilderMember = Template.bind({})
LeveledUpToBuilderMember.args = {
  activityItem: {
    hasReactionByMe: true,
    reactionCount: 1,
    activity: {
      _id: '123',
      timestamp: subHours(new Date(), 1).toISOString(),
      type: ActivityType.ProfileRoleAdded,
      metadata: {
        profileRole: {
          role: ProfileRoleType.Builder,
          level: ProfileRoleLevelType.Artisan,
        },
      },
      profile: {
        _id: '123',
        name: 'Jaylon Kenter',
        citizenshipStatus: CitizenshipStatus.Verified,
        roles: [
          {
            role: ProfileRoleType.Builder,
            level: ProfileRoleLevelType.Artisan,
          },
          {
            role: ProfileRoleType.Naturalist,
            level: ProfileRoleLevelType.Apprentice,
          },
          {
            role: ProfileRoleType.Caretaker,
            level: ProfileRoleLevelType.Custodian,
          },
          {
            role: ProfileRoleType.Gatherer,
            level: ProfileRoleLevelType.Artisan,
          },
          {
            role: ProfileRoleType.Creator,
            level: ProfileRoleLevelType.Artisan,
          },
        ],
        avatar: {
          url: 'https://fastly.picsum.photos/id/278/200/200.jpg?hmac=ttIZUII9b-qTWIpyIHChMPIA802dHskBJGR2EAa-Ywc',
        },
      },
    },
  },
  baseDate: new Date(),
}
