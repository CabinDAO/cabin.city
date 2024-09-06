import React, { useState } from 'react'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useModal } from '@/components/hooks/useModal'
import { useError } from '@/components/hooks/useError'
import { profileFromApiCookies } from '@/utils/api/withAuth'
import { useBackend } from '@/components/hooks/useBackend'
import { AdminActions, AdminParamsType } from '@/utils/types/admin'
import {
  WalletGenerateParamsType,
  WalletGenerateResponse,
} from '@/utils/types/wallet'
import styled from 'styled-components'
import { ContentCard } from '@/components/core/ContentCard'
import { BaseLayout } from '@/components/core/BaseLayout'
import { TitleCard } from '@/components/core/TitleCard'
import { Body1 } from '@/components/core/Typography'
import { Button } from '@/components/core/Button'
import { InputText } from '@/components/core/InputText'
import LoadingSpinner from '@/components/core/LoadingSpinner'

export default function Page({}: InferGetServerSidePropsType<
  typeof getServerSideProps
>) {
  const { showModal } = useModal()
  const { showError } = useError()
  const { post } = useBackend()
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  return (
    <BaseLayout>
      <TitleCard title="Admin" icon="peace-sign" />
      <StyledContentCard>
        <Action>
          <Button
            onClick={async () => {
              setLoading(true)
              const res = await post('ADMIN', {
                action: AdminActions.fixTokenBalances,
              } satisfies AdminParamsType)
              setLoading(false)
              showModal(() => (
                <div style={{ padding: '4rem' }}>
                  <Body1>response: {JSON.stringify(res)}</Body1>
                </div>
              ))
            }}
          >
            {loading ? (
              <>
                <LoadingSpinner />
                &nbsp; {/* this keeps the button height from collapsing */}
              </>
            ) : (
              'Fix token balances (very slow)'
            )}
          </Button>
        </Action>

        <WalletGenContainer>
          <InputText
            value={input}
            placeholder={'pr_abcd1234'}
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
