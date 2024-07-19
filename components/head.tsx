import Head from 'next/head'
import { NextSeo } from 'next-seo'
import { appDomainWithProto } from '@/utils/display-utils'

const SITE_NAME = 'Cabin'

export const AppHead = ({
  title = undefined,
  description = undefined,
  pathname = '',
  imageUrl = `${appDomainWithProto}/images/cabin_social.png`,
}: {
  title?: string
  description?: string
  pathname?: string
  imageUrl?: string
}) => {
  const pageTitle = title?.trim() ?? 'Cabin'
  const pageDescription =
    description?.trim() ?? `Neighborhoods that you’d want to grow up in`

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
      </Head>
      <NextSeo
        title={pageTitle}
        description={pageDescription}
        canonical={fullUrl}
        openGraph={{
          url: fullUrl,
          title: pageTitle,
          description: pageDescription,
          siteName: SITE_NAME,
          site_name: SITE_NAME,
          images: [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: pageDescription,
            },
          ],
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
