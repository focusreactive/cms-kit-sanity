'use client'

import { VisualEditing } from 'next-sanity'
import { useEffect } from 'react'
import {useLiveMode} from "@/sanity/loader/useQuery";

import { sanityClient } from '../client'

// Always enable stega in Live Mode
const stegaClient = sanityClient.withConfig({ stega: true })

export default function LiveVisualEditing() {
  console.log('visual editing rendered')
  useLiveMode({ client: stegaClient, studioUrl: "/admin", onConnect: () => console.log('Connected to Live'), onDisconnect: () => console.log('Disconnected from Live')})
  useEffect(() => {
    // If not an iframe or a Vercel Preview deployment, turn off Draft Mode
    if (process.env.NEXT_PUBLIC_VERCEL_ENV !== 'preview' && window === parent) {
      location.href = '/api/disable-draft'
    }
  }, [])

  return <VisualEditing />
}
