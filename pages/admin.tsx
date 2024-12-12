import React from 'react'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { profileFromApiCookies } from '@/utils/api/wrapHandler'
import { AdminView } from '@/components/AdminView'

export default function Page({}: InferGetServerSidePropsType<
  typeof getServerSideProps
>) {
  return <AdminView />
}

export const getServerSideProps = (async (context) => {
  const profile = await profileFromApiCookies(context.req.cookies)

  if (!profile?.isAdmin) {
    return { notFound: true }
  }

  return { props: {} }
}) satisfies GetServerSideProps
