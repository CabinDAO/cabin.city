import { IconName } from './Icon'
import styled from 'styled-components'
import { CabinGradientCard } from './CabinGradientCard'
import { Overline } from './Typography'
import { AppLink } from '@/components/core/AppLink'
import { EmptyStateDescription } from './EmptyStateDescription'

interface EmptyStateProps {
  icon: IconName
  title: string
  description: string
  href?: string
  customCta?: () => JSX.Element
  className?: string
}

export const EmptyState = ({
  icon,
  title,
  description,
  href,
  customCta,
  className,
}: EmptyStateProps) => {
  const WrapperCard = href || customCta ? CabinGradientCard : EmptyContainer
  return (
    <WrapperCard className={className}>
      <InnerContainer>
        <EmptyStateDescription
          title={title}
          description={description}
          icon={icon}
        />
        {customCta ? (
          customCta()
        ) : href ? (
          <AppLink external location={href} iconSize={0.9}>
            <Overline>Learn More</Overline>
          </AppLink>
        ) : null}
      </InnerContainer>
    </WrapperCard>
  )
}

const EmptyContainer = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.colors.yellow200};
`

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.green900};
  gap: 1.2rem;
`
