import { CitizenshipStatus, OfferType } from '@/generated/graphql'
import { useUser } from '../auth/useUser'
import { OfferViewProps } from '../offers/useGetOffer'

export const useOfferApply = (offer: OfferViewProps) => {
  const { user } = useUser()

  const canApply = () => {
    if (!user) {
      return false
    }

    if (
      offer.offerType === OfferType.PaidColiving &&
      user.citizenshipStatus !== CitizenshipStatus.Verified
    ) {
      return false
    }

    let valid = true

    if (
      offer.minimunCabinBalance &&
      user.cabinTokenBalanceInt < offer.minimunCabinBalance
    ) {
      valid = false
    }

    if (
      offer.citizenshipRequired &&
      user.citizenshipStatus !== CitizenshipStatus.Verified
    ) {
      valid = false
    }

    if (
      offer.profileRoleConstraints &&
      offer.profileRoleConstraints.length > 0
    ) {
      const userRoleLevelMap = new Map(
        user.roles.map((profileRole) => [profileRole.role, profileRole.level])
      )

      valid = !!offer.profileRoleConstraints.find((constraint) => {
        const userLevel = userRoleLevelMap.get(constraint.profileRole)
        return userLevel && userLevel === constraint.level
      })
    }

    return valid
  }

  return { canApply }
}
