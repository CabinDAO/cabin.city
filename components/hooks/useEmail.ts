import { usePrivy } from '@privy-io/react-auth'

export const useEmail = () => {
  const { getAccessToken } = usePrivy()
  const sendEmail = async <EmailParams>(input: EmailParams) => {
    const token = await getAccessToken()
    const response = await fetch('/api/send-email', {
      method: 'POST',
      body: JSON.stringify(input),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    return response
  }

  return { sendEmail }
}
