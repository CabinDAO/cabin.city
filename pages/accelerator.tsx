import React from 'react'
import { AppHead } from '@/components/head'
import { AcceleratorPageView } from '@/components/landing/AcceleratorPageView'
import previewImg from '@/components/landing/accelerator-header.jpg'

export default function Accelerator() {
  return (
    <>
      <AppHead
        title={'Upgrade your neighborhood'}
        description={`Cabin's Neighborhood Accelerator supports people in building vibrant communities in their local neighborhoods`}
        imageUrl={previewImg.src}
        pathname={'/accelerator'}
      />
      <AcceleratorPageView />
    </>
  )
}
