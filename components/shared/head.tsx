import Head from 'next/head'
import { NextSeo } from 'next-seo'

// TODO: Update title/description
const TITLE_PREFIX = 'Cabin'
const DESCRIPTION = 'Create your Census profile to join the community'

let origin = 'http://localhost:3000'
if (process.env.NEXT_PUBLIC_VERCEL_URL) {
  origin =
    process.env.NEXT_PUBLIC_APP_ENV === 'dev'
      ? 'https://cabin-census-dev.vercel.app'
      : 'https://www.cabin.city'
}

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
  imageUrl = `${origin}/images/cabin_social.png`,
}: AppHeadProps) => {
  const pageTitle = (
    title?.length ? `${TITLE_PREFIX} - ${title}` : TITLE_PREFIX
  ).trim()
  const pageDescription = description?.trim() ?? DESCRIPTION

  const fullUrl = `${origin}/${pathname}`

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
          siteName: TITLE_PREFIX,
          images: [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: pageDescription,
            },
          ],
          site_name: TITLE_PREFIX,
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
