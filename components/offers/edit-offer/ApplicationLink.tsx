import { InputText } from '@/components/core/InputText'
import { Body2, H3 } from '@/components/core/Typography'
import styled from 'styled-components'

interface ApplicationLinkProps {
  onEdit: (url: string) => void
  url?: string
  error?: boolean
  errorMessage?: string
}

export const ApplicationLink = ({
  onEdit,
  url,
  error,
  errorMessage,
}: ApplicationLinkProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onEdit(e.target.value)
  }

  return (
    <Application>
      <H3>Application Link</H3>
      <ApplicationDescription>
        How you would like people to apply for your offer is up to you. Our
        offer pages will have an “Apply now” button that will link out to your
        preferred application or booking method. An example could be a Google
        form or Typeform.
      </ApplicationDescription>
      <InputText
        label="URL"
        required
        placeholder="URL"
        onChange={handleInputChange}
        value={url}
        error={error}
        errorMessage={errorMessage}
      />
    </Application>
  )
}

const Application = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 100%;
  align-items: flex-start;
  justify-content: center;
`

const ApplicationDescription = styled(Body2)`
  width: 50%;
  opacity: 0.75;
`
