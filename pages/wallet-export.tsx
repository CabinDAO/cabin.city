import Link from 'next/link'
import styled from 'styled-components'
import theme from '@/styles/theme'
import { Body1, Body2, fonts } from '@/components/core/Typography'
import { BaseLayout } from '@/components/core/BaseLayout'
import { TitleCard } from '@/components/core/TitleCard'

import one from '@/public/images/wallet-export/1.png'
import two from '@/public/images/wallet-export/2.png'
import three from '@/public/images/wallet-export/3.png'
import four from '@/public/images/wallet-export/4.png'
import five from '@/public/images/wallet-export/5.png'
import { AutoImage } from '@/components/core/AutoImage'

const Content = styled.div`
  width: 100%;
  background-color: ${theme.colors.red100};
  padding: 2rem;
  font-size: 1.4rem;
  font-family: ${fonts.ibmPlexMono};
  white-space: pre-wrap;
  overflow-x: auto;
`
const List = styled.ol`
  margin-left: 2.4rem;
  opacity: 0.8;
  line-height: 1.4;
  font-size: 1.6rem;

  li {
    margin-bottom: 1rem;
  }
`

const WalletExportPage = () => {
  return (
    <BaseLayout>
      <TitleCard icon="info" title="How do I export my Cabin.city wallet?" />
      <Content>
        <Body1 style={{ marginBottom: '2rem', fontSize: '1.8rem' }}>
          Cabin{' '}
          <Link
            href={
              'https://cabin.city/vote/0x3cb06231931031807654574341032d487ff5156f102b7d6c70e692b4dc1ff61d'
            }
            target="_blank"
            rel="noopener"
            style={{ textDecoration: 'underline' }}
          >
            passed a proposal
          </Link>{' '}
          to wind down the platform and distribute the treasury. We will
          eventually shut down this site.{' '}
          <strong>
            If you have any tokens in your Cabin.city wallet, you will lose
            access to them if you don't export your wallet.
          </strong>
        </Body1>
        <Body1 style={{ marginBottom: '2rem', fontSize: '1.8rem' }}>
          Exporting your wallet involves getting the seed phrase for your
          existing Cabin.city wallet and then importing that into another wallet
          app. Here's how to do it:
        </Body1>
        <List>
          <li>
            Go to the{' '}
            <Link
              href="/"
              target="_blank"
              rel="noopener"
              style={{ textDecoration: 'underline' }}
            >
              homepage
            </Link>{' '}
            and login to your account.
            <AutoImage
              src={one.src}
              alt="Profile"
              style={{
                height: '20rem',
                objectFit: 'contain',
                objectPosition: 'left',
              }}
            />
          </li>

          <li>
            Go to your profile by clicking your photo in the nav bar.{' '}
            <AutoImage
              src={two.src}
              alt="Profile"
              style={{
                height: '20rem',
                objectFit: 'contain',
                objectPosition: 'left',
              }}
            />
          </li>

          <li>
            Click on Edit Profile in the header
            <AutoImage
              src={three.src}
              alt="Profile"
              style={{
                height: '20rem',
                objectFit: 'contain',
                objectPosition: 'left',
              }}
            />
          </li>

          <li>
            Under the Account section, click Export privatke key
            <AutoImage
              src={four.src}
              alt="Profile"
              style={{
                height: '20rem',
                objectFit: 'contain',
                objectPosition: 'left',
              }}
            />
            <Body2 style={{ fontSize: '1.8rem' }}>
              If instead of "Export private key" you see it say "Link Wallet",
              then you don't have a wallet linked to your account.
            </Body2>
            <Body2 style={{ marginTop: '1rem', fontSize: '1.8rem' }}>
              If instead it says "Unlink wallet", then you have an external
              wallet linked (e.g. Metamask, Rainbow, Phantom, Coinbase Wallet)
              and your tokens are in that wallet.
            </Body2>
          </li>

          <li>
            On the popup, copy your key and/or your seed phrase
            <AutoImage
              src={five.src}
              alt="Profile"
              style={{
                height: '20rem',
                objectFit: 'contain',
                objectPosition: 'left',
              }}
            />
          </li>

          <li>
            Import your key or phrase into an external wallet. Your tokens will
            show up there, and you can transfer them as you wish.
          </li>
        </List>
      </Content>
    </BaseLayout>
  )
}

export default WalletExportPage
