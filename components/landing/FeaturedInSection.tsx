import styled from 'styled-components'
import Image from 'next/image'
import { H3 } from '@/components/core/Typography'
import Link from 'next/link'

export const FeaturedInSection = () => {
  return (
    <Content>
      <H3>Featured In:</H3>
      <Link href={'ft.com'}>
        <Image
          src={'https://placebear.com/190/60'}
          alt={'Financial Times'}
          width={160}
          height={90}
        />
      </Link>
      <Link href={'newyorker.com'}>
        <Image
          src={'https://placebear.com/g/190/60'}
          alt={'Financial Times'}
          width={160}
          height={90}
        />
      </Link>
      <Link href={'coindesk.com'}>
        <Image
          src={'https://placekitten.com/190/60'}
          alt={'Financial Times'}
          width={160}
          height={90}
        />
      </Link>
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

  ${({ theme }) => theme.bp.md} {
    flex-direction: row;
    width: 50rem;
  }

  ${({ theme }) => theme.bp.lg} {
    width: 80rem;
  }
`
