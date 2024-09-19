import { EditorState, Plugin } from '@tiptap/pm/state'
import { Decoration, DecorationSet, EditorView } from '@tiptap/pm/view'
import { Schema } from '@tiptap/pm/model'
import Image, { ImageOptions } from '@tiptap/extension-image'
import { SUPPORTED_FILE_TYPES } from '@/utils/types/image'
import { css } from 'styled-components'

// taken from https://github.com/carlosvaldesweb/tiptap-extension-upload-image/tree/main

export interface UploadFn {
  (file: File): Promise<string>
}

interface CustomImageOptions extends ImageOptions {
  uploadFn: UploadFn
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    customImage: {
      addImage: () => ReturnType
      // setImage: (options: {
      //   src: string
      //   alt?: string
      //   title?: string
      // }) => ReturnType
    }
  }
}

let uploadFn: UploadFn

const UploadImage = Image.extend<CustomImageOptions>({
  name: 'uploadImage',
  onCreate() {
    if (typeof this.options.uploadFn !== 'function') {
      console.warn('uploadFn should be a function')
      return
    }
    uploadFn = this.options.uploadFn
  },
  addOptions() {
    return {
      ...this.parent?.(),
      uploadFn: async () => {
        return ''
      },
    }
  },
  addProseMirrorPlugins() {
    return [imagePlaceholderPlugin]
  },
  addCommands() {
    return {
      ...this.parent?.(),
      addImage: () => () => {
        const fileHolder = document.createElement('input')
        fileHolder.setAttribute('type', 'file')
        fileHolder.setAttribute('accept', SUPPORTED_FILE_TYPES.join(','))
        fileHolder.setAttribute('style', 'visibility:hidden')
        document.body.appendChild(fileHolder)

        const view = this.editor.view
        const schema = this.editor.schema

        fileHolder.addEventListener('change', (e: Event) => {
          if (
            view.state.selection.$from.parent.inlineContent &&
            (<HTMLInputElement>e.target)?.files?.length
          ) {
            startImageUpload(
              view,
              (<HTMLInputElement>e.target)?.files![0],
              schema
            )
          }
          view.focus()
        })
        fileHolder.click()
        return true
      },
    }
  },
})

export default UploadImage

const imagePlaceholderPlugin = new Plugin({
  state: {
    init() {
      return DecorationSet.empty
    },
    apply(tr, set) {
      // Adjust decoration positions to changes made by the transaction
      set = set.map(tr.mapping, tr.doc)

      const action = tr.getMeta(this as unknown as Plugin)

      if (action && action.add) {
        const img = document.createElement('img')
        img.src = action.add.previewSrc

        const preview = document.createElement('div')
        preview.classList.value = 'image-uploading'
        preview.appendChild(img)

        const decoration = Decoration.widget(action.add.pos, preview, {
          id: action.add.id,
        })
        return set.add(tr.doc, [decoration])
      }

      if (action && action.remove) {
        return set.remove(
          set.find(undefined, undefined, (spec) => spec.id == action.remove.id)
        )
      }

      return set
    },
  },
  props: {
    decorations(state) {
      return this.getState(state)
    },
  },
})

//Find the placeholder in editor
function findPlaceholder(state: EditorState, id: object) {
  const found = imagePlaceholderPlugin
    .getState(state)
    ?.find(undefined, undefined, (spec) => spec.id == id)

  return found?.length ? found[0].from : null
}

function startImageUpload(view: EditorView, file: File, schema: Schema) {
  // A fresh object to act as the ID for this upload
  const id = {}

  // Replace the selection with a placeholder
  const tr = view.state.tr
  if (!tr.selection.empty) tr.deleteSelection()
  tr.setMeta(imagePlaceholderPlugin, {
    add: { id, pos: tr.selection.from, previewSrc: URL.createObjectURL(file) },
  })
  view.dispatch(tr)

  uploadFn(file).then(
    (url) => {
      const pos = findPlaceholder(view.state, id)

      // If the content around the placeholder has been deleted, drop the image
      if (pos == null) return

      // Otherwise, insert it at the placeholder's position, and remove the placeholder
      view.dispatch(
        view.state.tr
          .replaceWith(pos, pos, schema.nodes.uploadImage.create({ src: url }))
          .setMeta(imagePlaceholderPlugin, { remove: { id } })
      )
    },
    (e) => {
      // On failure, just clean up the placeholder
      view.dispatch(tr.setMeta(imagePlaceholderPlugin, { remove: { id } }))
      console.log(e)
    }
  )
}

export const imagePlaceholderCSS = css`
  .image-uploading {
    position: relative;
    display: inline-block;
  }
  .image-uploading img {
    filter: blur(5px);
    opacity: 0.3;
    width: 100%;
  }
  .image-uploading::before {
    content: '';
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 30px;
    height: 30px;
    margin-top: -15px;
    margin-left: -15px;
    border-radius: 50%;
    border: 3px solid #ccc;
    border-top-color: #1e986c;
    z-index: 1;
    animation: spinner 0.6s linear infinite;
  }
  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }
`
