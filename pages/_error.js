import Link from 'next/link'
import { BaseLayout } from '../components/core/BaseLayout'
import { EmptyState } from '../components/core/EmptyState'
import { Button } from '../components/core/Button'

function Error({ statusCode }) {
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
            <Link href="/">
              <Button variant="secondary">Return home</Button>
            </Link>
          )
        }}
      />
    </BaseLayout>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
