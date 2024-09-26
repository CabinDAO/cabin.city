import { useBackend } from '@/components/hooks/useBackend'
import { EmailParams } from '@/pages/api/email/send'

export const useEmail = () => {
  const { post } = useBackend()
  const sendEmail = async (input: EmailParams) => {
    return post('api_email_send', input)
  }

  return { sendEmail }
}
