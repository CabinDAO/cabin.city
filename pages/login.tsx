import { Login } from '@/components/auth/Login'
import { OnboardingLayout } from '@/components/layouts/OnboardingLayout'
import OnboardingFrameSvg from '@/components/core/svg/onboarding-frame.svg'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { AnimatePresence, motion } from 'framer-motion'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false)
      }, 500)
    }
  }, [isLoading])

  return (
    <OnboardingLayout>
      <ContentContainer>
        <BackgroundContainer>
          <OnboardingFrameSvg />
        </BackgroundContainer>
        <AnimatePresence>
          {!isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Login />
            </motion.div>
          )}
        </AnimatePresence>
      </ContentContainer>
    </OnboardingLayout>
  )
}

const ContentContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  max-width: 64.7rem;
  max-height: 73.2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const BackgroundContainer = styled.div`
  svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
`
