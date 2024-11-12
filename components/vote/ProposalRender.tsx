import { Remarkable } from 'remarkable'
import { linkify } from 'remarkable/linkify'
import { Proposal } from '@/components/vote/ProposalView'
import { DangerouslyRenderFormattedHTML } from '@/components/editor/RichText'

// render markdown to match how Snapshot does it
// https://github.com/snapshot-labs/snapshot/blob/448489f3d83abebd69f7ca42f57da3b0df28ba08/src/components/BaseMarkdown.vue#L23

const remarkable = new Remarkable({
  html: false,
  breaks: true,
  typographer: false,
  linkTarget: '_blank',
}).use(linkify)

export const ProposalRender = ({ proposal }: { proposal: Proposal }) => {
  const replaceIpfsUrl = (match: string, p1: string) =>
    match.replace(p1, getIPFSUrl(p1, 'ipfs.io') || p1)

  const markdown = proposal.body
    // Add the ipfs gateway to markdown images that start with ipfs://
    .replace(/!\[.*?\]\((ipfs:\/\/[a-zA-Z0-9]+?)\)/g, replaceIpfsUrl)
    // if body contains a link that contain `_` , replace it with `\_` to escape it
    .replace(/(http.*?)(?=_)/g, '$1\\')

  const html = remarkable.render(markdown)

  return <DangerouslyRenderFormattedHTML html={html} />
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
