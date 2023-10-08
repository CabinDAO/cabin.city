import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { EXTERNAL_LINKS } from '@/utils/external-links'

export const ContactUsLink = ({ children }: { children: React.ReactNode }) => {
  return (
    <StyledLink
      href={`mailto:${EXTERNAL_LINKS.GENERAL_EMAIL_ADDRESS}`}
      style={{ textDecoration: 'underline' }}
      target={'_blank'}
      rel={'noreferer'}
    >
      {children}
    </StyledLink>
  )
}

const StyledLink = styled(Link)`
  text-decoration: underline;
`
