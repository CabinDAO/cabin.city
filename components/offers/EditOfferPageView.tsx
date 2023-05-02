import { SingleColumnLayout } from '../layouts/SingleColumnLayout'
import { useGetOffer } from './useGetOffer'
import { EditOfferView } from './EditOfferView'
import { ActionBar } from '../core/ActionBar'

export const EditOfferPageView = () => {
  const { offer } = useGetOffer()

  if (!offer) {
    return null
  }

  const handleNext = () => {
    console.log('handleNext')
  }

  const handleBack = () => {
    console.log('handleBack')
  }

  return (
    <SingleColumnLayout
      actionBar={
        <ActionBar
          primaryButton={{
            onClick: handleNext,
            label: 'Save Offer',
          }}
          secondaryButton={{
            onClick: handleBack,
            label: 'Back',
          }}
        />
      }
    >
      <EditOfferView offer={offer} />
    </SingleColumnLayout>
  )
}
