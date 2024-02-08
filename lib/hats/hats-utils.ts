import { RoleType, RoleLevel } from '@prisma/client'

const CARETAKER_ID = '0001'
const GATHERER_ID = '0002'
const BUILDER_ID = '0003'
const NATURALIST_ID = '0004'
const CREATOR_ID = '0005'
const RESIDENT_ID = '0006'

const ID_TO_TYPE: Record<string, RoleType> = {
  [CARETAKER_ID]: RoleType.Caretaker,
  [BUILDER_ID]: RoleType.Builder,
  [GATHERER_ID]: RoleType.Gatherer,
  [NATURALIST_ID]: RoleType.Naturalist,
  [CREATOR_ID]: RoleType.Creator,
  [RESIDENT_ID]: RoleType.Resident,
}

/*
    Examples:
        0x00000002: Cabin Top Hat
        0x00000002.0001: Caretaker Custodian
        0x00000002.0001.0001: Caretaker Artisan
*/
export const getRoleInfoFromHat = (hatPrettyId: string) => {
  const split = hatPrettyId.split('.')
  if (split.length < 2) {
    // Most likely top hat
    return null
  }
  const typeId = split[1]
  const type = ID_TO_TYPE[typeId]
  if (!type) {
    return null
  }

  const level = split.length === 2 ? RoleLevel.Custodian : RoleLevel.Artisan

  return { type, level }
}
