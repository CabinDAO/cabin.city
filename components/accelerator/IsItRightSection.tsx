import React from 'react'
import Link from 'next/link'
import { EXTERNAL_LINKS } from '@/utils/external-links'
import styled from 'styled-components'
import theme from '@/styles/theme'
import { Body1, fonts, H3, H4 } from '@/components/core/Typography'
import Icon from '@/components/core/Icon'
import { Button } from '@/components/core/Button'
import { Countdown } from '@/components/accelerator/Countdown'
import { subscribeSectionID } from '@/components/accelerator/AcceleratorPageView'
import { SectionTitle } from '@/components/accelerator/SectionTitle'

const yesBlocks = [
  {
    title: 'Turn Your Neighbors Into Friends',
    text: (
      <Body1>
        Feeling a rich sense of <strong>belonging</strong> and connection in
        your neighborhood is deeply important to you.
      </Body1>
    ),
  },
  {
    title: 'Turn Your Friends Into Your Neighbors',
    text: (
      <Body1>
        You want to get your friends to live within walking distance of you and
        make <strong>hanging out frictionless</strong>.
      </Body1>
    ),
  },
  {
    title: 'Create a Strong Community',
    text: (
      <Body1>
        You want to co-create the social infrastructure to make sure people are
        taken care of when they need it most. Maybe you want to{' '}
        <strong>create "the village" that it takes to raise a child</strong>.
      </Body1>
    ),
  },
  {
    title: 'Get After It & Grow as a Person',
    text: (
      <Body1>
        You’re willing to try different things, run experiments, be wrong, try
        something new, and <strong>keep going even when it’s hard</strong>.
      </Body1>
    ),
  },
  {
    title: 'Build a Network City of Distributed Neighborhoods',
    text: (
      <Body1>
        Cabin’s larger vision is create a network of interconnected neighborhood
        communities around the world where people can easily find their tribe,
        live near friends, and create vibrant, multigenerational communities. If
        this excites you, <strong>you’re in the right place</strong>.
      </Body1>
    ),
  },
]

const noBlocks = [
  {
    title: `You're looking for instant results or a quick fix`,
    text: (
      <Body1>
        Neighborhood building is hard, deeply personal work. If you’re not
        willing to put in the work required each week to build something
        meaningful, this program is not for you.
      </Body1>
    ),
  },
  {
    title: `You're not rooted`,
    text: (
      <Body1>
        If you're not committed to investing in your current neighborhood for
        the long term, this program isn’t for you. We’d love to have you once
        you’re committed.
      </Body1>
    ),
  },
  {
    title: `You're extremely busy`,
    text: (
      <Body1>
        Participation in this program takes on average 4 hours a week. If you
        don’t have the space to participate and make things happen in your
        neighborhood, this program isn’t for you.
      </Body1>
    ),
  },
  {
    title: `You're on a solo journey`,
    text: (
      <Body1>
        Supporting other folks in the program, comparing approaches, sharing
        ideas are all fundamental to the collective success of our
        neighborhoods.
      </Body1>
    ),
  },
]

export const IsItRightSection = () => {
  return (
    <Container>
      <TitleContainer>
        <SectionTitle light style={{ maxWidth: '65rem' }}>
          Is the Neighborhood Accelerator for you?
        </SectionTitle>
      </TitleContainer>

      <Section>
        <Subtitle>This program is for you if you want to:</Subtitle>
        <Blocks>
          {yesBlocks.map((block, i) => (
            <Block key={i}>
              <Icon name={'check'} size={2} color={'green400'} />
              <BlockTitle>{block.title}</BlockTitle>
              {block.text}
            </Block>
          ))}
          <CTABlock>
            <BlockTitle>Ready to transform your neighborhood?</BlockTitle>
            <BlockTitle>
              Apply by{' '}
              <span style={{ color: theme.colors.green400 }}>
                September 8th.
              </span>
            </BlockTitle>
            <Countdown light />
            <Link
              href={EXTERNAL_LINKS.NEIGHBORHOOD_COHORT_APPLICATION_FORM}
              style={{ width: 'min-content' }}
              target="_blank"
              rel="noopener"
            >
              <Button
                variant={'primary'}
                // endAdornment={<Icon name={'right-arrow'} size={2} />}
              >
                Apply
              </Button>
            </Link>
          </CTABlock>
        </Blocks>
      </Section>

      <Section>
        <Subtitle>It's not for you if:</Subtitle>
        <Blocks>
          {noBlocks.map((block, i) => (
            <Block key={i}>
              <Icon name={'close-long'} size={2} color={'red500'} />
              <BlockTitle>{block.title}</BlockTitle>
              {block.text}
            </Block>
          ))}
        </Blocks>
      </Section>

      <BottomSection>
        <div>
          <Subtitle>
            Not the right time yet? Wanna revisit in the future? All good.
          </Subtitle>
          <Body1>
            Be the first to know about future rounds of the program.
          </Body1>
        </div>
        <span>
          <Button
            variant={'secondary'}
            onClick={() => {
              document
                .querySelector(`#${subscribeSectionID}`)
                ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }}
          >
            Get Updates
          </Button>
        </span>
      </BottomSection>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 4rem;
  margin-bottom: 2rem;

  ${H3}, ${Body1} {
    color: ${({ theme }) => theme.colors.yellow100};
  }

  ${Body1} {
    font-weight: 400;
    line-height: 1.4;
  }

  ${({ theme }) => theme.bp.md} {
    width: 55rem;
    gap: 6rem;
  }

  ${({ theme }) => theme.bp.lg} {
    width: 80rem;
  }
`
const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
`

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`

const Subtitle = styled(H3)`
  font-family: ${fonts.poppins};
  color: ${({ theme }) => theme.colors.yellow100};
  font-size: 2.4rem;
  text-transform: none;

  ${({ theme }) => theme.bp.md} {
    margin-bottom: 2rem;
  }
`

const BottomSection = styled(Section)`
  ${({ theme }) => theme.bp.md} {
    flex-direction: row;
  }

  ${Subtitle} {
    ${({ theme }) => theme.bp.md} {
      font-size: 2rem;
      margin-bottom: 0;
    }
  }
`

const Blocks = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 2.4rem;

  ${({ theme }) => theme.bp.md} {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 4rem;
  }
`

const Block = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  ${({ theme }) => theme.bp.md} {
    width: 45%;
    margin-bottom: 1rem;
  }
`

const CTABlock = styled(Block)`
  border: solid 1px ${({ theme }) => theme.colors.green400};
  background-color: ${({ theme }) => theme.colors.green700}33;
  padding: 2rem;
  gap: 2rem;
`

const BlockTitle = styled(H4)`
  font-family: ${fonts.poppins};
  color: ${({ theme }) => theme.colors.yellow100};
  font-size: 1.7rem;
`
