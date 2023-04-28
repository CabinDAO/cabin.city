import { Body1 } from '@/components/core/Typography'
import { useFeatures } from '@/components/hooks/useFeatures'
import { SingleColumnLayout } from '@/components/layouts/SingleColumnLayout'
import { Feature } from '@/fauna/lib/features'
import { NextPage } from 'next'

const FeaturesDemo: NextPage = () => {
  const { hasFeature } = useFeatures()
  const hasCityFeature = hasFeature(Feature.City)

  return (
    <SingleColumnLayout>
      <Body1>City Feature: {hasCityFeature?.toString() ?? 'undefined'}</Body1>
    </SingleColumnLayout>
  )
}

export default FeaturesDemo
