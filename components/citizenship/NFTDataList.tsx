import { Caption } from '../core/Typography'
import styled from 'styled-components'
import { AppLink } from '../core/AppLink'

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
            return (
              <AppLink
                external={value.external}
                location={value.url}
                key={value.value}
                iconSize={0.7}
                iconName={value.external ? 'up-right-arrow' : 'chevron-right'}
              >
                {displayValue()}
              </AppLink>
            )
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

const DataList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`
