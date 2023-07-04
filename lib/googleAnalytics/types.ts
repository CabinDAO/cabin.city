export type GTagEvent = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  action: Gtag.EventNames | (string & {})
  params: Gtag.EventParams | Gtag.CustomParams
}

export type Item = {
  item_id: string
  item_name: string
  price?: number
  quantity?: number
  currency: string
}
