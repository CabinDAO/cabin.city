import Link from 'next/link'
import { EXTERNAL_LINKS } from '@/utils/external-links'
import styled from 'styled-components'
import theme from '@/styles/theme'
import { Body1, fonts } from '@/components/core/Typography'
import { BaseLayout } from '@/components/core/BaseLayout'
import { TitleCard } from '@/components/core/TitleCard'

const Content = styled.div`
  width: 100%;
  background-color: ${theme.colors.red100};
  padding: 2rem;
  font-size: 1.4rem;
  font-family: ${fonts.ibmPlexMono};
  white-space: pre-wrap;
  overflow-x: auto;
  tab-width: 4;
`

const DebugPage = () => {
  return (
    <BaseLayout>
      <TitleCard icon="info" title="How do I report a security issue?" />
      <Content>
        <Body1 style={{ marginBottom: '2rem' }}>
          We take security very seriously. Send an email to{' '}
          <Link
            href={`mailto:${EXTERNAL_LINKS.SECURITY_EMAIL_ADDRESS}`}
            style={{ textDecoration: 'underline' }}
          >
            {EXTERNAL_LINKS.SECURITY_EMAIL_ADDRESS}
          </Link>
          , and we will get back to you ASAP.
        </Body1>
        <Body1>
          We offer bounties for valid security reports based on information
          provided and severity.
        </Body1>
      </Content>
    </BaseLayout>
  )
}

export default DebugPage
