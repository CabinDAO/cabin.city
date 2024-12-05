import { Remarkable } from 'remarkable'
import { linkify as linkifyPlugin } from 'remarkable/linkify'
import { Proposal } from '@/components/contexts/SnapshotContext'
import { DangerouslyRenderFormattedHTML } from '@/components/editor/RichText'

// render markdown to match how Snapshot does it
// https://github.com/snapshot-labs/snapshot/blob/448489f3d83abebd69f7ca42f57da3b0df28ba08/src/components/BaseMarkdown.vue#L23

const mdOptions = {
  html: false,
  breaks: true,
  typographer: false,
  linkTarget: '_blank',
}
const remarkable = new Remarkable(mdOptions)
const remarkableWithLinkify = new Remarkable(mdOptions).use(linkifyPlugin)

export const ProposalRender = ({
  proposal,
  maxLines,
  linkify = true,
  expandable = false,
}: {
  proposal: Proposal
  maxLines?: number
  linkify?: boolean
  expandable?: boolean
}) => {
  const replaceIpfsUrl = (match: string, p1: string) =>
    match.replace(p1, getIPFSUrl(p1, 'ipfs.io') || p1)

  const markdown = proposal.body
    // Add the ipfs gateway to markdown images that start with ipfs://
    .replace(/!\[.*?\]\((ipfs:\/\/[a-zA-Z0-9]+?)\)/g, replaceIpfsUrl)
    // if body contains a link that contain `_` , replace it with `\_` to escape it
    .replace(/(http.*?)(?=_)/g, '$1\\')

  const html = linkify
    ? remarkableWithLinkify.render(markdown)
    : remarkable.render(markdown)

  return (
    <DangerouslyRenderFormattedHTML
      html={html}
      maxLines={maxLines}
      expandable={expandable}
    />
  )
}

function getIPFSUrl(uri: string, gateway: string) {
  const ipfsGateway = `https://${gateway}`
  if (!uri) return null
  if (
    !uri.startsWith('ipfs://') &&
    !uri.startsWith('ipns://') &&
    !uri.startsWith('https://') &&
    !uri.startsWith('http://')
  )
    return `${ipfsGateway}/ipfs/${uri}`
  const uriScheme = uri.split('://')[0]
  if (uriScheme === 'ipfs')
    return uri.replace('ipfs://', `${ipfsGateway}/ipfs/`)
  if (uriScheme === 'ipns')
    return uri.replace('ipns://', `${ipfsGateway}/ipns/`)
  return uri
}
