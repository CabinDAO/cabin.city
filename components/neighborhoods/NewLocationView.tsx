import {
  CitizenshipStatus,
  useCreateLocationMutation,
} from '@/generated/graphql'
import { ActionBar } from '../core/ActionBar'
import { TitleCard } from '../core/TitleCard'
import { SingleColumnLayout } from '../layouts/SingleColumnLayout'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useModal } from '../hooks/useModal'
import { ErrorModal } from '../ErrorModal'
import { Body2, H3, H4, Overline } from '../core/Typography'
import { ContentCard } from '../core/ContentCard'
import { NoWrap } from '../core/NoWrap'
import { HorizontalDivider } from '../core/Divider'
import { AppLink } from '../core/AppLink'
import { EXTERNAL_LINKS } from '@/utils/external-links'
import { useUser } from '../auth/useUser'
import { useEffect } from 'react'
import { useFeatures } from '../hooks/useFeatures'
import { Feature } from '@/lib/features'

export const NewLocationView = () => {
  const router = useRouter()
  const [createLocation] = useCreateLocationMutation()
  const { showModal } = useModal()
  const { user } = useUser()
  const { hasFeature } = useFeatures()
  const canCreateListings =
    hasFeature(Feature.City) ||
    user?.citizenshipStatus === CitizenshipStatus.Verified

  const handlePrimaryButtonClick = async () => {
    try {
      const location = await createLocation()

      const id = location.data?.createLocation?._id

      id
        ? router.push(`/location/${id}/edit?created=true`)
        : showModal(() => (
            <ErrorModal
              title="Location Creation Error"
              description="There was an error creating your location"
            />
          ))
    } catch (error) {
      console.error(error)

      showModal(() => (
        <ErrorModal
          title="Location Creation Error"
          description="There was an error creating your location"
        />
      ))
    }
  }

  const handleSecondaryButtonClick = () => {
    router.push('/city-directory')
  }

  useEffect(() => {
    if (!canCreateListings) {
      router.push('/city-directory')
    }
  }, [router, canCreateListings])

  if (!canCreateListings) {
    return null
  }

  return (
    <SingleColumnLayout
      actionBar={
        <ActionBar
          primaryButton={{
            label: 'Let’s go!',
            onClick: handlePrimaryButtonClick,
          }}
          secondaryButton={{
            label: 'Cancel',
            onClick: handleSecondaryButtonClick,
          }}
        />
      }
    >
      <TitleCard title="New listing" icon="close" iconHref="/" />
      <Container>
        <H3>Getting Started</H3>
        <StyledContentCard shape="notch">
          <Content>
            <JoiningTextContainer>
              <H3>Joining the City Directory</H3>
              <Body2>
                Our City Directory connects people who want to rent out their
                property with people building better ways to live, create, and
                conserve at Cabin.
              </Body2>
              <Body2>
                Properties compete to increase their rank on the directory
                leaderboard. Improving your rank starts with creating an
                attractive listing and providing a quality experience at your
                location.
              </Body2>
              <Body2>
                All properties start out as ‘Outposts’ in the directory, and
                once they meet the minimum requirements, they level up to
                ‘Neighborhood’ status to unlock more Cabin features.
              </Body2>
            </JoiningTextContainer>
            <ListingTypeTextContainer>
              <ListingTextColumn>
                <NoWrap>
                  <H4>Outpost properties:</H4>
                </NoWrap>
                <StyledList>
                  <li>
                    <Body2>
                      New listing working to become a ‘Neighborhood’
                    </Body2>
                  </li>
                  <li>
                    <Body2>
                      Smaller locations that don’t meeting ‘Neighborhood’
                      requirements
                    </Body2>
                  </li>
                </StyledList>
              </ListingTextColumn>
              <ListingTextColumn>
                <NoWrap>
                  <H4>Neighborhood properties:</H4>
                </NoWrap>
                <StyledList>
                  <li>
                    <Body2>4 or more beds</Body2>
                  </li>
                  <li>
                    <Body2>20+ mbps internet speed</Body2>
                  </li>
                  <li>
                    <Body2>Earned 1,000 votes from the community</Body2>
                  </li>
                </StyledList>
              </ListingTextColumn>
            </ListingTypeTextContainer>
          </Content>
          <HorizontalDivider />
          <AppLink
            external
            location={EXTERNAL_LINKS.CITY_DIRECTORY}
            iconSize={0.9}
          >
            <Overline>Learn More</Overline>
          </AppLink>
        </StyledContentCard>
      </Container>
    </SingleColumnLayout>
  )
}

const Container = styled.div`
  padding-top: 2.4rem;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 100%;
  align-items: flex-start;
  justify-content: center;
`

const StyledList = styled.ul`
  list-style: outside disc;
  margin-left: 2rem;
  display: flex;
  flex-direction: column;

  li {
    padding-left: 2px;
  }
`

const StyledContentCard = styled(ContentCard)`
  padding: 3.2rem 2.4rem;
  flex-direction: column;
  gap: 2.4rem;
`
const Content = styled.div`
  width: 55%;
  flex-direction: column;
  display: flex;
  gap: 2.4rem;
`

const JoiningTextContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  align-items: flex-start;
  justify-content: center;
  opacity: 0.75;
`

const ListingTypeTextContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 4rem;
  width: 100%;
  align-items: flex-start;
  opacity: 0.75;
`

const ListingTextColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  align-items: flex-start;
  justify-content: flex-start;
`
