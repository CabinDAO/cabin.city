import styled from 'styled-components'
import Link from 'next/link'
import Icon, { IconName } from '@/components/core/Icon'
import { Body1, H4 } from '@/components/core/Typography'

interface ListItemProps {
  title: string
  body: string
  icon: IconName
  link?: string
}

export const HorizontalList = ({ items }: { items: ListItemProps[] }) => {
  return (
    <StyledHorizontalList>
      <Items>
        {items.map((i, index) => {
          const item = (
            <Item key={index}>
              <Icon name={i.icon} size={2.4} />
              {i.link && (
                <ArrowIcon
                  name={'up-right-arrow'}
                  size={2}
                  color={'green800'}
                />
              )}
              <H4>{i.title}</H4>
              <Body1>{i.body}</Body1>
            </Item>
          )
          return i.link ? (
            <Link href={i.link} target="_blank" rel="noreferrer">
              {item}
            </Link>
          ) : (
            item
          )
        })}
      </Items>
    </StyledHorizontalList>
  )
}

const ArrowIcon = styled(Icon)`
  position: absolute;
  top: 2.4rem;
  right: 0;
`

const Item = styled.div`
  width: 50%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 1.6rem;

  padding-top: 2.4rem;
  padding-bottom: 2.4rem;

  &:first-of-type {
    padding-top: 0;
    ${ArrowIcon} {
      top: 0;
    }
  }
  &:last-of-type {
    padding-bottom: 0;
  }

  ${({ theme }) => theme.bp.lg} {
    padding: 0 2.4rem;

    ${ArrowIcon} {
      top: 0;
      right: 2.4rem;
    }

    &:first-of-type {
      padding-left: 0;
    }
    &:last-of-type {
      padding-right: 0;
      ${ArrowIcon} {
        right: 0;
      }
    }
  }

  ${Body1} {
    opacity: 75%;
  }
`

const Items = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 4rem;

  ${Item} + ${Item} {
    border-top: solid 1px rgba(50, 72, 65, 0.12);
  }

  ${({ theme }) => theme.bp.md} {
    width: 50rem;
  }

  ${({ theme }) => theme.bp.lg} {
    flex-direction: row;
    width: 84rem;

    ${Item} + ${Item} {
      border-top: none;
      border-left: solid 1px rgba(50, 72, 65, 0.12);
    }
  }
`

const StyledHorizontalList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 2.4rem;

  ${({ theme }) => theme.bp.md} {
    gap: 4.8rem;
  }
`
