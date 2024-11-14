import Head from 'next/head'
import { VoteView } from '@/components/vote/VoteView'

export default function VotePage() {
  return (
    <>
      <Head>
        <title>Cabin Governance</title>
      </Head>
      <VoteView />
    </>
  )
}
