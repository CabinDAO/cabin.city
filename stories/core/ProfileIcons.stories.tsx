import { ProfileIcons } from '@/components/core/ProfileIcons'
import { CitizenshipStatus, ProfileRoleType } from '@/generated/graphql'
import { roleInfoFromType } from '@/utils/roles'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import styled from 'styled-components'

export default {
  title: 'Core/ProfileIcons',
  component: ProfileIcons,
} as ComponentMeta<typeof ProfileIcons>

const Template: ComponentStory<typeof ProfileIcons> = (args) => {
  return (
    <Container>
      <ProfileIcons {...args} />
    </Container>
  )
}

export const Default = Template.bind({})
Default.args = {
  citizenshipStatus: CitizenshipStatus.Verified,
  roleInfos: Object.values(ProfileRoleType).map((roleType) =>
    roleInfoFromType(roleType)
  ),
}

export const VerifiedNoRoles = Template.bind({})
VerifiedNoRoles.args = {
  citizenshipStatus: CitizenshipStatus.Verified,
  roleInfos: [],
}

export const VouchRequestedNoRoles = Template.bind({})
VouchRequestedNoRoles.args = {
  citizenshipStatus: CitizenshipStatus.VouchRequested,
  roleInfos: [],
}

export const VouchedNoRoles = Template.bind({})
VouchedNoRoles.args = {
  citizenshipStatus: CitizenshipStatus.Vouched,
  roleInfos: [],
}

export const AllRoles = Template.bind({})
AllRoles.args = {
  roleInfos: Object.values(ProfileRoleType).map((roleType) =>
    roleInfoFromType(roleType)
  ),
}

export const Empty = Template.bind({})
Empty.args = {
  roleInfos: [],
}

const Container = styled.div`
  padding: 4rem;
`
