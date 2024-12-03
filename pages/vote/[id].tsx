import Head from 'next/head'
import { ProposalView } from '@/components/vote/ProposalView'

export default function VotePage() {
  return (
    <>
      <Head>
        <title>Cabin Governance</title>
      </Head>
      <ProposalView />
    </>
  )
}
