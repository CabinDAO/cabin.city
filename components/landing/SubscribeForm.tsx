import Script from 'next/script'
import styled from 'styled-components'
import { useEffect, useRef, useState } from 'react'
import {
  H1,
  buttonStyles,
  subline1Styles,
  subline2Styles,
} from '@/components/core/Typography'
import theme from '@/styles/theme'
import { useEvent } from 'react-use'
import events from '@/lib/googleAnalytics/events'

const FORM_ID = 5111496 // just in case

export const SubscribeForm = () => {
  const contentRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement | null>(null)
  const [isFormReady, setIsFormReady] = useState(false)

  useEvent(
    'click',
    (e) => {
      if (formRef.current) {
        const button = formRef.current.querySelector('button')

        if (button && button.contains(e.target as Node)) {
          const input = formRef.current.querySelector('input')

          if (input && input.value) {
            events.subscribeToNewsletterEvent(input.value)
          }

          e.stopPropagation()
        }
      }
    },
    formRef.current
  )

  useEffect(() => {
    if (
      isFormReady &&
      contentRef.current &&
      formRef.current &&
      contentRef.current !== formRef.current.parentElement
    ) {
      contentRef.current.appendChild(formRef.current)
      formRef.current.style.display = 'block'
    }

    return () => {
      if (formRef.current) {
        formRef.current.style.display = 'none'

        document.body.appendChild(formRef.current)
      }
    }
  }, [isFormReady])

  return (
    <SubscribeEmailContainer>
      <SubscribeEmailContent ref={contentRef}>
        {!isFormReady && <H1>...</H1>}

        <Script
          async
          onReady={() => {
            formRef.current = document.querySelectorAll<HTMLFormElement>(
              "form[data-uid='c4a002dfe9']"
            )[0]

            formRef.current.style.display = 'none'

            const input = formRef.current.querySelector('input')

            if (input) {
              input.placeholder = 'Email'
            }

            const button = formRef.current.querySelector('button')

            if (button) {
              const span = button.querySelector('span')

              if (span) {
                span.textContent = 'Subscribe'
              }
            }

            setIsFormReady(true)
          }}
          data-uid="c4a002dfe9"
          src="https://creatorcabins.ck.page/c4a002dfe9/index.js"
        />
      </SubscribeEmailContent>
    </SubscribeEmailContainer>
  )
}

interface BoxShadow {
  top?: number
  right?: number
  bottom?: number
  left?: number
}

const buildBoxShadow = ({
  top = 0.2,
  right = 0.2,
  bottom = 0.2,
  left = 0.2,
}: BoxShadow) => {
  return `inset 0 ${top}rem 0 0 ${theme.colors.green900},
  inset 0 -${bottom}rem 0 0 ${theme.colors.green900},
  inset -${right}rem 0 0 0 ${theme.colors.green900},
  inset ${left}rem 0 0 0 ${theme.colors.green900}`
}

const SubscribeEmailContainer = styled.div`
  height: min-content;

  .formkit-hero {
    display: none;
  }

  form,
  .formkit-container {
    background-color: transparent !important;
    border: none !important;
    box-shadow: none !important;
    padding: 0rem !important;
    margin: 0rem !important;
  }

  .formkit-powered-by-convertkit-container {
    display: none !important;
  }

  input,
  button {
    border: none !important;
  }

  .formkit-submit {
    line-height: 1.3 !important;
  }

  button {
    span {
      ${buttonStyles}
    }
    background-color: ${theme.colors.yellow100} !important;
    box-shadow: ${buildBoxShadow({
      top: 0.1,
      right: 0.1,
      bottom: 0.1,
      left: 0,
    })};
  }

  input {
    width: 18rem !important;
    ${subline2Styles}
    box-shadow: ${buildBoxShadow({
      top: 0.1,
      right: 0.1,
      bottom: 0.1,
      left: 0.1,
    })};

    ${theme.bp.md} {
      width: 25rem !important;
    }
  }

  .formkit-alert {
    margin: 0rem !important;
    width: 35rem !important;
    ${subline1Styles}
  }

  .formkit-alert-success {
    color: ${theme.colors.green900} !important;
    border-color: ${theme.colors.green900} !important;
    background-color: ${theme.colors.green100} !important;
  }
`

const SubscribeEmailContent = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`
