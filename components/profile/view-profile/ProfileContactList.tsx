import { useDeviceSize } from '@/components/hooks/useDeviceSize'
import {
  formatContactField,
  getUrlFromContactField,
} from '@/utils/display-utils'
import { ProfileFragment } from '@/utils/types/profile'
import styled from 'styled-components'
import { fonts } from '@/components/core/Typography'
import Icon from '@/components/core/Icon'
import { CopyToClipboard } from '@/components/core/CopyToClipboard'

export const ProfileContactList = ({
  contactFields,
  bigger,
  onDelete,
}: {
  contactFields: ProfileFragment['contactFields']
  bigger?: boolean
  onDelete?: (index: number) => void
}) => {
  return (
    <Container count={contactFields.length}>
      {contactFields.map((field, i) => (
        <>
          <LabelContainer key={`${i}a`}>
            {onDelete && (
              <Icon
                name="trash"
                size={1.4}
                style={{ opacity: '0.75', cursor: 'pointer' }}
                onClick={() => onDelete(i)}
              />
            )}
            <Label bigger={bigger}>{field.type}</Label>
          </LabelContainer>
          <div key={`${i}b`}></div>
          <ContactField key={`${i}c`} field={field} bigger={bigger} />
          <div key={`${i}d`}></div>
        </>
      ))}
    </Container>
  )
}

const ContactField = ({
  field,
  bigger,
}: {
  field: ProfileFragment['contactFields'][0]
  bigger?: boolean
}) => {
  const { deviceSize } = useDeviceSize()
  const url = getUrlFromContactField(field)

  if (url) {
    return (
      <ValueContainer>
        <a href={url} target="_blank" rel="noopener nofollow noreferrer">
          <Value bigger={bigger}>{formatContactField(field)}</Value>
        </a>
      </ValueContainer>
    )
  } else {
    return (
      <CopyToClipboard text={field.value}>
        <Value bigger={bigger}>
          {formatContactField(field, deviceSize !== 'tablet')}
        </Value>
      </CopyToClipboard>
    )
  }
}

const Container = styled.div<{ count: number }>`
  display: grid;
  grid-template-rows: repeat(
    ${({ count }) => count},
    min-content 0.8rem min-content 2rem
  );
  width: 100%;
  word-break: break-word;
  overflow-x: hidden;
  text-overflow: ellipsis;

  ${({ theme }) => theme.bp.md} {
    grid-template-rows: initial;
    grid-template-columns: 10rem 1.6rem 1fr 0;
    row-gap: 1.6rem;
  }
`

const LabelContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.6rem;
  max-width: 100%;
  flex-grow: 0;
  align-items: center;
`

const Label = styled.span<{ bigger?: boolean }>`
  font-family: ${fonts.inter};
  font-weight: 400;
  line-height: 1.23;
  font-size: ${({ bigger }) => (bigger ? '1.6rem' : '1.4rem')};
  opacity: 0.75;
`

const ValueContainer = styled.div`
  width: min-content;
  white-space: nowrap;
  display: flex;
  flex-direction: row;
  gap: 1.6rem;
  max-width: 100%;
`

const Value = styled.span<{ bigger?: boolean }>`
  font-family: ${fonts.inter};
  font-weight: 500;
  line-height: 1.23;
  font-size: ${({ bigger }) => (bigger ? '1.6rem' : '1.4rem')};
`
