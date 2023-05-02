import styled from 'styled-components'
import { Subline1, Subline2, subline2Styles } from './Typography'
import { useCallback, useEffect, useRef, useState } from 'react'
import { format } from 'date-fns'

interface DateSelectProps {
  label?: string
  startDate?: Date
  endDate?: Date
  onDateChange?: (date: Date | undefined) => void
  value?: Date
}

export const DateSelect = ({
  label,
  startDate,
  endDate,
  value,
  onDateChange,
}: DateSelectProps) => {
  const [isDefault, setIsDefault] = useState<boolean>(true)
  const ref = useRef<HTMLInputElement>(null)

  const utcDate = (date: Date) =>
    new Date(date.getTime() + date.getTimezoneOffset() * 60000)

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsDefault(e.target.value === '')

    const validDate = new Date(e.target.value)

    if (validDate.toString() === 'Invalid Date') {
      return
    }

    if (onDateChange) {
      onDateChange(utcDate(validDate))
    }
  }

  const formatDate = useCallback((date: Date) => {
    return format(utcDate(date), 'yyyy-MM-dd')
  }, [])

  const dateInputProps: { min?: string; max?: string } = {}

  if (startDate) {
    dateInputProps.min = formatDate(startDate)
  }

  if (endDate) {
    dateInputProps.max = formatDate(endDate)
  }

  useEffect(() => {
    if (value && ref?.current) {
      setIsDefault(false)
      ref.current.value = formatDate(value)
    }
  }, [value, formatDate])

  return (
    <Container>
      <Subline1>{label}</Subline1>
      <InputContainer>
        <DateInput
          ref={ref}
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
      </InputContainer>
    </Container>
  )
}

interface DateInputProps {
  isDefault: boolean
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`

const InputContainer = styled.div`
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
