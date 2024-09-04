import React, { useState } from 'react'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import styled from 'styled-components'
import { ContentCard } from '@/components/core/ContentCard'
import { profileFromApiCookies } from '@/utils/api/withAuth'
import { BaseLayout } from '@/components/core/BaseLayout'
import { TitleCard } from '@/components/core/TitleCard'
import { Body1, H3 } from '@/components/core/Typography'
import { Button } from '@/components/core/Button'
import { useBackend } from '@/components/hooks/useBackend'
import { InputText } from '@/components/core/InputText'
import {
  WalletGenerateParamsType,
  WalletGenerateResponse,
} from '@/utils/types/wallet'
import { useModal } from '@/components/hooks/useModal'
import { useError } from '@/components/hooks/useError'

export default function Page({}: InferGetServerSidePropsType<
  typeof getServerSideProps
>) {
  const { post } = useBackend()
  const [input, setInput] = useState('')
  const { showModal } = useModal()
  const { showError } = useError()

  return (
    <BaseLayout>
      <TitleCard title="Admin" icon="peace-sign" />
      <StyledContentCard>
        <Body1>This page is for admin purposes only.</Body1>

        <Action>
          <H3>hit the dev endpoint</H3>
          <Button
            onClick={async () => {
              console.log('posting')
              const res = await post('DEV', {})
              console.log(res)
            }}
          >
            DEV
          </Button>
        </Action>

        <WalletGenContainer>
          <InputText
            value={input}
            placeholder={'externId to generate wallet for'}
            onChange={(e) => setInput(e.target.value)}
            label={'generate privy wallet for user'}
          />
          <Button
            style={{ height: 'min-content' }}
            onClick={async () => {
              const res = await post<WalletGenerateResponse>(
                'WALLET_GENERATE',
                {
                  profileExternId: input,
                } satisfies WalletGenerateParamsType
              )
              if (!res || 'error' in res) {
                showError(res?.error ?? 'An error occurred')
              } else {
                showModal(() => (
                  <div style={{ padding: '4rem' }}>
                    <Body1>Wallet address: {res.address}</Body1>
                  </div>
                ))
              }
            }}
          >
            generate
          </Button>
        </WalletGenContainer>
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
  align-items: flex-start;
  justify-content: center;
  gap: 4rem;
  width: 100%;
  padding: 1.6rem;
`

const Action = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const WalletGenContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 2.4rem;
`
