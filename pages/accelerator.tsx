import React from 'react'
import { AppHead } from '@/components/head'
import previewImg from '@/components/accelerator/accelerator-header.jpg'
import { AcceleratorPageView } from '@/components/accelerator/AcceleratorPageView'
import { appDomainWithProto } from '@/utils/display-utils'

export default function Accelerator() {
  return (
    <>
      <AppHead
        title={'Apply to Cabin Neighborhood Accelerator'}
        description={`Cabin's Neighborhood Accelerator supports people in building vibrant communities in their local neighborhoods`}
        imageUrl={appDomainWithProto + previewImg.src}
        pathname={'/accelerator'}
      />
      <AcceleratorPageView />
    </>
  )
}
