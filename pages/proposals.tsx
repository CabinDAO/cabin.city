import Head from 'next/head'
import { ProposalView } from '@/components/proposals/ProposalView'

export default function ProposalsPage() {
  return (
    <>
      <Head>
        <title>Governance Proposals</title>
      </Head>
      <ProposalView />
    </>
  )
}
