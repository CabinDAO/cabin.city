import React from 'react'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import styled from 'styled-components'
import { ContentCard } from '@/components/core/ContentCard'
import { profileFromApiCookies } from '@/utils/api/withAuth'
import { BaseLayout } from '@/components/core/BaseLayout'
import { TitleCard } from '@/components/core/TitleCard'
import { Body1 } from '@/components/core/Typography'
import { Button } from '@/components/core/Button'
import { useBackend } from '@/components/hooks/useBackend'

export default function Page({}: InferGetServerSidePropsType<
  typeof getServerSideProps
>) {
  const { post } = useBackend()
  return (
    <BaseLayout>
      <TitleCard title="Admin" icon="peace-sign" />
      <StyledContentCard>
        <Body1>This page is for admin purposes only.</Body1>
        <Button
          onClick={async () => {
            console.log('posting')
            const res = await post('DEV', {})
            console.log(res)
          }}
        >
          fix contact info
        </Button>
      </StyledContentCard>
    </BaseLayout>
  )
}

export const getServerSideProps = (async (context) => {
  const profile = await profileFromApiCookies(context.req.cookies)

  if (!profile?.isAdmin) {
    return { notFound: true }
  }

  return { props: {} }
}) satisfies GetServerSideProps

const StyledContentCard = styled(ContentCard)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.4rem;
  width: 100%;
`
