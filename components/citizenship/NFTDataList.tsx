import { Caption } from '../core/Typography'
import styled, { css } from 'styled-components'
import Link from 'next/link'
import Icon from '../core/Icon'

interface FieldValue {
  value: string
  url?: string
  external?: boolean
}

interface NFTDataListProps {
  fieldNames: string[]
  values: FieldValue[]
}

export const NFTDataList = ({ fieldNames, values }: NFTDataListProps) => {
  return (
    <DataContainer>
      <DataList>
        {fieldNames.map((fieldName) => (
          <Caption key={fieldName}>{fieldName}</Caption>
        ))}
      </DataList>
      <DataList>
        {values.map((value) => {
          const displayValue = () => (
            <Caption key={value.value} emphasized>
              {value.value}
            </Caption>
          )

          if (value.url) {
            if (value.external) {
              return (
                <StyledAnchor
                  key={value.value}
                  href={value.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {displayValue()}
                  <Icon name="up-right-arrow" size={0.7} />
                </StyledAnchor>
              )
            } else {
              return (
                <StyledLink key={value.value} href={value.url}>
                  {displayValue()}
                  <Icon name="chevron-right" size={0.7} />
                </StyledLink>
              )
            }
          } else {
            return displayValue()
          }
        })}
      </DataList>
    </DataContainer>
  )
}

const DataContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1.6rem;
  auto-flow: dense;
  width: 100%;
`

const linkStyles = css`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 0.59rem;
  justify-content: flex-start;
`

const StyledAnchor = styled.a`
  ${linkStyles}
`

const StyledLink = styled(Link)`
  ${linkStyles}
`

const DataList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`
