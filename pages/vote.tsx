import Head from 'next/head'
import { ProposalView } from '@/components/vote/ProposalView'

export default function ProposalsPage() {
  return (
    <>
      <Head>
        <title>Cabin DAO Governance</title>
      </Head>
      <ProposalView />
    </>
  )
}
