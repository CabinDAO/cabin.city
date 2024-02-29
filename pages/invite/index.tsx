import { useState } from 'react'
import { useWindowSize } from 'react-use'
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
import Icon from '@/components/core/Icon'

export default function InvitePage() {
  const { user, isUserLoading } = useProfile()

  return (
    <>
      <SingleColumnLayout withFooter>
        <TitleCard title="Invite Your Friends" icon="citizen" />
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
  const { width } = useWindowSize()
  const qrCodeSize = Math.min(350, width - 60)
  const [isFlashing, setIsFlashing] = useState(false)
  const flashBg = () => {
    setIsFlashing(true)
    setTimeout(() => setIsFlashing(false), 500) // Adjust timeout to match CSS transition
  }

  return (
    <>
      <H1>Vouch for New Citizens</H1>
      <Text>
        <Body1>
          Invite your friends to become Cabin Citizens by having them scan the
          QR code below.
        </Body1>
      </Text>
      <Text>
        <Body1>
          By sharing this code with someone, you are vouching for them to become
          a Cabin Citizen. Only invite people who you trust and think will make
          the Cabin community better. We track who invites whom; their
          reputation will be tied to yours.
        </Body1>
      </Text>

      <H3>Scan code to join</H3>
      <QRCodeSVG
        value={inviteUrl}
        size={qrCodeSize}
        bgColor={theme.colors.green800}
        fgColor={theme.colors.yellow300}
        includeMargin={true}
        level={'Q'}
      />
      <Body1
        style={{
          display: 'flex',
          gap: '1rem',
          cursor: 'pointer',
          background: isFlashing ? theme.colors.yellow400 : 'initial',
          transition: 'background 0.5s ease-in-out',
          padding: '0.5rem',
          wordBreak: 'break-all',
        }}
        onClick={() => {
          flashBg()
          navigator.clipboard.writeText(inviteUrl).then()
        }}
      >
        {inviteUrl} <Icon name={'copy'} size={2}></Icon>
      </Body1>
    </>
  )
}

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
  margin-bottom: 1rem;

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
