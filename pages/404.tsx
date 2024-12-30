import { Button } from '@/components/core/Button'
import { BaseLayout } from '@/components/core/BaseLayout'
import { EmptyState } from '@/components/core/EmptyState'
import Link from 'next/link'
import { expandRoute } from '@/utils/routing'

export default function Error404() {
  return (
    <BaseLayout>
      <EmptyState
        icon="mountain"
        title="Oops, page not found"
        description="This page doesn’t exist or was removed!"
        customCta={CustomCTA}
      />
    </BaseLayout>
  )
}

const CustomCTA = () => {
  return (
    <Link href={expandRoute('home')}>
      <Button variant="secondary">Return home</Button>
    </Link>
  )
}
