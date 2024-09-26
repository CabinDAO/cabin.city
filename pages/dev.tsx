import { GetStaticProps } from 'next'
import React from 'react'
import styled from 'styled-components'
import { ContentCard } from '@/components/core/ContentCard'
import { BaseLayout } from '@/components/core/BaseLayout'
import { TitleCard } from '@/components/core/TitleCard'
import { Body1, H3 } from '@/components/core/Typography'
import { isLocalDev } from '@/utils/dev'
import { Button } from '@/components/core/Button'
import { useBackend } from '@/components/hooks/useBackend'
import {
  isEditorEmpty,
  RichTextInput,
  trimEmptyParagraphs,
} from '@/components/editor/RichText'

export default function Page() {
  const { post } = useBackend()

  const [content, setContent] = React.useState({})

  const initialContent = {
    type: 'doc',
    content: [
      { type: 'paragraph', content: [{ type: 'text', text: 'arst' }] },
      {
        type: 'uploadImage',
        attrs: {
          src: 'https://imagedelivery.net/-CAXcM8UQ9o6jIo8Ut8p9g/280f51ce-d0de-4eeb-4a34-ab2e04766d00/public',
          alt: null,
          title: null,
        },
      },
    ],
  }

  return (
    <BaseLayout>
      <TitleCard title="Dev" icon="peace-sign" />
      <StyledContentCard>
        <Body1>This page is for dev purposes only.</Body1>

        <div style={{ padding: '2.4rem', width: '100%' }}>
          <RichTextInput
            onChange={setContent}
            label={'Describe your thing'}
            initialContent={initialContent}
            placeholder={'lalal la type it'}
          />
        </div>

        <div style={{ margin: '2.4rem' }}>
          <pre
            style={{
              wordWrap: 'break-word',
              whiteSpace: 'pre-wrap',
              fontSize: '12px',
            }}
          >
            {JSON.stringify(content)}
          </pre>
          <pre
            style={{
              marginTop: '2.4rem',
              wordWrap: 'break-word',
              whiteSpace: 'pre-wrap',
              fontSize: '12px',
            }}
          >
            {JSON.stringify(
              trimEmptyParagraphs(JSON.parse(JSON.stringify(content)))
            )}
          </pre>

          <Body1>
            Original: {isEditorEmpty(content) ? 'Empty' : 'Not empty'}
          </Body1>

          <Body1>
            Trimmed:{' '}
            {isEditorEmpty(
              trimEmptyParagraphs(JSON.parse(JSON.stringify(content)))
            )
              ? 'Empty'
              : 'Not empty'}
          </Body1>
        </div>
        <Action>
          <H3>hit the dev endpoint</H3>
          <Button
            onClick={async () => {
              console.log('posting')
              const res = await post('api_dev', {})
              console.log(res)
            }}
          >
            DEV
          </Button>
        </Action>
      </StyledContentCard>
    </BaseLayout>
  )
}

export const getStaticProps = (async () => {
  return isLocalDev ? { props: {} } : { notFound: true }
}) satisfies GetStaticProps

const StyledContentCard = styled(ContentCard)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.4rem;
  width: 100%;
`

const Action = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`
