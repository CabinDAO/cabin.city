import styled from 'styled-components'
import Image from 'next/image'
import { H3 } from '@/components/core/Typography'
import Link from 'next/link'

import ftLogo from './logos/ft.png'
import newYorkerLogo from './logos/new-yorker.png'
import coindeskLogo from './logos/coindesk.png'
import { BaseContainer } from '@/components/core/BaseContainer'

export const FeaturedInSection = () => {
  return (
    <Content maxWidth={'default'}>
      <H3 style={{ whiteSpace: 'nowrap' }}>Featured In:</H3>
      <Logos>
        <Link
          href={
            'https://www.ft.com/content/def2b5cb-d0e1-4005-96c5-d8fe0d1613b8'
          }
        >
          <Image src={ftLogo} alt={'Financial Times'} />
        </Link>
        <Link
          href={
            'https://www.newyorker.com/culture/infinite-scroll/the-promise-of-daos-the-latest-craze-in-crypto'
          }
        >
          <Image src={newYorkerLogo} alt={'New Yorker'} />
        </Link>
        <Link
          href={
            'https://www.coindesk.com/business/2023/05/23/coliving-project-cabin-wants-to-put-digital-nomads-in-nature/'
          }
        >
          <Image src={coindeskLogo} alt={'Coindesk'} />
        </Link>
      </Logos>
    </Content>
  )
}

const Content = styled(BaseContainer)`
  align-items: center;
  justify-content: center;
  gap: 5rem;

  ${({ theme }) => theme.bp.lg} {
    flex-direction: row;
  }
`

const Logos = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5rem;

  ${({ theme }) => theme.bp.md} {
    flex-direction: row;
    gap: 5rem;
  }
`
