import { QRCodeSVG } from 'qrcode.react'
import { CitizenshipStatus, MeFragment } from '@/utils/types/profile'
import { useProfile } from '@/components/auth/useProfile'
import { SingleColumnLayout } from '@/components/layouts/SingleColumnLayout'
import { TitleCard } from '@/components/core/TitleCard'
import { Body1, H1, H3 } from '@/components/core/Typography'
import styled from 'styled-components'
import theme from '@/styles/theme'
import { ContentCard } from '@/components/core/ContentCard'
import { appDomainWithProto } from '@/utils/display-utils'
import LoadingSpinner from '@/components/core/LoadingSpinner'

const InvitePage = () => {
  const { user, isUserLoading } = useProfile()

  return (
    <>
      <SingleColumnLayout withFooter>
        <TitleCard title="Invite" icon="citizen" />
        <Content>
          {isUserLoading ? (
            <LoadingSpinner />
          ) : !user || user.citizenshipStatus !== CitizenshipStatus.Verified ? (
            <ErrorMessage>
              <Body1>Only citizens can invite others.</Body1>
            </ErrorMessage>
          ) : (
            <InviteContent user={user} />
          )}
        </Content>
      </SingleColumnLayout>
    </>
  )
}

const InviteContent = ({ user }: { user: MeFragment }) => {
  const inviteUrl = `${appDomainWithProto}/invite/${user.inviteCode}`
  return (
    <>
      <H1>Invite your friends</H1>
      <Text>
        <Body1>
          Invite your friends to join Cabin and become citizens. You can invite
          as many people as you like.
        </Body1>
      </Text>
      <Text>
        <Body1>
          Only invite people who would make great citizens. An invite
          automatically confers a vouch from you to the recipient. We track who
          invites whom.
        </Body1>
      </Text>

      <H3>Scan code to join</H3>
      <Body1>{inviteUrl}</Body1>
      <QRCodeSVG
        value={inviteUrl}
        size={350}
        bgColor={theme.colors.green800}
        fgColor={theme.colors.yellow300}
        includeMargin={true}
        level={'Q'}
      />
    </>
  )
}

export default InvitePage

const Content = styled(ContentCard)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.4rem;
  padding: 2.4rem 1.6rem;

  ${({ theme }) => theme.bp.md} {
    padding: 2.4rem;
  }
`

const Text = styled.div`
  margin-bottom: 2rem;

  ${({ theme }) => theme.bp.md} {
    max-width: 45rem;
  }
`

const ErrorMessage = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.red100};
  padding: 1.6rem;

  ${Body1} {
    color: ${({ theme }) => theme.colors.red600};
  }
`
