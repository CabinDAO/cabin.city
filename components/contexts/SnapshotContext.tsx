import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { GraphQLClient } from 'graphql-request'
import { useUser } from '@/components/auth/useUser'
import { usePrivy } from '@privy-io/react-auth'
import { isProd } from '@/utils/dev'

const snapshotGraphQLClient = new GraphQLClient(
  'https://hub.snapshot.org/graphql'
)

export type Proposal = {
  id: string
  created: number // timestamp
  state: string // 'active' | 'closed' | 'executed' | 'pending'
  title: string
  body: string
  discussion: string
  author: string // eth address
  network: number // chain id. eg 1 = mainnet
  snapshot: number
  start: number // timestamp
  end: number // timestamp
  choices: string[]
  scores: number[]
  scores_total: number // total tokens voted
  scores_updated: number // timestamp
  space: { id: string; name: string }
  scores_by_strategy: { [key: number]: number }[]
  strategies: {
    name: string
    network: number
    params: object
  }[]
  app: string
}

export type Vote = {
  choice: { [key: string]: number }
  created: number
  id: string
  proposal: { id: string }
  space: { id: string }
  voter: string
  vp: number
  vp_by_strategy: number[]
  vp_state: string
}

interface SnapshotState {
  proposals: Proposal[]
  loaded: boolean
  hasActiveProposals: boolean
  canVote: boolean
  getMyVote: (proposalId: string, voterAddress: string) => Promise<Vote | null>
}

const SnapshotContext = createContext<SnapshotState | null>(null)

export function useSnapshot() {
  const context = useContext(SnapshotContext)
  if (!context) {
    throw new Error(
      'useSnapshot must be used within SnapshotContext. Wrap a parent component in <SnapshotContext.Provider> to fix this error.'
    )
  }
  return context
}

export const SnapshotProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUser()
  const { user: privyUser } = usePrivy()

  const canVote =
    (isProd
      ? privyUser &&
        privyUser.wallet?.walletClientType === 'privy' && // TODO: is this right? maybe any wallet works via privy?
        (user?.cabinTokenBalanceInt || 0) > 0
      : !!user) || false

  const [proposals, setProposals] = useState<Proposal[]>([])
  const [loaded, setLoaded] = useState(false)
  const [hasActiveProposals, setHasActiveProposals] = useState(false)

  const loadProposals = useCallback(async () => {
    const space = isProd ? 'cabindao.eth' : 'grin.me.eth.id'
    return snapshotGraphQLClient
      .request<{ proposals: Proposal[] }>(proposalsQuery(space))
      .then((data) => {
        setProposals(data.proposals)
        setHasActiveProposals(data.proposals.some((p) => p.state === 'active'))
      })
      .finally(() => setLoaded(true))
  }, [])

  useEffect(() => {
    loadProposals().then()
  }, [loadProposals])

  const getMyVote = async (proposalId: string, voterAddress: string) => {
    const data = await snapshotGraphQLClient.request<{ votes: Vote[] }>(
      latestVoteByAddressQuery(proposalId, voterAddress)
    )
    return data.votes.length > 0 ? data.votes[0] : null
  }

  const state = {
    proposals,
    loaded,
    hasActiveProposals,
    canVote,
    getMyVote,
  }

  return (
    <SnapshotContext.Provider value={state}>
      {children}
    </SnapshotContext.Provider>
  )
}

const proposalsQuery = (space: string) => `
  query ProposalsQuery {
    proposals(
      first: 10,
      skip: 0,
      where: {
        space_in: ["${space}",],
      },
      orderBy: "created",
      orderDirection: desc
    ) {
      id
      created
      state
      title
      body
      discussion
      author
      network
      snapshot
      start
      end
      choices
      scores
      scores_total
      scores_updated
      space {
        id
        name
      }
      scores_by_strategy
      strategies {
        name
        network
        params
      }
      app
    }
  }
`

const votesQuery = (proposalId: string) => `
  query VotesQuery {
    votes(
      first: 1000
      skip: 0
      where: {
        proposal: "${proposalId}"
      }
      orderBy: "created",
      orderDirection: desc
    ) {
      id
      voter
      vp
      vp_by_strategy
      vp_state
      created
      proposal {
        id
      }
      choice
      space {
        id
      }
    }
  }
`

// you can vote many times. this gets your latest vote
const latestVoteByAddressQuery = (proposalId: string, voterAddress: string) => `
  query LatestVoteByAddressQuery {
    votes(
      first: 1
      skip: 0
      where: {
        proposal: "${proposalId}"
        voter: "${voterAddress}"
      }
      orderBy: "created",
      orderDirection: desc
    ) {
      id
      voter
      vp
      vp_by_strategy
      vp_state
      created
      proposal {
        id
      }
      choice
      space {
        id
      }
    }
  }
`
