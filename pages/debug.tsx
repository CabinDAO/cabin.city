import { SingleColumnLayout } from '@/components/layouts/SingleColumnLayout'
import { TitleCard } from '@/components/core/TitleCard'
import styled from 'styled-components'
import theme from '@/styles/theme'
import {
  GetProfilesInput,
  Profile,
  useGetProfilesQuery,
} from '@/generated/graphql'
// import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const DebugContent = styled.div`
  width: 100%;
  background-color: ${theme.colors.red100};
  padding: 2rem;
  font-size: 1.4rem;
  font-family: monospace;
  white-space: pre-wrap;
  overflow-x: auto;
  tab-width: 4;
`

// export async function getStaticProps() {
//   if (process.env.NODE_ENV !== 'development') {
//     return {
//       notFound: true,
//     }
//   }
//
//   return {
//     props: {},
//   }
// }

const DebugPage = () => {
  // const router = useRouter()
  // useEffect(() => {
  //   if (process.env.NODE_ENV !== 'development') {
  //     router.push('/404')
  //     return
  //   }
  // })

  const [profiles, setProfiles] = useState({} as Array<Profile>)

  const input = {
    roleTypes: [],
    levelTypes: [],
    citizenshipStatuses: [],
  } as GetProfilesInput

  const { data, loading, error } = useGetProfilesQuery({
    variables: {
      input,
      size: 30,
    },
  })

  useEffect(() => {
    if (data) {
      // fuck you tslist errors!!
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setProfiles(data.getProfiles.data)
    }
  }, [data, loading])

  return (
    <SingleColumnLayout>
      <TitleCard icon="alert" title="Debug" />
      <DebugContent>
        {JSON.stringify({ loading, error, profiles })}
      </DebugContent>
    </SingleColumnLayout>
  )
}

export default DebugPage
