import styled from 'styled-components'
import { motion } from 'framer-motion'

interface ZoomInCardProps {
  children: React.ReactNode
  hoverScale?: number
  tapScale?: number
  hovered?: boolean
}

export const ZoomInCard = ({
  children,
  hoverScale = 1.05,
  tapScale = 1.05,
  hovered = false,
}: ZoomInCardProps) => {
  return (
    <AnimatedContainer
      initial={false}
      animate={{
        scale: hovered ? hoverScale : 1,
        transition: { duration: 0.3 },
      }}
      whileTap={{ scale: tapScale }}
    >
      {children}
    </AnimatedContainer>
  )
}

const AnimatedContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
`
