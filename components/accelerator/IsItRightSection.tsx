import React from 'react'
import { Body1, H3 } from '@/components/core/Typography'
import { AcceleratorSectionTitle } from '@/components/accelerator/AcceleratorPageView'
import styled from 'styled-components'

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
      <AcceleratorSectionTitle light>
        Is the Neighborhood Accelerator for you?
      </AcceleratorSectionTitle>

      <H3>This program is for you if you want to</H3>

      {yesBlocks.map((block, i) => (
        <Block key={i}>
          <H3>{block.title}</H3>
          {block.text}
        </Block>
      ))}

      <H3>This program is not for you if</H3>

      {noBlocks.map((block, i) => (
        <Block key={i}>
          <H3>{block.title}</H3>
          {block.text}
        </Block>
      ))}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 2.4rem;

  ${H3}, ${Body1} {
    color: ${({ theme }) => theme.colors.yellow200};
  }
`
const Block = styled.div`
  display: flex;
  flex-direction: column;
`
