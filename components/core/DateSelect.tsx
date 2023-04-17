import styled from 'styled-components'
import { Subline2, subline2Styles } from './Typography'
import { useState } from 'react'
import { format } from 'date-fns'

interface DateSelectProps {
  startDate?: Date
  endDate?: Date
  onDateChange?: (date: Date | undefined) => void
}

export const DateSelect = ({
  startDate,
  endDate,
  onDateChange,
}: DateSelectProps) => {
  const [isDefault, setIsDefault] = useState<boolean>(true)

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsDefault(e.target.value === '')

    const validDate = new Date(e.target.value)

    if (validDate.toString() === 'Invalid Date') {
      return
    }

    if (onDateChange) {
      onDateChange(validDate)
    }
  }

  const formatDate = (date: Date) => {
    return format(date, 'yyyy-MM-dd')
  }

  const dateInputProps: { min?: string; max?: string } = {}

  if (startDate) {
    dateInputProps.min = formatDate(startDate)
  }

  if (endDate) {
    dateInputProps.max = formatDate(endDate)
  }

  return (
    <Container>
      <DateInput
        isDefault={isDefault}
        name="date"
        type="date"
        {...dateInputProps}
        onChange={handleOnChange}
      />
      {isDefault && (
        <Default>
          <Subline2>Date</Subline2>
        </Default>
      )}
    </Container>
  )
}

interface DateInputProps {
  isDefault: boolean
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 18.8rem;
  position: relative;
`

const Default = styled(Subline2)`
  position: absolute;
  left: 4.1rem;
  opacity: 0.42;
`

const DateInput = styled.input<DateInputProps>`
  ${subline2Styles}
  background-color: ${({ theme }) => theme.colors.white};
  position: relative;
  width: 100%;
  padding: 1.5rem;
  border: 1px solid black;

  ::-webkit-datetime-edit-fields-wrapper {
    position: relative;
    padding-left: 2.5rem;
    opacity: ${({ isDefault }) => (isDefault ? 0 : 1)};
  }

  ::-webkit-calendar-picker-indicator {
    position: absolute;
  }
`
