import { ColorName } from '@/styles/theme'
import { ReactNode } from 'react'
import styled from 'styled-components'
import { Caption } from './Typography'

const Container = styled.div<{
  maxHeight?: number
  backgroundColor: ColorName
}>`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 0.8rem 0;
  gap: 1.2rem;
  background: ${(props) => props.theme.colors[props.backgroundColor]};
  border: 1px solid ${(props) => props.theme.colors.yellow900};
  overflow: hidden;
  height: 100%;
  width: 100%;
`

export const MenuSection = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`

const SectionTitleContainer = styled.div`
  padding: 0.8rem 1.6rem 0.4rem;
  color: ${(props) => props.theme.colors.yellow900};
`

interface MenuSectionTitleProps {
  title: string
}

export const MenuSectionTitle = ({ title }: MenuSectionTitleProps) => (
  <SectionTitleContainer>
    <Caption>{title}</Caption>
  </SectionTitleContainer>
)

interface MenuPopupProps {
  open: boolean
  fullWidth?: boolean
}

export const MenuPopup = styled.div<MenuPopupProps>`
  position: absolute;
  z-index: 100;
  left: 0rem;
  top: calc(100% + 0.4rem);
  width: ${(props) => (props.fullWidth ? '100%' : 'auto')};
  ${(props) => !props.open && 'overflow: hidden;'}
  transition: max-height 100ms linear;
  max-height: ${(props) => (props.open ? `50vh` : '0')};
`

interface MenuProps {
  children: ReactNode
  maxHeight?: number
  backgroundColor?: ColorName
}

export const Menu = (props: MenuProps) => {
  const backgroundColor = props.backgroundColor ?? 'white'
  return (
    <Container maxHeight={props.maxHeight} backgroundColor={backgroundColor}>
      {props.children}
    </Container>
  )
}
