import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import React from 'react'
import { AppHead } from '@/components/head'
import previewImg from '@/components/accelerator/accelerator-header.jpg'
import { EXTERNAL_LINKS } from '@/utils/external-links'

export default function Accelerator() {
  return (
    <>
      <AppHead
        title={'Apply to Cabin Neighborhood Accelerator'}
        description={`Cabin's Neighborhood Accelerator supports people in building vibrant communities in their local neighborhoods`}
        imageUrl={previewImg.src}
        pathname={'/accelerator'}
      />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { query } = context

  const queryString = new URLSearchParams(
    query as Record<string, string>
  ).toString()

  const destinationUrl =
    EXTERNAL_LINKS.NEIGHBORHOOD_COHORT_APPLICATION_FORM +
    (queryString ? `?${queryString}` : '')

  return {
    redirect: {
      destination: destinationUrl,
      permanent: false, //  302 redirect
    },
  }
}