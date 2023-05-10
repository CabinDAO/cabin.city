import { LoginModal } from '@/components/auth/LoginModal'
import { Button } from '@/components/core/Button'
import { useModal } from '@/components/hooks/useModal'
import { SingleColumnLayout } from '@/components/layouts/SingleColumnLayout'
import { NextPage } from 'next'
import Router from 'next/router'

const SignInPromptDemo: NextPage = () => {
  const { showLoadingModal } = useModal()
  return (
    <SingleColumnLayout>
      <Button onClick={() => showLoadingModal(() => <LoginModal />)}>
        Show Login Modal (Stay)
      </Button>
      <Button
        onClick={() =>
          showLoadingModal(() => (
            <LoginModal onLogin={() => Router.push('/dashboard')} />
          ))
        }
      >
        Show Login Modal (Navigate to dashboard)
      </Button>
    </SingleColumnLayout>
  )
}

export default SignInPromptDemo
