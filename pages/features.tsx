import { useConfirmLoggedIn } from '@/components/auth/useConfirmLoggedIn'
import { useUser } from '@/components/auth/useUser'
import { Button } from '@/components/core/Button'
import { Body1, H1 } from '@/components/core/Typography'
import { SingleColumnLayout } from '@/components/layouts/SingleColumnLayout'
import { useUpdateProfileMutation } from '@/generated/graphql'
import { isNotNull, isUnique } from '@/lib/data'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

/*
  This page is used to enable feature flags for users.
  To use it, navigate to a URL like this:
  /features?f=Feature1&f=Feature2
*/
const Features: NextPage = () => {
  const router = useRouter()
  const { user, refetchUser } = useUser()
  const [updateProfile] = useUpdateProfileMutation()
  const { confirmLoggedIn } = useConfirmLoggedIn()

  useEffect(() => {
    confirmLoggedIn(refetchUser)
  }, [confirmLoggedIn, refetchUser])

  if (!user) {
    return null
  }

  const handleProceed = async () => {
    const newFeatureKeys = Array.isArray(router.query.f)
      ? router.query.f
      : [router.query.f]
    const existingFeatures = user?.features ?? []
    const allFeatureKeys = [...existingFeatures, ...newFeatureKeys]
      .filter(isNotNull)
      .filter(isUnique)

    try {
      if (allFeatureKeys.length) {
        await updateProfile({
          variables: {
            id: user._id,
            data: {
              features: allFeatureKeys,
            },
          },
        })
      }

      router.push('/')
    } catch (err) {}
  }

  return (
    <SingleColumnLayout>
      <H1>Welcome {user.name}!</H1>
      <Body1>
        We are about to enable a sneak preview for some things we have been
        working on. Are you ready?
      </Body1>
      <Button onClick={handleProceed}>Proceed</Button>
    </SingleColumnLayout>
  )
}

export default Features
