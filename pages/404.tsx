import { Button } from '@/components/core/Button'
import { SingleColumnLayout } from '@/components/layouts/SingleColumnLayout'
import { EmptyState } from '@/components/core/EmptyState'
import Link from 'next/link'

export default function Home() {
  return (
    <SingleColumnLayout>
      <EmptyState
        icon="mountain"
        title="404 - Oops, page not found"
        description="This page doesn’t exist or was removed! Tap below to find your way back home."
        href="/"
        customCta={CustomCTA}
      />
    </SingleColumnLayout>
  )
}

const CustomCTA = () => {
  return (
    <Link href="/">
      <Button variant="secondary">Back to home</Button>
    </Link>
  )
}
