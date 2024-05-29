import React from 'react'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Error from 'next/error'
import styled from 'styled-components'
import { ContentCard } from '@/components/core/ContentCard'
import { profileFromApiCookies } from '@/utils/api/withAuth'
import { BaseLayout } from '@/components/core/BaseLayout'
import { TitleCard } from '@/components/core/TitleCard'
import { Body1 } from '@/components/core/Typography'

export default function Page({
  isAdmin,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (!isAdmin) {
    return <Error statusCode={404} />
  }

  return (
    <BaseLayout>
      <TitleCard title="Admin" icon="peace-sign" />
      <StyledContentCard>
        <Body1>This page is for admin purposes only.</Body1>
      </StyledContentCard>
    </BaseLayout>
  )
}

export const getServerSideProps = (async (context) => {
  const profile = await profileFromApiCookies(context.req.cookies)

  return { props: { isAdmin: profile ? profile.isAdmin : false } }
}) satisfies GetServerSideProps<{ isAdmin: boolean }>

const StyledContentCard = styled(ContentCard)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.4rem;
  width: 100%;
`
