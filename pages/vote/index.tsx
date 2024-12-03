import Head from 'next/head'
import { ProposalListView } from '@/components/vote/ProposalListView'

export default function VotePage() {
  return (
    <>
      <Head>
        <title>Cabin Governance</title>
      </Head>
      <ProposalListView />
    </>
  )
}
