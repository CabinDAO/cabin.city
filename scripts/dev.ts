import { prisma } from '../lib/prisma'

async function main() {
  // const records = await prisma.profile.findMany({
  //   where: { avatarUrl: { contains: 'ipfs.io/ipfs' } },
  //   // include: { Location: true },
  // })
  // const cfIds: Record<number, string> = {}
  // for (const record of records) {
  //   console.log(`doing ${record.id}`)
  //   if (!record.avatarUrl) {
  //     console.log(`skipping ${record.id} because it has no ipfs hash`)
  //     continue
  //   }
  //   const cfId = await upload(record.avatarUrl)
  //   cfIds[record.id] = cfId
  //   await prisma.profile.update({
  //     where: { id: record.id },
  //     data: { avatarUrl: cloudflareImageUrl(cfId) },
  //   })
  // }
  // console.log(cfIds)
}

// async function upload(url: string) {
//   try {
//     // Download from IPFS
//     const response = await fetch(
//       url
//       // `https://tan-peculiar-cobra-689.mypinata.cloud/ipfs/${ipfsHash}`
//     )
//     if (!response.ok) {
//       throw new Error(`Failed to download from IPFS: ${response.statusText}`)
//     }
//     const imageBuffer = await response.arrayBuffer()

//     // Get image extension based on response headers content type
//     const contentType = response.headers.get('content-type')
//     let extension = ''
//     if (contentType) {
//       switch (contentType.toLowerCase()) {
//         case 'image/jpeg':
//           extension = '.jpg'
//           break
//         case 'image/png':
//           extension = '.png'
//           break
//         case 'image/gif':
//           extension = '.gif'
//           break
//         case 'image/webp':
//           extension = '.webp'
//           break
//         case 'image/svg+xml':
//           extension = '.svg'
//           break
//         case 'image/tiff':
//           extension = '.tiff'
//           break
//         case 'image/bmp':
//           extension = '.bmp'
//           break
//         case 'image/avif':
//           extension = '.avif'
//           break
//         default:
//           console.warn(`Unknown content type: ${contentType}`)
//           extension = ''
//       }
//     }

//     // Upload to Cloudflare Images
//     const formData = new FormData()
//     formData.append(
//       'file',
//       new Blob([imageBuffer]),
//       randomUploadName(extension ? `image${extension}` : '')
//     )

//     const cloudflareResponse = await fetch(
//       `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_IMAGES_ACCOUNT_ID}/images/v1`,
//       {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${process.env.CLOUDFLARE_IMAGES_API_TOKEN}`,
//         },
//         body: formData,
//       }
//     )

//     if (!cloudflareResponse.ok) {
//       throw new Error(
//         `Failed to upload to Cloudflare Images: ${cloudflareResponse.statusText}`
//       )
//     }

//     const result = await cloudflareResponse.json()
//     console.log(`Successfully uploaded image: ${result.result.id}`)
//     return result.result.id
//   } catch (error) {
//     console.error(`Error processing ${url}:`, error)
//   }
// }

main()
  .then(async () => {
    console.log('done')
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
