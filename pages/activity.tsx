import Head from 'next/head'
import { ActivityView } from '@/components/activity/ActivityView'

export default function ActivityPage() {
  return (
    <>
      <Head>
        <title>Cabin City Directory</title>
      </Head>
      <ActivityView />
    </>
  )
}
