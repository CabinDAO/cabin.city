import { ProfileRoleLevelType, ProfileRoleType } from 'generated/graphql'

const CARETAKER_ID = '01'
const BUILDER_ID = '02'
const GATHERER_ID = '03'
const NATURALIST_ID = '04'
const CREATOR_ID = '05'
const RESIDENT_ID = '06'

const ID_TO_ROLE: Record<string, ProfileRoleType> = {
  [CARETAKER_ID]: ProfileRoleType.Caretaker,
  [BUILDER_ID]: ProfileRoleType.Builder,
  [GATHERER_ID]: ProfileRoleType.Gatherer,
  [NATURALIST_ID]: ProfileRoleType.Naturalist,
  [CREATOR_ID]: ProfileRoleType.Creator,
  [RESIDENT_ID]: ProfileRoleType.Resident,
}

interface GetProfileRoleHat {
  id: string
  prettyId: string
}

/*
    Examples:
        0x00000002: Cabin Top Hat
        0x00000002.01: Caretaker Guild Custodian
        0x00000002.01.01: Caretaker (Member)
*/
export const getProfileRoleFromHat = (hat: GetProfileRoleHat) => {
  const split = hat.prettyId.split('.')
  if (split.length < 2) {
    // Most likely top hat
    return null
  }
  const roleId = split[1]
  const role = ID_TO_ROLE[roleId]
  if (!role) {
    return null // 🤷🏻‍♂️
  }

  const level =
    split.length === 2
      ? ProfileRoleLevelType.TopHat
      : ProfileRoleLevelType.Member

  return { hatId: hat.id, role, level }
}
