import { GetStaticProps } from 'next'
import React from 'react'
import styled from 'styled-components'
import { ContentCard } from '@/components/core/ContentCard'
import { BaseLayout } from '@/components/core/BaseLayout'
import { TitleCard } from '@/components/core/TitleCard'
import { Body1 } from '@/components/core/Typography'
import { isLocalDev } from '@/utils/dev'

export default function Page() {
  return (
    <BaseLayout>
      <TitleCard title="Dev" icon="peace-sign" />
      <StyledContentCard>
        <Body1>This page is for dev purposes only.</Body1>
      </StyledContentCard>
    </BaseLayout>
  )
}

export const getStaticProps = (async () => {
  return isLocalDev ? { props: {} } : { notFound: true }
}) satisfies GetStaticProps

const StyledContentCard = styled(ContentCard)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.4rem;
  width: 100%;
`
