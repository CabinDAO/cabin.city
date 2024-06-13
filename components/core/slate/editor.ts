import { BaseEditor, createEditor as baseCreateEditor } from 'slate'
import { ReactEditor, withReact } from 'slate-react'
import { withButton } from '@/components/core/slate/ButtonPlugin'
import { withImage } from '@/components/core/slate/ImagePlugin'

export function createEditor(): BaseEditor & ReactEditor {
  return withReact(withButton(withImage(baseCreateEditor())))
}
