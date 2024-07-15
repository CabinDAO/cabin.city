import Head from 'next/head'
import { NextSeo } from 'next-seo'
import { appDomainWithProto } from '@/utils/display-utils'

const DEFAULT_TITLE = 'Cabin'
const DESCRIPTION = `Neighborhoods that you’d want to grow up in`

export interface AppHeadProps {
  description?: string
  pathname?: string
  title?: string
  imageUrl?: string
}

export const AppHead = ({
  description,
  pathname = '',
  title,
  imageUrl = `${appDomainWithProto}/images/cabin_social.png`,
}: AppHeadProps) => {
  const pageTitle = title?.trim() ?? DEFAULT_TITLE
  const pageDescription = description?.trim() ?? DESCRIPTION

  const fullUrl = `${appDomainWithProto}${pathname}`

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=0"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" key="icon:ico" />

        {['16', '32', '96'].map((size) => (
          <link
            rel="icon"
            type="image/png"
            href={`/images/favicons/favicon-${size}x${size}.png`}
            sizes={`${size}x${size}`}
            key={size}
          />
        ))}

        {['36', '48', '72', '96', '144', '192'].map((size) => (
          <link
            rel="shortcut icon"
            type="image/png"
            href={`/images/favicons/android-icon-${size}x${size}.png`}
            sizes={`${size}x${size}`}
            key={size}
          />
        ))}

        {['57', '60', '72', '76', '114', '152', '180'].map((size) => (
          <link
            rel="apple-touch-icon"
            type="image/png"
            href={`/images/favicons/apple-icon-${size}x${size}.png`}
            sizes={`${size}x${size}`}
            key={size}
          />
        ))}

        <link rel="manifest" href="/manifest.json" />

        {/* todo: why is noindex here */}
        <meta name="robots" content="noindex, nosnippet, noimageindex" />
      </Head>
      <NextSeo
        title={pageTitle}
        description={pageDescription}
        canonical={fullUrl}
        openGraph={{
          url: fullUrl,
          title: pageTitle,
          description: pageDescription,
          siteName: DEFAULT_TITLE,
          images: [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: pageDescription,
            },
          ],
          site_name: DEFAULT_TITLE,
        }}
        twitter={{
          handle: '@cabindotcity',
          site: '@cabindotcity',
          cardType: 'summary_large_image',
        }}
      />
    </>
  )
}
