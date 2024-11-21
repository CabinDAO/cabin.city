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
  proposalsLoaded: boolean
  reloadProposals: VoidFunction
  userVotes: Vote[]
  userVotesLoaded: boolean
  reloadUserVotes: VoidFunction
  hasActiveProposals: boolean
  canVote: boolean
  hasUserVotableProposals: boolean
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
      ? privyUser?.wallet && //.walletClientType === 'privy' && // TODO: is this right? maybe any wallet works via privy?
        (user?.cabinTokenBalanceInt || 0) > 0
      : !!user) || false

  const [proposals, setProposals] = useState<Proposal[]>([])
  const [userVotes, setUserVotes] = useState<Vote[]>([])
  const [proposalsLoaded, setProposalsLoaded] = useState(false)
  const [userVotesLoaded, setUserVotesLoaded] = useState(false)
  const [hasActiveProposals, setHasActiveProposals] = useState(false)
  const [hasUserVotableProposals, setHasUserVotableProposals] = useState(false)

  const space = isProd ? 'cabindao.eth' : 'grin.me.eth.id'

  const loadProposals = useCallback(async () => {
    return snapshotGraphQLClient
      .request<{ proposals: Proposal[] }>(proposalsQuery(space))
      .then((data) => {
        setProposals(data.proposals)
        setHasActiveProposals(data.proposals.some((p) => p.state === 'active'))
      })
      .finally(() => setProposalsLoaded(true))
  }, [])

  const reloadProposals = async () => {
    setProposalsLoaded(false)
    await loadProposals()
    setProposalsLoaded(true)
  }

  const loadUserVotes = useCallback(async () => {
    if (!user?.walletAddress) return
    return snapshotGraphQLClient
      .request<{ votes: Vote[] }>(userVotesQuery(space, user.walletAddress))
      .then((data) => {
        setUserVotes(data.votes)
      })
      .finally(() => setUserVotesLoaded(true))
  }, [user])

  const reloadUserVotes = async () => {
    setUserVotesLoaded(false)
    await loadUserVotes()
    setUserVotesLoaded(true)
  }

  useEffect(() => {
    loadProposals().then()
    loadUserVotes().then()
  }, [loadProposals, loadUserVotes])

  useEffect(() => {
    setHasUserVotableProposals(
      canVote &&
        proposals.some(
          (p) =>
            p.state === 'active' &&
            !userVotes.some((v) => v.proposal.id === p.id)
        )
    )
  }, [proposals, userVotes, canVote])

  const state = {
    proposals,
    proposalsLoaded,
    reloadProposals,
    userVotes,
    userVotesLoaded,
    reloadUserVotes,
    hasActiveProposals,
    canVote,
    hasUserVotableProposals,
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

const userVotesQuery = (space: string, voterAddress: string) => `
  query UserVotesQuery {
    votes(
      first: 1000
      skip: 0
      where: {
        space: "${space}"
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
