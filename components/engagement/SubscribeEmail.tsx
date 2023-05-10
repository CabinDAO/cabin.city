import Script from 'next/script'
import styled from 'styled-components'
import { ModalContainer } from '@/components/core/modals/ModalContainer'
import { useEffect, useRef, useState } from 'react'
import { H1 } from '@/components/core/Typography'

export const SubscribeEmail = () => {
  const contentRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement | null>(null)
  const [isFormReady, setIsFormReady] = useState(false)

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

            setIsFormReady(true)
          }}
          data-uid="c4a002dfe9"
          src="https://creatorcabins.ck.page/c4a002dfe9/index.js"
        />
      </SubscribeEmailContent>
    </SubscribeEmailContainer>
  )
}

const SubscribeEmailContainer = styled(ModalContainer)`
  height: min-content;
`

const SubscribeEmailContent = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`
