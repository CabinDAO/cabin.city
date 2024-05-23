import { TitleCard } from '../core/TitleCard'
import { SingleColumnLayout } from '../layouts/SingleColumnLayout'
import { EmptyState } from '../core/EmptyState'
import styled from 'styled-components'

export const NeighborhoodsPlaceholderView = () => {
  return (
    <SingleColumnLayout>
      <TitleCard title="City Directory" icon="map-fold"></TitleCard>
      <StyledEmptyState
        icon="map-fold"
        title="Directory coming"
        description="You’ll be able to browse neighborhoods in the Cabin network here."
        href="https://cabin.city"
      />
    </SingleColumnLayout>
  )
}

const StyledEmptyState = styled(EmptyState)`
  display: flex;
  width: 100%;
`
