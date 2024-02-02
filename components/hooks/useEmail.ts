import { useBackend } from '@/components/hooks/useBackend'
import { EmailParams } from '@/pages/api/v2/email/send'

export const useEmail = () => {
  const { post } = useBackend()
  const sendEmail = async (input: EmailParams) => {
    return post('EMAIL_SEND', input)
  }

  return { sendEmail }
}
