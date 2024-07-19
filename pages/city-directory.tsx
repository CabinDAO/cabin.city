import Head from 'next/head'
import { CityDirectoryView } from '@/components/neighborhoods/CityDirectoryView'

const CityDirectory = () => {
  return (
    <>
      <Head>
        <title>Cabin City Directory</title>
      </Head>
      <CityDirectoryView />
    </>
  )
}

export default CityDirectory
