import { SingleColumnLayout } from '@/components/layouts/SingleColumnLayout'
import { TitleCard } from '@/components/core/TitleCard'
import { useProfile } from '@/components/auth/useProfile'
import styled from 'styled-components'
import theme from '@/styles/theme'

const AdminContent = styled.div`
  width: 100%;
  background-color: ${theme.colors.red100};
  padding: 2rem;
  font-size: 1.4rem;
  font-family: monospace;
  white-space: pre-wrap;
  overflow-x: auto;
  tab-width: 4;
`

const AdminPage = () => {
  const { user } = useProfile({ redirectTo: '/' })

  if (!user || !user.isAdmin) {
    return null
  }

  return (
    <SingleColumnLayout>
      <TitleCard icon="lock" title="Admin Controls" />
      <AdminContent>hello</AdminContent>
    </SingleColumnLayout>
  )
}

export default AdminPage
