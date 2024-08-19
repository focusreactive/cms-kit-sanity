'use client'

import { useSettings } from '@/cms/loader/useQuery'

import FooterLayout from './FooterLayout'

type Props = {
  initial: Parameters<typeof useSettings>[0]
}

export default function NavbarPreview(props: Props) {
  const { data } = useSettings(props.initial)

  return <FooterLayout data={data!} />
}
