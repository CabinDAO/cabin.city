import axios from 'axios'

const CONVERTKIT_API_URL = 'https://api.convertkit.com/v3'

const httpClient = axios.create({
  baseURL: CONVERTKIT_API_URL,
})

httpClient.defaults.headers.common['Accept'] = 'application/json'
httpClient.defaults.headers.common['Content-Type'] = 'application/json'
httpClient.defaults.timeout = 5000

type SubscribeData = {
  subscription: {
    id: number
    state: string
    created_at: string
    source: string | null
    referrer: string | null
    subscribable_id: number
    subscribable_type: string
    subscriber: {
      id: number
    }
  }
}

const FORM_ID = 5111496 // cabin's main form

// https://developers.convertkit.com/#add-subscriber-to-a-form
const subscribe = (email: string) => {
  return httpClient.post<SubscribeData>(`/forms/${FORM_ID}/subscribe`, {
    api_key: process.env.CONVERTKIT_API_KEY,
    email: email,
  })
}

export { subscribe }
