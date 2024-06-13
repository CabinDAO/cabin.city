import styled from 'styled-components'
import { useState } from 'react'
import { Descendant } from 'slate'
import { Editable, Slate } from 'slate-react'
import { createEditor } from './editor'
import { useSlateRendering } from './useSlateRendering'
import { defaultSlateValue } from './slate-utils'

export const SlateRenderer = ({
  value = defaultSlateValue,
}: {
  value?: Descendant[]
}) => {
  const [readOnlyEditor] = useState(() => createEditor())
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
