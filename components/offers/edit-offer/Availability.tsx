import { DateSelect } from '@/components/core/DateSelect'
import { H3 } from '@/components/core/Typography'
import { getYear } from 'date-fns'
import { useState } from 'react'
import styled from 'styled-components'
import { Pair } from './EditOfferForm'

interface DateRange {
  start: Date
  end: Date
}

interface AvailabilityProps {
  onEdit: (startDate: string, endDate: string) => void
  defaultStartDate?: string
  defaultEndDate?: string
}

export const Availability = ({
  onEdit,
  defaultStartDate,
  defaultEndDate,
}: AvailabilityProps) => {
  const [dateRange, setDateRange] = useState<DateRange>({
    start: defaultStartDate ? new Date(defaultStartDate) : new Date(),
    end: defaultEndDate ? new Date(defaultEndDate) : new Date(),
  })

  const handleStartDateChange = (date: Date | undefined) => {
    if (date) {
      let newRange: DateRange
      if (date > dateRange.end && getYear(date) > 999) {
        newRange = { ...dateRange, start: date, end: date }
        setDateRange(newRange)
      } else {
        newRange = { ...dateRange, start: date }
        setDateRange({ ...dateRange, start: date })
      }
      onEdit(newRange.start.toISOString(), newRange.end.toISOString())
    }
  }

  const handleEndDateChange = (date: Date | undefined) => {
    if (date) {
      let newRange: DateRange
      if (date < dateRange.start && getYear(date) > 999) {
        newRange = { ...dateRange, start: date, end: date }
        setDateRange(newRange)
      } else {
        newRange = { ...dateRange, end: date }
        setDateRange(newRange)
      }
      onEdit(newRange.start.toISOString(), newRange.end.toISOString())
    }
  }

  return (
    <Pair>
      <H3>Availability Window</H3>
      <DateRange>
        <DateSelect
          onDateChange={handleStartDateChange}
          label="Start *"
          startDate={new Date()}
          value={dateRange.start ?? defaultStartDate}
        />
        <DateSelect
          onDateChange={handleEndDateChange}
          label="End *"
          startDate={dateRange.start}
          value={dateRange.end ?? defaultEndDate}
        />
      </DateRange>
    </Pair>
  )
}

const DateRange = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  justify-content: center;
  align-items: center;
  width: 100%;

  ${({ theme }) => theme.bp.md} {
    flex-direction: row;
  }
`
