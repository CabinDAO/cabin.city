import { TitleCard } from '@/components/core/TitleCard'
import { BaseLayout } from '@/components/core/BaseLayout'
import { EmptyState } from '@/components/core/EmptyState'
import styled from 'styled-components'

export const NeighborhoodsPlaceholderView = () => {
  return (
    <BaseLayout>
      <TitleCard title="City Directory" icon="map-fold"></TitleCard>
      <StyledEmptyState
        icon="map-fold"
        title="Directory coming"
        description="You’ll be able to browse neighborhoods in the Cabin network here."
        href="https://cabin.city"
      />
    </BaseLayout>
  )
}

const StyledEmptyState = styled(EmptyState)`
  display: flex;
  width: 100%;
`
