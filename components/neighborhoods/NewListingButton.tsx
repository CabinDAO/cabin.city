import styled from 'styled-components'
import { Overline } from '@/components/core/Typography'
import Icon from '@/components/core/Icon'
import { AuthenticatedLink } from '@/components/core/AuthenticatedLink'
import { expandRoute } from '@/utils/routing'

export const NewListingButton = () => (
  <NewListing href={expandRoute('n_new')}>
    <Icon name="plus" size={1} />
    <Overline>List Your Neighborhood</Overline>
  </NewListing>
)

const NewListing = styled(AuthenticatedLink)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;

  ${Overline} {
    margin: 0;
    line-height: 1;
  }
`
