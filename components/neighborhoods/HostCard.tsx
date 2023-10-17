import styled from 'styled-components'
import { useGetProfileByIdQuery } from '@/generated/graphql'
import { padding } from '@/styles/theme'
import { Body1 } from '@/components/core/Typography'
import { ProfileContact } from '@/components/core/ProfileContact'

export const HostCard = ({ profileId }: { profileId: string }) => {
  const profileRes = useGetProfileByIdQuery({ variables: { id: profileId } })
  const profile = profileRes.data?.findProfileByID

  if (!profile) {
    return null
  }

  return (
    <Container>
      <ProfileContact profile={profile} variant={'small'} />
      <Body1>{profile?.bio}</Body1>
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

  ${Body1}{
    opacity: 0.75;
  }
}}
`
