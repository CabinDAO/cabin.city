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
  proposalVotes: { [key: string]: Vote[] }
  loadAllProposalVotes: VoidFunction
  userVotes: Vote[]
  userVotesLoaded: boolean
  reloadUserVotes: VoidFunction
  countActiveProposals: number
  countUserVotableProposals: number
  canVote: boolean
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

  const canVote: boolean = isProd
    ? !!privyUser?.wallet && (user?.cabinTokenBalanceInt || 0) > 0
    : !!user

  const [proposals, setProposals] = useState<Proposal[]>([])
  const [proposalsLoaded, setProposalsLoaded] = useState(false)
  const [proposalVotes, setProposalVotes] = useState<{ [key: string]: Vote[] }>(
    {}
  )
  const [userVotes, setUserVotes] = useState<Vote[]>([])
  const [userVotesLoaded, setUserVotesLoaded] = useState(false)

  const [countActiveProposals, setCountActiveProposals] = useState(0)
  const [countUserVotableProposals, setCountUserVotableProposals] = useState(0)

  const [keepAllProposalVotesLoaded, setKeepAllProposalVotesLoaded] =
    useState(false)

  const loadAllProposalVotes = useCallback(() => {
    setKeepAllProposalVotesLoaded(true)
  }, [])

  const space = isProd ? 'cabindao.eth' : 'grin.me.eth.id'

  const reloadProposals = useCallback(async () => {
    setProposalsLoaded(false)

    // should this be done via try/finally?

    const data = await snapshotGraphQLClient.request<{ proposals: Proposal[] }>(
      proposalsQuery(space)
    )
    setProposals(data.proposals)
    setCountActiveProposals(
      data.proposals.filter((p) => p.state === 'active').length
    )

    if (keepAllProposalVotesLoaded) {
      //if proposal votes have already been loaded, reload them
      const votesData = await snapshotGraphQLClient.request<{ votes: Vote[] }>(
        votesForProposalsQuery(data.proposals.map((p) => p.id))
      )

      // Bucket votes by proposal ID
      const votesByProposal = votesData.votes.reduce((acc, vote) => {
        const proposalId = vote.proposal.id
        if (!acc[proposalId]) {
          acc[proposalId] = []
        }
        acc[proposalId].push(vote)
        return acc
      }, {} as { [key: string]: Vote[] })

      setProposalVotes(votesByProposal)
    }
    setProposalsLoaded(true)
  }, [space, keepAllProposalVotesLoaded])

  const reloadUserVotes = useCallback(async () => {
    console.log('reloadUserVotes')
    if (!user?.walletAddress) return
    setUserVotesLoaded(false)
    const data = await snapshotGraphQLClient.request<{ votes: Vote[] }>(
      userVotesQuery(space, user.walletAddress)
    )
    setUserVotes(data.votes)
    setUserVotesLoaded(true)
  }, [user, space])

  useEffect(() => {
    reloadProposals()
    reloadUserVotes()
  }, [reloadProposals, reloadUserVotes])

  useEffect(() => {
    setCountUserVotableProposals(
      canVote
        ? proposals.filter(
            (p) =>
              p.state === 'active' &&
              !userVotes.some((v) => v.proposal.id === p.id)
          ).length
        : 0
    )
  }, [proposals, userVotes, canVote])

  const state = {
    proposals,
    proposalsLoaded,
    reloadProposals,
    userVotes,
    userVotesLoaded,
    reloadUserVotes,
    proposalVotes,
    loadAllProposalVotes,
    countActiveProposals,
    countUserVotableProposals,
    canVote,
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
        space: "${space}",
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

const votesForProposalsQuery = (proposalIds: string[]) => `
  query VotesForProposalsQuery {
    votes(
      first: 1000
      where: {
        proposal_in: [${proposalIds.map((id) => `"${id}"`).join(',')}]
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
