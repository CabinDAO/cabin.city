import styled from 'styled-components'
import { ProfileResponse } from '@/utils/types/profile'
import { padding } from '@/styles/theme'
import { ProfileContact } from '@/components/core/ProfileContact'
import { useAPIGet } from '@/utils/api/interface'

export const HostCard = ({ externId }: { externId: string }) => {
  const { data } = useAPIGet<ProfileResponse>(['PROFILE', { externId }])
  const profile = data?.profile

  if (!profile) {
    return null
  }

  return (
    <Container>
      <ProfileContact profile={profile} />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  gap: 2.4rem;
  padding: 1.6rem 1.6rem 2.4rem;
  border: 1px solid ${({ theme }) => theme.colors.green900}12;
  ${padding('xs')}
`
