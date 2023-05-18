import { useRouter } from 'next/router'
import Script from 'next/script'
import { memo, useEffect } from 'react'

const TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

const GoogleAnalytics = () => {
  const router = useRouter()

  useEffect(() => {
    if (!TRACKING_ID || router.isPreview) return

    gtag('config', TRACKING_ID, {
      send_page_view: false,
    })

    gtag('event', 'page_view', {
      page_path: window.location.pathname,
      send_to: TRACKING_ID,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (!TRACKING_ID || router.isPreview) return

      gtag('event', 'page_view', {
        page_path: url,
        send_to: TRACKING_ID,
      })
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    router.events.on('hashChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
      router.events.off('hashChangeComplete', handleRouteChange)
    }
  }, [router.events, router.isPreview])

  if (!TRACKING_ID || router.isPreview) {
    return null
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${TRACKING_ID}`}
      ></Script>
      <Script
        id="gtag-init"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          `,
        }}
      />
    </>
  )
}
export default memo(GoogleAnalytics)
