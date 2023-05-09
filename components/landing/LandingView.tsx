import { useRouter } from 'next/router'
import { useUser } from '../auth/useUser'
import styled from 'styled-components'
import { HTMLAttributes, useEffect } from 'react'
import { SingleColumnLayout } from '@/components/layouts/SingleColumnLayout'
import { Button } from '@/components/core/Button'
import {
  Body1,
  Body2,
  Caption,
  H1,
  H4,
  HHero,
  Overline,
  fonts,
  typographySharedStyles,
} from '@/components/core/Typography'
import { AppLink } from '@/components/core/AppLink'
import { ImageFlex } from '@/components/core/gallery/ImageFlex'
import { NeighborhoodsTop3List } from '@/components/landing/NeighborhoodsTop3List'
import { InputButton } from '@/components/core/InputButton'
import { Footer } from '@/components/navigation/Footer'
import { useModal } from '@/components/hooks/useModal'
import { SubscribeEmail } from '@/components/engagement/SubscribeEmail'
import { roleInfoFromType } from '@/utils/roles'
import { ProfileRoleLevelType, ProfileRoleType } from '@/generated/graphql'
import { levelInfoFromType } from '@/utils/levels'
import { RoleCard } from '@/components/core/RoleCard'
import { Slideshow } from '@/components/core/gallery/Slideshow'
import { EXTERNAL_LINKS } from '@/utils/external-links'
import Link from 'next/link'

export const LandingView = () => {
  const { user, isUserLoading } = useUser()
  const router = useRouter()
  const { showModal } = useModal()

  useEffect(() => {
    if (!isUserLoading && user) {
      router.push('/dashboard')
    }
  }, [isUserLoading, user, router])

  const onSubscribeEmail = () => showModal(() => <SubscribeEmail />)

  return (
    <SingleColumnLayout variant="full">
      <LandingSection>
        <LandingContent>
          <SectionContent>
            <StyledHHero>Grow a network city with us</StyledHHero>

            <SectionGrowTwoColumns>
              <SectionGrowSignup>
                <Link href="/login" rel="noreferrer">
                  <Button>Sign Up</Button>
                </Link>
                <a
                  href={EXTERNAL_LINKS.CABIN_DISCORD}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button variant="secondary">Join Discord</Button>
                </a>
              </SectionGrowSignup>

              <SectionGrowDescription>
                <Body1>
                  We are remote workers building better ways to colive, create,
                  and conserve. Cabin is a global network of properties in
                  nature connected with a shared culture, community, economy,
                  and governance.
                </Body1>

                <Overline>
                  <AppLink external location={EXTERNAL_LINKS.VISION}>
                    View our vision
                  </AppLink>
                </Overline>
              </SectionGrowDescription>
            </SectionGrowTwoColumns>
          </SectionContent>
        </LandingContent>
      </LandingSection>

      <LandingSection>
        <ImageFlex
          alt="together"
          src="/images/landing-together.png"
          height={50}
        />
      </LandingSection>

      <LandingSection>
        <LandingContent>
          <SectionContent>
            <SectionHeader>
              <H1 emphasized>Explore the city</H1>
              <SectionDescription>
                Access a thriving community of coliving opportunities,
                residencies and build weeks across the globe
              </SectionDescription>
            </SectionHeader>

            <NeighborhoodsTop3List />
          </SectionContent>
        </LandingContent>
      </LandingSection>

      <LandingSection variant="dark">
        <LandingContent>
          <SectionContent>
            <SectionHeader>
              <H1 emphasized>Level up your interests</H1>
              <SectionDescription>
                Collect role cards and passport stamps that unlock new places
                and build your reputation in the community
              </SectionDescription>
            </SectionHeader>

            <Slideshow>
              {Object.values(ProfileRoleType).map((role) => (
                <RoleCard
                  key={role}
                  variant="small"
                  roleInfo={roleInfoFromType(ProfileRoleType[role])}
                  levelInfo={levelInfoFromType(ProfileRoleLevelType.Custodian)}
                />
              ))}
            </Slideshow>
          </SectionContent>
        </LandingContent>
      </LandingSection>

      <LandingSection>
        <LandingContent>
          <SectionContent>
            <SectionHeader>
              <H1 emphasized>Shape Cabin&apos;s Network City</H1>
            </SectionHeader>

            <JoinOptions>
              <JoinOptionDetail>
                <JoinOptionDetailColumn>
                  <ImageFlex
                    alt="join-guest"
                    src="/images/join-guest.png"
                    width={6.4}
                    height={6.4}
                  />

                  <JoinPaymentOption>
                    <H4>Guest</H4>

                    <JoinPayment>
                      <JoinPrice>
                        <JoinPriceHero>Free</JoinPriceHero>
                      </JoinPrice>
                      <Body2>&nbsp;</Body2>
                    </JoinPayment>
                  </JoinPaymentOption>

                  <JoinOptionButton>
                    <AppLink
                      external
                      location={EXTERNAL_LINKS.CABIN_DISCORD}
                      iconSize={0}
                    >
                      <Button isFullWidth>Join Discord</Button>
                    </AppLink>
                  </JoinOptionButton>
                </JoinOptionDetailColumn>

                <JoinOptionDetailColumn>
                  <JoinOptionBenefits>
                    <JoinBenefit>Learn more about Cabin</JoinBenefit>
                    <JoinBenefit>Join a welcome call</JoinBenefit>
                    <JoinBenefit>Join the community conversations</JoinBenefit>
                    <JoinBenefit>Expand your network</JoinBenefit>
                    <JoinBenefit>
                      Stay up-to-date on opportunities and upcoming events
                    </JoinBenefit>
                  </JoinOptionBenefits>
                </JoinOptionDetailColumn>
              </JoinOptionDetail>

              <JoinOptionsSeparator />

              <JoinOptionDetail>
                <JoinOptionDetailColumn>
                  <ImageFlex
                    alt="join-community-member"
                    src="/images/join-community-member.png"
                    width={6.4}
                    height={6.4}
                  />

                  <JoinPaymentOption>
                    <H4>Community Member</H4>

                    <JoinPayment>
                      <JoinPrice>
                        <JoinPriceHero>Free</JoinPriceHero>
                      </JoinPrice>
                      <Body2>&nbsp;</Body2>
                    </JoinPayment>
                  </JoinPaymentOption>

                  <JoinOptionButton>
                    <AppLink location="/login" iconSize={0}>
                      <Button isFullWidth>Sign Up</Button>
                    </AppLink>
                  </JoinOptionButton>
                </JoinOptionDetailColumn>

                <JoinOptionDetailColumn>
                  <JoinOptionBenefits>
                    <JoinBenefit>Access the Member Directory</JoinBenefit>
                    <JoinBenefit>View the City Directory</JoinBenefit>
                    <JoinBenefit>
                      Ability to participate in City Offers
                    </JoinBenefit>
                    <JoinBenefit>Build your profile</JoinBenefit>
                    <JoinBenefit>Collect Passport Stamps</JoinBenefit>
                    <JoinBenefit>Earn roles and level up</JoinBenefit>
                  </JoinOptionBenefits>
                </JoinOptionDetailColumn>
              </JoinOptionDetail>

              <JoinOptionsSeparator />

              <JoinOptionDetail>
                <JoinOptionDetailColumn>
                  <ImageFlex
                    alt="join-founding-citizen"
                    src="/images/join-founding-citizen.png"
                    width={6.4}
                    height={6.4}
                  />

                  <JoinPayment>
                    <JoinPaymentOption>
                      <H4>Founding Citizen</H4>
                      <JoinPrice>
                        <JoinPriceHero>0.2 ETH</JoinPriceHero>

                        <JoinPaymentInterval>/ year</JoinPaymentInterval>
                      </JoinPrice>
                    </JoinPaymentOption>
                    <Body2>$400 | pay with credit card or crypto</Body2>
                  </JoinPayment>

                  <JoinOptionButton>
                    <AppLink
                      external
                      location={EXTERNAL_LINKS.FOUNDING_CITIZEN}
                      iconSize={0}
                    >
                      <Button isFullWidth>Learn more</Button>
                    </AppLink>
                  </JoinOptionButton>
                </JoinOptionDetailColumn>

                <JoinOptionDetailColumn>
                  <JoinOptionBenefits>
                    <JoinBenefit>Community Member benefits</JoinBenefit>
                    <JoinBenefit>Access to coliving opportunities</JoinBenefit>
                    <JoinBenefit>Join the City Directory</JoinBenefit>
                    <JoinBenefit>
                      Receive 25₡ to boost your voting power
                    </JoinBenefit>
                    <JoinBenefit>Merch and additional member perks</JoinBenefit>
                  </JoinOptionBenefits>

                  <JoinBenefitsCaption>
                    * FREE if you hold 1000 ₡ or a Passport Card
                  </JoinBenefitsCaption>
                </JoinOptionDetailColumn>
              </JoinOptionDetail>

              <JoinOptionsSeparator />
            </JoinOptions>
          </SectionContent>
        </LandingContent>
      </LandingSection>

      <LandingSection>
        <LandingForest>
          <ImageFlex
            alt="forest-network"
            src="/images/landing-forest-network.svg"
            height={32}
            width={84}
          />
        </LandingForest>
      </LandingSection>

      <LandingSection>
        <LandingContent>
          <SectionContent>
            <SectionHeader>
              <SubscribeToNewsletter>
                <H4>Subscribe to our newsletter</H4>
                <Body1>Stay up-to-date on Cabin&apos;s latest events</Body1>
              </SubscribeToNewsletter>

              <SubscribeWithEmail
                placeholder="Email"
                buttonProps={{ onClick: onSubscribeEmail }}
              >
                Subscribe
              </SubscribeWithEmail>
            </SectionHeader>
          </SectionContent>
        </LandingContent>
      </LandingSection>

      <LandingSection variant="dark">
        <LandingContent>
          <Footer />
        </LandingContent>
      </LandingSection>
    </SingleColumnLayout>
  )
}

export const LandingContent = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  justify-content: center;
  align-items: center;
  gap: 2.4rem;
  height: 100%;
  width: 100%;
  padding: 8rem 2.4rem;
  margin: auto;

  ${({ theme }) => theme.bp.md} {
    width: 61.2rem;
    align-self: flex-start;
    box-sizing: content-box;
    padding: 8rem 2.4rem 8rem 12.8rem;
  }

  ${({ theme }) => theme.bp.lg} {
    width: 84rem;
    align-self: center;
    padding: 8rem 4rem;
  }
`

export const StyledHHero = styled(HHero)`
  width: 28.8rem;

  ${({ theme }) => theme.bp.md} {
    width: 40rem;
    font-size: 4rem;
    line-height: 1.25;
  }

  ${({ theme }) => theme.bp.lg} {
    padding-top: 2rem;
    width: 100%;
    font-size: 5.6rem;
  }
`

export const SectionGrowTwoColumns = styled.div`
  display: flex;
  flex-flow: column;
  gap: 4rem;
  justify-content: space-between;

  ${({ theme }) => theme.bp.lg} {
    flex-direction: row;
    gap: 2.4rem;
  }
`

export const SectionGrowDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  ${({ theme }) => theme.bp.md} {
    align-self: end;
    width: 34.6rem;
  }
`

export const SectionGrowSignup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.8rem;

  ${({ theme }) => theme.bp.md_max} {
    > * {
      flex-grow: 1;
    }

    button {
      width: 100%;
    }
  }
`

export const SectionHeader = styled.div`
  display: flex;
  flex-flow: column;
  gap: 0.8rem;

  ${({ theme }) => theme.bp.lg} {
    align-items: center;
    text-align: center;
    gap: 1.6rem;
  }
`

export const SectionDescription = styled(Body1)`
  width: 100%;

  ${({ theme }) => theme.bp.md} {
    width: 43rem;
  }

  ${({ theme }) => theme.bp.lg} {
    width: 43.2rem;
  }
`

export const SectionContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  width: 100%;
`

type LandingSectionVariant = 'dark' | 'light'

interface LandingSectionProps extends HTMLAttributes<HTMLDivElement> {
  variant?: LandingSectionVariant
}

export const LandingSection = styled.div<LandingSectionProps>`
  flex-direction: column;
  background-color: ${({ theme, variant }) =>
    variant === 'dark' ? theme.colors.green800 : theme.colors.yellow200};
  width: 100%;
  overflow: hidden;

  ${H1} {
    color: ${({ theme, variant }) =>
      variant === 'dark' ? theme.colors.yellow100 : theme.colors.green900};
  }

  ${SectionDescription} {
    color: ${({ theme, variant }) =>
      variant === 'dark' ? theme.colors.yellow100 : theme.colors.green900};
  }

  ${({ theme }) => theme.bp.md} {
    gap: 4rem;
  }

  ${({ theme }) => theme.bp.lg} {
    gap: 2.4rem;
  }
`

export const LandingForest = styled.div`
  justify-content: center;
  display: flex;
`

export const SubscribeToNewsletter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`

export const JoinOptionDetail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: end;
  justify-content: space-between;

  ${({ theme }) => theme.bp.md} {
    flex-direction: row;
    gap: 8rem;
  }

  ${({ theme }) => theme.bp.lg} {
    flex-direction: column;
    gap: 3.6rem;
    width: 100%;
  }
`

export const JoinOptionDetailColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 100%;
`

export const JoinOptionButton = styled.div`
  margin: 0.4rem 0 0.4rem 0;
  width: 100%;

  ${({ theme }) => theme.bp.md} {
    width: 22.6rem;
  }

  ${({ theme }) => theme.bp.lg} {
    width: 100%;
  }
`

export const JoinOptionBenefits = styled.ul`
  list-style: inside;
  display: flex;
  flex-flow: column;
  gap: 1rem;
`

export const JoinBenefit = styled.li`
  ${typographySharedStyles}
  font-family: ${fonts.inter};
  font-weight: 400;
  line-height: 1.25;
  font-size: 1.3rem;
  opacity: 0.75;
  text-indent: -1.8rem;
  margin-left: 1.8rem;
`

export const SubscribeWithEmail = styled(InputButton)``

export const JoinBenefitsCaption = styled(Caption)`
  margin-top: 0.8rem;
`
export const JoinPaymentOption = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  ${({ theme }) => theme.bp.lg} {
    gap: 1.6rem;
  }
`

export const JoinPayment = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`

export const JoinOptionsSeparator = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.green900};
  opacity: 0.12;

  ${({ theme }) => theme.bp.lg} {
    border-bottom: none;
    border-right: 1px solid ${({ theme }) => theme.colors.green900};
  }
`

export const JoinOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;

  > :not(:last-child) ${JoinPayment} ${Body2} {
    display: none;
  }

  ${({ theme }) => theme.bp.md} {
    flex-direction: column;
  }

  ${({ theme }) => theme.bp.lg} {
    flex-direction: row;

    > :not(:last-child) ${JoinPayment} ${Body2} {
      display: block;
    }

    ${JoinOptionsSeparator}:last-child {
      display: none;
    }
  }
`

export const JoinPrice = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.8rem;
  white-space: nowrap;
  align-items: end;
`

export const JoinPriceHero = styled(HHero)`
  line-height: 0.9;

  ${({ theme }) => theme.bp.lg} {
    line-height: 0.71;
    font-size: 4.8rem;
  }
`

export const JoinPaymentInterval = styled(Caption)`
  line-height: 0.8;
  font-size: 1.8rem;
`
