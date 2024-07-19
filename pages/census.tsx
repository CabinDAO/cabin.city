import Head from 'next/head'
import { CensusView } from '@/components/directory/CensusView'

const CensusPage = () => {
  return (
    <>
      <Head>
        <title>Cabin Census</title>
      </Head>
      <CensusView />
    </>
  )
}

export default CensusPage
