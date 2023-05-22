import styled from 'styled-components'
import { HorizontalDivider } from '../Divider'
import { MobileMenuItem } from './MobileMenuItem'
import { MobileMenuProfileItem } from './MobileMenuProfileItem'
import { useFeatures } from '@/components/hooks/useFeatures'
import { Feature } from '@/lib/features'
import { useUser } from '@/components/auth/useUser'

interface MobileNavBarProps {
  profileId?: string
  open: boolean
}
export const MobileNavBar = ({ open, profileId }: MobileNavBarProps) => {
  const { hasFeature } = useFeatures()
  const hasCityFeature = hasFeature(Feature.City)
  const { user } = useUser()

  return (
    <MobileNavContainer open={open}>
      <InnerContainer>
        <MobileMenuItem menuItem={'home'} profileId={profileId} />
        <MobileMenuItem menuItem={'activity'} profileId={profileId} />
        <MobileMenuItem menuItem={'members'} profileId={profileId} />
        <MobileMenuItem menuItem={'neighborhoods'} profileId={profileId} />
        {hasCityFeature && (
          <MobileMenuItem menuItem={'offers'} profileId={profileId} />
        )}
        <StyledDivider />
        <MobileMenuProfileItem />
        <MobileMenuItem menuItem={'citizenship'} profileId={profileId} />
        {user && (
          <MobileMenuItem menuItem={'myLocations'} profileId={profileId} />
        )}
        <MobileMenuItem menuItem={'signOut'} profileId={profileId} />
        <MobileMenuItem
          authenticated
          menuItem={'signIn'}
          profileId={profileId}
        />
      </InnerContainer>
    </MobileNavContainer>
  )
}

const MobileNavContainer = styled.div<MobileNavBarProps>`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  top: 0;
  left: 0;
  height: 100vw;
  width: 80vw;
  background-color: ${({ theme }) => theme.colors.green800};
  height: 100%;
  box-shadow: 8px 8px 0px ${({ theme }) => theme.colors.green900};
  transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(-110%)')};
  transition: transform 0.3s ease-in-out;
`

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4rem;
  gap: 3rem;
  align-items: center;
  justify-content: flex-end;
  align-items: flex-end;
  width: 100%;
`

const StyledDivider = styled(HorizontalDivider)`
  opacity: 1;
  width: 100%;
`
