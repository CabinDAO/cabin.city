import { prisma } from '@/utils/prisma'
import { $Enums, Profile } from '@prisma/client'
import { ProfileWithWallet } from '@/utils/api/withAuth'

const CARETAKER_ID = '0001'
const GATHERER_ID = '0002'
const BUILDER_ID = '0003'
const NATURALIST_ID = '0004'
const CREATOR_ID = '0005'
const RESIDENT_ID = '0006'

const ID_TO_TYPE: Record<string, $Enums.RoleType> = {
  [CARETAKER_ID]: $Enums.RoleType.Caretaker,
  [BUILDER_ID]: $Enums.RoleType.Builder,
  [GATHERER_ID]: $Enums.RoleType.Gatherer,
  [NATURALIST_ID]: $Enums.RoleType.Naturalist,
  [CREATOR_ID]: $Enums.RoleType.Creator,
  [RESIDENT_ID]: $Enums.RoleType.Resident,
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

  const level =
    split.length === 2 ? $Enums.RoleLevel.Custodian : $Enums.RoleLevel.Artisan

  return { type, level }
}
