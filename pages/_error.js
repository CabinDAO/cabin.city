import Link from 'next/link'
import { BaseLayout } from '../components/core/BaseLayout'
import { EmptyState } from '../components/core/EmptyState'
import { Button } from '../components/core/Button'
import { expandRoute } from '@/utils/routing'
function ErrorPage({ statusCode }) {
  return (
    <BaseLayout hideNavAndFooter>
      <EmptyState
        icon="mountain"
        title={statusCode ? `Error ${statusCode}` : 'Client Error'}
        description={
          (statusCode
            ? `An error ${statusCode} occurred on server.`
            : `An error occurred on client.`) + ' Return to the home page.'
        }
        customCta={() => {
          return (
            <Link href={expandRoute('home')}>
              <Button variant="secondary">Return home</Button>
            </Link>
          )
        }}
      />
    </BaseLayout>
  )
}

ErrorPage.getInitialProps = async (contextData) => {
  const statusCode = contextData.res
    ? contextData.res.statusCode
    : contextData.err
    ? contextData.err.statusCode
    : 404
  return { statusCode }
}

export default ErrorPage
