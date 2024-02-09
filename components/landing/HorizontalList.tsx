import styled, { css } from 'styled-components'
import Link from 'next/link'
import Icon, { IconName } from '@/components/core/Icon'
import { Body1, H4 } from '@/components/core/Typography'
import React from 'react'

interface ListItemProps {
  title: string
  body: string
  icon: IconName
  link?: string
  button?: React.ReactNode
}

export const HorizontalList = ({
  items,
  centered,
}: {
  items: ListItemProps[]
  centered?: boolean
}) => {
  return (
    <StyledHorizontalList>
      <Items>
        {items.map((i, index) => {
          const item = (
            <Item key={index} centered={centered}>
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
              {i.button && i.button}
            </Item>
          )
          return i.link ? (
            <Link key={index} href={i.link} target="_blank" rel="noreferrer">
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
`

const ItemPadding = css`
  padding-top: 2.4rem;
  padding-bottom: 2.4rem;
  flex: 1;

  ${ArrowIcon} {
    top: 2.4rem;
    right: 0;
  }

  &:first-child {
    padding-top: 0;
    ${ArrowIcon} {
      top: 0;
    }
  }

  &:last-child {
    padding-bottom: 0;
  }

  ${({ theme }) => theme.bp.lg} {
    padding: 0 2.4rem;

    ${ArrowIcon} {
      right: 2.4rem;
    }

    &:first-child {
      padding-left: 0;
    }
    &:last-child {
      padding-right: 0;

      ${ArrowIcon} {
        right: 0;
      }
    }
  }
`

interface ItemProps {
  centered?: boolean
}

const Item = styled.div<ItemProps>`
  width: 50%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: ${({ centered }) => (centered ? 'center' : 'flex-start')};
  width: 100%;
  gap: 1.6rem;

  ${ItemPadding}

  ${({ theme }) => theme.bp.lg} {
    align-items: flex-start;
  }

  ${Body1} {
    opacity: 75%;
  }
`

const Items = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  margin-top: 4rem;

  > :not(:first-child) {
    border-top: solid 1px rgba(50, 72, 65, 0.12);
  }

  a {
    // for links
    width: 100%;
    ${ItemPadding}
  }

  ${({ theme }) => theme.bp.md} {
    width: 50rem;
  }

  ${({ theme }) => theme.bp.lg} {
    flex-direction: row;
    width: 84rem;

    > :not(:first-child) {
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
