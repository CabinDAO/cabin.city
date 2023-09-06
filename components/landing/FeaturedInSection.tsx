import styled from 'styled-components'
import Image from 'next/image'
import { H3 } from '@/components/core/Typography'
import Link from 'next/link'

import ftLogo from './logos/ft.png'
import newYorkerLogo from './logos/new-yorker.png'
import coindeskLogo from './logos/coindesk.png'

export const FeaturedInSection = () => {
  return (
    <Content>
      <H3>Featured In:</H3>
      <div>
        <Link href={'ft.com'}>
          <Image src={ftLogo} alt={'Financial Times'} />
        </Link>
        <Link href={'newyorker.com'}>
          <Image src={newYorkerLogo} alt={'New Yorker'} />
        </Link>
        <Link href={'coindesk.com'}>
          <Image src={coindeskLogo} alt={'Coindesk'} />
        </Link>
      </div>
    </Content>
  )
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 31rem;
  gap: 5rem;

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5rem;
  }

  ${H3} {
    white-space: nowrap;
  }

  ${({ theme }) => theme.bp.md} {
    width: 50rem;
    > div {
      flex-direction: row;
      gap: 5rem;
    }
  }

  ${({ theme }) => theme.bp.lg} {
    flex-direction: row;
    width: 80rem;
  }
`
