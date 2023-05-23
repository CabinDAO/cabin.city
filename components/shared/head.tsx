import Head from 'next/head'

// TODO: Update title/description
const TITLE = 'Cabin'
const DESCRIPTION = 'Create your Census profile to join the community'

let origin = 'http://localhost:3000'
if (process.env.NEXT_PUBLIC_VERCEL_URL) {
  origin =
    process.env.NEXT_PUBLIC_APP_ENV === 'dev'
      ? 'https://cabin-census-dev.vercel.app'
      : 'https://www.cabin.city'
}

export const AppHead = ({
  description,
  pathname = '',
  titlePrefix = '',
}: {
  description?: string
  pathname?: string
  titlePrefix?: string
}) => {
  const pageTitle = `${
    titlePrefix?.length ? `${titlePrefix} - ` : ''
  }${TITLE}`.trim()
  const pageDescription = description?.trim() || DESCRIPTION

  return (
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=0"
      />
      <meta property="og:site_name" content={TITLE.trim()} key="og:site_name" />
      {pageTitle ? (
        <>
          <title key="title">{pageTitle}</title>
          <meta name="twitter:title" content={pageTitle} key="twitter:title" />
          <meta property="og:title" content={pageTitle} key="og:title" />
        </>
      ) : null}
      <meta name="description" content={pageDescription} key="description" />
      <meta
        name="twitter:description"
        content={pageDescription}
        key="twitter:description"
      />
      <meta
        property="og:description"
        content={pageDescription}
        key="og:description"
      />
      <meta property="og:url" content={`${origin}/${pathname}`} key="og:url" />
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

      <meta
        name="twitter:image"
        content={`${origin}/images/cabin_social.png`}
        key="twitter:image"
      />
      <meta
        property="og:image"
        content={`${origin}/images/cabin_social.png`}
        key="og:image"
      />
      <meta property="og:image:type" content="image/png" key="og:image:type" />
      <meta property="og:image:width" content="1200" key="og:image:width" />
      <meta property="og:image:height" content="630" key="og:image:height" />
      <meta property="og:image:alt" content={DESCRIPTION} key="og:image:alt" />
      <meta name="twitter:site" content="@cabindotcity" key="twitter:site" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="robots" content="noindex, nosnippet, noimageindex" />
    </Head>
  )
}
