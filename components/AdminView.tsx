import React, { useState } from 'react'
import { useModal } from '@/components/hooks/useModal'
import { useError } from '@/components/hooks/useError'
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
import {
  StampGrantParamsType,
  StampGrantResponse,
  StampListResponse,
} from '@/utils/types/stamp'
import { Dropdown } from '@/components/core/Dropdown'

export const AdminView = () => {
  return (
    <BaseLayout>
      <TitleCard title="Admin" icon="peace-sign" />
      <StyledContentCard>
        <FixTokenBalances />
        <WalletGenerator />
        <GiveStamp />
      </StyledContentCard>
    </BaseLayout>
  )
}

const StyledContentCard = styled(ContentCard)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 4rem;
  width: 100%;
  padding: 1.6rem;
`

const FixTokenBalances = () => {
  const [loading, setLoading] = useState(false)
  const { post } = useBackend()
  const { showModal } = useModal()

  return (
    <div>
      <Button
        onClick={async () => {
          setLoading(true)
          const res = await post('api_admin', {
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
    </div>
  )
}

const WalletGenerator = () => {
  const { showModal } = useModal()
  const { showError } = useError()
  const { post } = useBackend()
  const [input, setInput] = useState('')

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '2.4rem',
        alignItems: 'flex-end',
      }}
    >
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
            'api_wallet_generate',
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
    </div>
  )
}

const GiveStamp = () => {
  const { showModal } = useModal()
  const { showError } = useError()
  const { useGet, useMutate } = useBackend()
  const [profileId, setProfileId] = useState('')
  const [stampId, setStampId] = useState<number | null>(null)

  const { data } = useGet<StampListResponse>('api_stamp_list')
  const stamps = !data || 'error' in data ? [] : data.stamps

  const { trigger: grantStamp } =
    useMutate<StampGrantResponse>('api_stamp_grant')

  const options = stamps.map((stamp) => ({
    label: stamp.name,
    value: stamp.id,
  }))

  const handleGrantStamp = async () => {
    if (!stampId) {
      showError('Select a stamp')
      return
    }
    if (!profileId) {
      showError('Enter a profile ID of the user getting the stamp')
      return
    }

    const res = await grantStamp<StampGrantResponse>({
      id: stampId,
      profileExternId: profileId,
    } satisfies StampGrantParamsType)

    if (!res || 'error' in res) {
      showError(res?.error ?? 'An error occurred')
    } else {
      showModal(() => (
        <div style={{ padding: '4rem' }}>
          <Body1>
            {res.previouslyClaimed
              ? 'They already have that stamp'
              : 'Stamp granted'}
          </Body1>
        </div>
      ))
    }
  }

  return (
    <>
      <StampContainer>
        <div style={{ width: '100%' }}>
          <Dropdown
            selectedOption={options.find((o) => o.value === stampId)}
            onSelect={(o) => setStampId(o.value as number)}
            label="grant stamp"
            options={options}
            menuMaxHeight={'30rem'}
            enableSearch
          />
        </div>
        <InputText
          value={profileId}
          placeholder={'pr_abcd1234'}
          onChange={(e) => setProfileId(e.target.value)}
          label={'to user'}
        />
        <Button style={{ height: 'min-content' }} onClick={handleGrantStamp}>
          Grant Stamp
        </Button>
      </StampContainer>
    </>
  )
}

const StampContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: flex-end;
`
