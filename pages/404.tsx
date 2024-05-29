import { Button } from '@/components/core/Button'
import { BaseLayout } from '@/components/core/BaseLayout'
import { EmptyState } from '@/components/core/EmptyState'
import Link from 'next/link'

export default function Home() {
  return (
    <BaseLayout>
      <EmptyState
        icon="mountain"
        title="404 - Oops, page not found"
        description="This page doesn’t exist or was removed! Tap below to find your way back home."
        href="/"
        customCta={CustomCTA}
      />
    </BaseLayout>
  )
}

const CustomCTA = () => {
  return (
    <Link href="/">
      <Button variant="secondary">Back to home</Button>
    </Link>
  )
}
