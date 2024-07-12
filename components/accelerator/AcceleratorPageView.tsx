import React from 'react'
import { Body1, fonts, H1, H2, H3 } from '@/components/core/Typography'
import headerBg from '@/components/accelerator/accelerator-header.jpg'
import { BaseLayout } from '@/components/core/BaseLayout'
import { LandingSection } from '@/components/landing/LandingSection'
import { Carousel } from '@/components/accelerator/Carousel'
import { Top } from '@/components/accelerator/Top'

export const AcceleratorPageView = () => {
  return (
    <BaseLayout variant="landing">
      <LandingSection
        fullWidth
        noVertPadding
        variant={'clear'}
        style={{
          backgroundImage: `url(${headerBg.src})`,
          backgroundSize: 'cover',
          backgroundPosition: '50% 40%',
        }}
      >
        <Top />
      </LandingSection>

      <LandingSection>
        <Carousel />
      </LandingSection>

      <LandingSection
        title={'Where thriving neighborhoods happen'}
        variant={'light'}
      >
        <Body1>
          The Cabin Neighborhood Accelerator is a catalyst for community
          building.
        </Body1>

        <Body1>We give you 4 core things:</Body1>
        <Body1>
          - Live + Async Instruction: You’ll learn how to build community in
          your neighborhood step-by-step.
        </Body1>
        <Body1>
          - Mentorship: You’ll learn from experienced mentors who have
          successfully built vibrant communities. They’ll be available to share
          what worked and coach you through whatever comes up.
        </Body1>
        <Body1>
          - Accountability: You’ll be held accountable to take specific,
          time-tested actions each week to build a neighborhood you’re proud of.
        </Body1>
        <Body1>
          - People: You’ll join a global network of passionate neighborhood
          stewards each building community in their distinct local context.
        </Body1>
      </LandingSection>

      <LandingSection
        title={'Is this program right for you?'}
        variant={'default'}
      >
        <H2>You'll love this progam if you want to...</H2>

        <H3>Turn neighbors into friends</H3>
        <Body1>
          Feeling a rich sense of belonging and connection in your neighborhood
          is deeply important to you.{' '}
        </Body1>

        <H3>Create a strong & resilient community</H3>
        <Body1>
          You want to co-create the social infrastructure to make sure people
          are taken care of when they need it most. If you’re a parent, you want
          to create “the village” that it takes to raise a child.{' '}
        </Body1>

        <H3>Connect with local families</H3>

        <H3>Turn your friends into neighbors</H3>
        <Body1>
          You want to get your friends to live within walking distance of you
          and make hanging out frictionless.
        </Body1>

        <H3>Get After It & Grow as a Person</H3>
        <Body1>
          You’re willing to try different things, run experiments, be wrong, try
          something new, and keep going even when it’s hard.
        </Body1>

        <H3>Build a network city of distributed neighborhoods</H3>
        <Body1>
          Cabin’s larger vision is create a network of interconnected
          neighborhood communities around the world where people can easily find
          their tribe, live near friends, and create vibrant, multigenerational
          communities. If this excites you, you’re in the right place.
        </Body1>
      </LandingSection>
      <LandingSection title={'Think twice if'} variant={'light'}>
        <H3>You're looking for instant results or a quick fix</H3>
        <Body1>
          Neighborhood building is hard, deeply personal work. If you’re not
          willing to put in the work required each week to build something
          meaningful, this program is not for you.
        </Body1>

        <H3>You are on a solo journey</H3>
        <Body1>
          Supporting other folks in the program, comparing approaches, sharing
          ideas are all fundamental to the collective success of our
          neighborhoods.{' '}
        </Body1>

        <H3>You're extremely busy</H3>
        <Body1>
          Participation in this program takes on average 4 hours a week. If you
          don’t have the space to participate and make things happen in your
          neighborhood, this program isn’t for you.
        </Body1>

        <H3>You're not rooted</H3>
        <Body1>
          If you're not committed to investing in your current neighborhood for
          the long term, this program isn’t for you. We’d love to have you once
          you’re committed.{' '}
        </Body1>
      </LandingSection>
    </BaseLayout>
  )
}
