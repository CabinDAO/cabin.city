import { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import { ironOptions } from '@/lib/next-server/iron-options'
import { faunaServerClient } from '@/lib/fauna-server/faunaServerClient'
import { GetPendingMigrationProfiles } from '@/fauna/lib/GetPendingMigrationProfiles'
import { GetAccountById } from '@/fauna/lib/GetAccountById'
import { utils } from 'ethers'
import { privyAPICall } from '@/lib/privy'
import { addressMatch } from '@/utils/address-match'
import { GetProfileByAddress } from '@/fauna/lib/GetProfileByAddress'
import { setExternalUserId } from '@/lib/fauna-server/setExternalUserId'

type CabinProfile = {
  data: {
    email: string
    account: { id: string }
  }
}

type MigrateUserInput = {
  address: string
  email: string
}

type PrivyCreateResult = {
  id: string
  success: boolean
}

type MigrateUserResponse = MigrateUserInput & {
  externalId: string
}

const formatPrivyInput = (input: MigrateUserInput) => {
  return {
    linked_accounts: [
      {
        type: 'wallet',
        chain_type: 'ethereum',
        address: input.address,
      },
      {
        type: 'email',
        address: input.email,
      },
    ],
  }
}

const resolveUser = async (
  externalId: string,
  migratedUsers: MigrateUserInput[]
) => {
  const userResponse = await privyAPICall(`users/${externalId}`, 'GET')

  if (userResponse.status === 404) {
    return null
  }

  const user = (await userResponse.json()) as {
    linked_accounts: { address: string; type: 'wallet' }[]
  }

  const wallet = user.linked_accounts.find(
    (account) => account.type === 'wallet'
  )

  if (!wallet) {
    return null
  }

  const foundCabinUserInput = migratedUsers.find((user) =>
    addressMatch(user.address, wallet.address)
  )

  if (!foundCabinUserInput) {
    return null
  }

  const profileByAddress = await _getProfileByAddress(
    foundCabinUserInput.address
  )

  if (!profileByAddress) {
    return null
  }

  await setExternalUserId(profileByAddress.ref.id, externalId)

  return { ...foundCabinUserInput, externalId }
}

const migrateUsers = async (input: MigrateUserInput[]) => {
  const privyInput = input.map((i) => formatPrivyInput(i))

  return privyAPICall('users/import', 'POST', { users: privyInput })
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MigrateUserResponse[]>
) {
  const { method } = req

  switch (method) {
    case 'GET':
      const pendingMigrationUsers = (await faunaServerClient.query(
        GetPendingMigrationProfiles()
      )) as { data: CabinProfile[] }

      const migrationUsers: MigrateUserInput[] = []

      for (const user of pendingMigrationUsers.data) {
        const account = (await faunaServerClient.query(
          GetAccountById(user.data.account.id)
        )) as { data: { address: string } }

        if (!account || !account.data || !account.data.address) {
          continue
        }

        // Check if valid address
        if (!utils.isAddress(account.data.address)) {
          continue
        }

        migrationUsers.push({
          email: user.data.email,
          address: account.data.address,
        })
      }

      const privyResponse = await migrateUsers(migrationUsers)

      const data = (await privyResponse.json()) as {
        results: PrivyCreateResult[]
      }

      if (privyResponse.status >= 400) {
        res.status(422).end(JSON.stringify(data))
        return
      }

      const resolveUsers: MigrateUserResponse[] = []

      for (const result of data.results) {
        if (result.success) {
          const response = await resolveUser(result.id, migrationUsers)

          if (response) {
            resolveUsers.push(response)
          }
        }
      }

      res.status(200).json(resolveUsers)
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function _getProfileByAddress(address: string): Promise<any> {
  return faunaServerClient.query(GetProfileByAddress(address))
}

export default withIronSessionApiRoute(handler, ironOptions)
