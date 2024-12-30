import { EmptyState } from '@/components/core/EmptyState'
import Link from 'next/link'
import { Button } from '@/components/core/Button'
import { expandRoute } from '@/utils/routing'

const EditEventPage = () => {
  return (
    <EmptyState
      icon="mountain"
      title="Oops, page not found"
      description="Event editing is disabled."
      customCta={() => (
        <Link href={expandRoute('home')}>
          <Button variant="secondary">Return home</Button>
        </Link>
      )}
    />
  )
}

export default EditEventPage
