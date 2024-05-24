import styled from 'styled-components'
import { Body1, H4, Subline1 } from '../core/Typography'
import IconButton from '../core/IconButton'
import analytics from '@/lib/googleAnalytics/analytics'

interface CollapsibleItemProps {
  title: string
  description: string
  index: number
  open: boolean
  toggleOpen: (index: number) => void
}

export const CollapsibleItem = ({
  title,
  description,
  index,
  open = false,
  toggleOpen,
}: CollapsibleItemProps) => {
  // Prevents the click event from propagating to the parent container
  const onResponseClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleQuestionClick = () => {
    if (!open) {
      analytics.faqItemExpand(title)
    }
    toggleOpen(index)
  }

  return (
    <Container onClick={handleQuestionClick}>
      <TitleContainer>
        <Title>
          <Subline1 $color="yellow600">0{index + 1}</Subline1>
          <Text>
            <H4>{title}</H4>
            {open && (
              <div onClick={onResponseClick}>
                <Body1>{description}</Body1>
              </div>
            )}
          </Text>
        </Title>
        <IconButton size={1} icon={open ? 'minus' : 'plus'} />
      </TitleContainer>
    </Container>
  )
}

const Text = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  align-items: flex-start;
  justify-content: flex-start;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-top: 0.1rem solid ${({ theme }) => theme.colors.green900}1A;
  gap: 0.8rem;
  padding: 1.6rem 2.4rem;
  cursor: pointer;

  ${Body1} {
    opacity: 0.75;
  }

  ${({ theme }) => theme.bp.lg} {
    padding: 1.6rem 2.4rem;
    padding: 1.6rem 4rem;

    ${Body1} {
      max-width: 90%;
    }
  }
`

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
`

const Title = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.9rem;
  align-items: flex-start;
  justify-content: flex-start;

  ${Subline1}, ${H4} {
    user-select: none;
  }
`
