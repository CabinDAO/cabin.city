import React, { useState } from 'react'
import Link from 'next/link'
import { EXTERNAL_LINKS } from '@/utils/external-links'
import styled, { css } from 'styled-components'
import { Body1 } from '@/components/core/Typography'
import Icon from '@/components/core/Icon'
import { SectionTitle } from '@/components/accelerator/shared'
import { acceleratorApplyClickEvent } from '@/lib/googleAnalytics/analytics'

const faqs = [
  {
    q: 'What’s the application process like?',
    a: (
      <>
        <Body1>
          1. You apply{' '}
          <Link
            href={EXTERNAL_LINKS.NEIGHBORHOOD_COHORT_APPLICATION_FORM}
            onClick={() => acceleratorApplyClickEvent('accelerator-faq')}
            style={{ textDecoration: 'underline' }}
            target="_blank"
            rel="noopener"
          >
            here
          </Link>{' '}
          before 12:00pm MST on August 25th. Be sure to write from the heart and
          give thorough, well thought out answers in your application. We
          accepted 19% of applicants to our last program and plan to be even
          more selective this round.
        </Body1>
        <Body1>
          2. Our team reviews the applications and invites the strongest
          applicants to a 1:1 interview the following week. This is a 2-way
          interview in that we’re both assessing if it’s a mutual good fit for
          you to join the program. If we’re both a yes, then you’re in the
          program!
        </Body1>
      </>
    ),
  },
  {
    q: 'What’s the time commitment?',
    a: (
      <>
        <Body1>
          We recommend blocking out about 4 hours per week to fully participate
          in the program. This time is spent on mostly on-the-ground,
          neighborhood building activities like knocking on doors, making
          flyers, hosting events, and building genuine relationships with
          neighbors.
        </Body1>
        <Body1>
          Most participants find that the time they invest pays off
          exponentially in the form of a rich community of friends that enriches
          their lives for years to come.
        </Body1>
      </>
    ),
  },
  {
    q: `I'm not a natural "people person." Can I still succeed in building my neighborhood?`,
    a: (
      <Body1>
        Absolutely! Many participants in our past program started out feeling
        shy or introverted. Our goal is to provide you with the tools,
        strategies, and support to build connections in a way that feels deeply
        authentic to you.
      </Body1>
    ),
  },
  {
    q: "What if my neighbors aren't interested in community building?",
    a: (
      <>
        <Body1>
          Here’s the deal. There are 100% going to be people who couldn’t be
          bothered to participate in the community you’re building. And that’s
          ok. We’re not after them. together.
        </Body1>
        <Body1>
          We’re after the people who are secretly yearning for more connection.
          The people who are lonely and don’t know what to do about it. The
          people who would be deeply touched by the fact that you want to start
          something in y’all’s neighborhood. We’re after the people who are
          waiting for something beautiful to be a part of.{' '}
        </Body1>
        <Body1>
          Cultures vary across the globe, but people are inherently the same.
          They all want connection, they all want to feel a part of something
          meaningful.{' '}
        </Body1>
        <Body1>The right folks will say yes and that’s what matters. </Body1>
        <Body1>
          We’re excited to teach you how to connect deeply with your neighbors
          to create meaningful relationships, and build incredible things
          together.
        </Body1>
      </>
    ),
  },
  {
    q: `I live in a rural / urban / suburban area. Will this program work for my specific context?`,
    a: (
      <Body1>
        Yes, our program is designed to be adaptable to all types of
        neighborhoods. We’ve got success stories from folks in dense urban
        environments, sprawling suburbs, and rural communities. The principles
        of community building are universal, and we'll help you apply them to
        your unique situation
      </Body1>
    ),
  },
  {
    q: "What if I start the program and realize it's not for me?",
    a: (
      <Body1>
        We offer a 14-day money-back guarantee. If you participate in the first
        two weeks and feel it's not the right fit, we'll refund your money, no
        problem.
      </Body1>
    ),
  },
  {
    q: 'Is this program just for people brand new to neighborhood building or can I participate if I’ve been at it for a while?',
    a: (
      <>
        <Body1>
          You can absolutely join if you’ve been doing neighborhood work for any
          amount of time. The question is instead: do you have your own set of
          goals and desires for your neighborhood now? If so, then we’ll work
          together to create personalized roadmap of specific actions and
          experiments you’ll do for the duration of the program.{' '}
        </Body1>
        <Body1>
          Seasoned neighborhood builders will gain access to new perspectives
          and approaches, a supportive network of people as nerdy about
          neighborhoods as you are, and tools that can supercharge your existing
          efforts. Many folks in the Accelerator find that the program helps
          them achieve in months what might have taken years on their own.
        </Body1>
      </>
    ),
  },
  {
    q: 'When are the weekly calls?',
    a: (
      <Body1>
        We hold a weekly group call and mentor calls fairly often throughout the
        program. Once we’ve decided who’s in the program, we look through
        everyone’s weekly availability and choose times for the calls that
        people can make. So, we don’t have a clear time for when the calls will
        be, but will do everything we can to make sure they happen at times that
        work for you.{' '}
      </Body1>
    ),
  },
]

export const FaqSection = () => {
  return (
    <Container>
      <SectionTitle>FAQs</SectionTitle>

      {faqs.map((faq, i) => (
        <QuestionAnswer key={i} q={faq.q} a={faq.a} />
      ))}

      <Body1>
        Have additional questions?{' '}
        <Link
          href={`mailto:${EXTERNAL_LINKS.ACCELERATOR_EMAIL}`}
          style={{ textDecoration: 'underline' }}
        >
          Email us
        </Link>
        .
      </Body1>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 100%;

  ${({ theme }) => theme.bp.md} {
    width: calc(100vw - 30rem);
    max-width: 80rem;
  }
`

const QuestionAnswer = ({ q, a }: { q: string; a: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <QuestionContainer>
      <Question onClick={() => setIsOpen(!isOpen)}>
        <QuestionText>{q}</QuestionText>
        <Chevron>
          <SpinningIcon name={'chevron-down'} size={2} isOpen={isOpen} />
        </Chevron>
      </Question>
      <Answer isOpen={isOpen}>{a}</Answer>
    </QuestionContainer>
  )
}

const QuestionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const Question = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
  transition: all 1s ease-in-out;
  cursor: pointer;
`

const Chevron = styled.div`
  width: 2rem;
  flex: 0;
  padding: 0 2rem;
  opacity: 50%;
`

const SpinningIcon = styled(Icon)<{ isOpen: boolean }>`
  ${({ isOpen }) =>
    isOpen
      ? css`
          transform: rotate(180deg);
        `
      : null};
  transition: all 0.3s ease;
`

const QuestionText = styled(Body1)`
  font-weight: 600;
`

const Answer = styled.div<{ isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding-left: 0.8rem;
  overflow: hidden;
  max-height: ${({ isOpen }) => (isOpen ? '1000px' : '0')};
  transition: all 0.3s ease-in-out;
`
