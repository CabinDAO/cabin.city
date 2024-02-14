import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
// import { withMaintenanceMode } from 'next-maintenance-mode'

const isInMaintenanceMode = false

export const config = {
  matcher: '/((?!favicon.ico|images/).*)',
  // matcher: '/:any*',
}

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  if (!isInMaintenanceMode) {
    return NextResponse.next()
  }

  if (request.nextUrl.pathname.startsWith('/api/')) {
    return Response.json({ message: 'maintenance mode' }, { status: 503 })
  }

  return new NextResponse(
    `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Cabin.city</title>
  <style>
  body {
    max-width: 650px;
    margin: 40px auto;
    padding: 0 20px;
    font: 18px/1.5 Inter, Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    color: #324841;
    background: #fee9cb;
  }

  div.center {
    text-align: center;
  }

  h1 {
    line-height: 1.2;
  }
  
  @media (prefers-color-scheme: dark) {
    body {
      color: #fee9cb;
      background: #324841;
    }
  
    a:link {
      color: #58a6ff;
    }
  
    a:visited {
      color: #8e96f0;
    }
  }
</style>
</head>
<body>
  <div class="center">
    <svg width="64" height="64" viewBox="0 0 195 195" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.131836 70.341L97.1539 0L194.176 70.341V194.044L109.012 194.044V164.923H150.516L97.1541 43.6599L43.792 164.923H85.2959V194.044L0.131836 194.044V70.341Z" />
    </svg>
    <h1>Maintenance Mode</h1>
  </div>
  <p>Hey there! Cabin.city is undergoing a bit of maintenance. Check back soon.</p>
</body>
</html>
    `.trim(),
    {
      status: 503,
      headers: {
        'content-type': 'text/html',
        'cache-control': 'no-store',
        'retry-after': '120',
      },
    }
  )

  // TODO: this functionality could prolly be pulled out of next-maintenance-mode and implemented ourselves
  // return withMaintenanceMode(
  //   {
  //     // beforeCheck: () => {}, // function which will be executed before checking the maintenance mode (if an instance of NextResponse is returned, checking maintenance mode status & afterCheck is skipped)
  //     afterCheck: () => NextResponse.next(), // function which will be executed after checking the maintenance mode (only if maintenance mode status is set to false)
  //   },
  //   'your_connection_string_here',
  //   {
  //     provider: 'edge-config',
  //     maintenancePageSlug: '/maintenance',
  //     key: 'isInMaintenanceMode',
  //     cacheTime: 1000 * 60,
  //   }
  // )
}
