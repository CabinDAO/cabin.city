import styled from 'styled-components'
import { useState } from 'react'
import { Descendant, createEditor } from 'slate'
import { Editable, Slate, withReact } from 'slate-react'
import { useSlateRendering } from './useSlateRendering'
import { defaultSlateValue } from './slate-utils'

interface SlateRendererProps {
  value?: Descendant[]
}

export const SlateRenderer = (props: SlateRendererProps) => {
  const { value = defaultSlateValue } = props
  const [readOnlyEditor] = useState(() => withReact(createEditor()))
  const { renderElement, renderLeaf } = useSlateRendering()

  return (
    <Slate editor={readOnlyEditor} value={value}>
      <StyledEditable
        readOnly
        renderElement={renderElement}
        renderLeaf={renderLeaf}
      />
    </Slate>
  )
}

const StyledEditable = styled(Editable)`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  word-break: break-word;
`
