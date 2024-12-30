import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { prisma } from '@/lib/prisma'
import React from 'react'
import { BaseLayout } from '@/components/core/BaseLayout'
import { TitleCard } from '@/components/core/TitleCard'
import {
  Body1,
  captionStyles,
  H1,
  h1Styles,
} from '@/components/core/Typography'
import styled from 'styled-components'
import { ContentCard } from '@/components/core/ContentCard'
import { padding } from '@/styles/theme'
import { YEARLY_PRICE_IN_USD } from '@/utils/citizenship'
import { AutoImage } from '@/components/core/AutoImage'
import InviteClaimFlow, {
  Inviter,
} from '@/components/citizenship/InviteClaimFlow'

export default function Page({
  inviter,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // const [hideBenefits, setHideBenefits] = useState(false)
  return (
    <>
      <BaseLayout>
        <TitleCard title="Citizenship" icon="citizen" />
        <StyledContentCard shape={'notch'} notchSize={1.6}>
          {inviter ? (
            <>
              <AutoImage
                src={'/images/citizenship-campfire.jpg'}
                alt={'around a campfire'}
              />

              <Content>
                <Top>
                  <H1>Feel at home anywhere in the world</H1>
                  <StyledPrice>
                    <Amount>${YEARLY_PRICE_IN_USD}</Amount>
                    <Unit>per year</Unit>
                  </StyledPrice>
                </Top>
                <InviteClaimFlow
                  inviter={inviter}
                  // onStart={() => {
                  //   setHideBenefits(true)
                  // }}
                />
                {/* <CitizenshipBenefits suggestHide={hideBenefits} /> */}
              </Content>
            </>
          ) : (
            <ErrorMessage>
              <Body1>Invalid invite code</Body1>
            </ErrorMessage>
          )}
        </StyledContentCard>
      </BaseLayout>
    </>
  )
}

export const getServerSideProps = (async (context) => {
  const inviteCode = context.query.code as string
  const inviter = await prisma.profile.findUnique({
    where: {
      inviteCode: inviteCode,
    },
  })

  const data: Inviter | null = !inviter
    ? null
    : {
        name: inviter.name,
        code: inviteCode,
      }

  return { props: { inviter: data } }
}) satisfies GetServerSideProps<{ inviter: Inviter | null }>

const StyledContentCard = styled(ContentCard)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.4rem;
  width: 100%;
`

const ErrorMessage = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.red100};
  padding: 1.6rem;

  ${Body1} {
    color: ${({ theme }) => theme.colors.red600};
  }
`

const Top = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 2.4rem;
  justify-content: space-between;
  margin-bottom: 1.6rem;

  ${({ theme }) => theme.bp.md} {
    width: 45rem;
  }
`

const Amount = styled.span`
  ${h1Styles}
`
const Unit = styled.span`
  ${captionStyles}
`
const StyledPrice = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: baseline;
  gap: 0.8rem;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  align-items: center;
  width: 100%;
  ${padding('md', 'sm')};
`
