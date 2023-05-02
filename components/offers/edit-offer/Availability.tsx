import { DateSelect } from '@/components/core/DateSelect'
import { Body2, H3 } from '@/components/core/Typography'
import { useState } from 'react'
import styled from 'styled-components'

interface DateRange {
  start: Date
  end: Date
}

export const Availability = () => {
  const [dateRange, setDateRange] = useState<DateRange>({
    start: new Date(),
    end: new Date(),
  })

  const handleStartDateChange = (date: Date | undefined) => {
    if (date) {
      if (date > dateRange.end) {
        setDateRange({ ...dateRange, start: date, end: date })
      } else {
        setDateRange({ ...dateRange, start: date })
      }
    }
  }

  const handleEndDateChange = (date: Date | undefined) => {
    if (date) {
      if (date < dateRange.start) {
        setDateRange({ ...dateRange, start: date, end: date })
      } else {
        setDateRange({ ...dateRange, end: date })
      }
    }
  }

  return (
    <Container>
      <H3>Availability</H3>
      <Body2>Select the range of dates available for applicants.</Body2>
      <DateRange>
        <DateSelect
          onDateChange={handleStartDateChange}
          label="Start"
          startDate={new Date()}
          value={dateRange.start}
        />
        <DateSelect
          onDateChange={handleEndDateChange}
          label="End"
          startDate={dateRange.start}
          value={dateRange.end}
        />
      </DateRange>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`

const DateRange = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.8rem;
  justify-content: center;
  align-items: center;
`
