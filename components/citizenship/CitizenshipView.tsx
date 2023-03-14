import { SingleColumnLayout } from '../layouts/SingleColumnLayout'
import { TitleCard } from '../core/TitleCard'
import { useUser } from '../auth/useUser'
import { Body1 } from '../core/Typography'
import { CitizenshipStatus } from '@/generated/graphql'
import { Button } from '../core/Button'

export const CitizenshipView = () => {
  const { user } = useUser({ redirectTo: '/login' })

  const handleMint = () => {
    window.unlockProtocol && window.unlockProtocol.loadCheckoutModal()
  }

  return (
    <SingleColumnLayout>
      <TitleCard title="Citizenship" icon="back-arrow" />
      <Body1>{`Citizenship status: ${user?.citizenshipStatus}`}</Body1>
      {user?.citizenshipStatus === CitizenshipStatus.Vouched && (
        <Button onClick={handleMint}>Mint now</Button>
      )}
    </SingleColumnLayout>
  )
}
