import { useState } from 'react'
import { useProfile } from '../auth/useProfile'
import { MobileFloatingMenuButton } from '../core/mobile/MobileFloatingMenuButton'
import { MobileNavBar } from '../core/mobile/MobileNavBar'
import { useModal } from '../hooks/useModal'
import ClickAway from '../core/ClickAway'

export const MobileFloatingMenu = () => {
  const [open, setOpen] = useState(false)
  const { user } = useProfile()
  const { active } = useModal()

  const toggleOpen = () => {
    setOpen(!open)
  }

  if (active) {
    return null
  }

  return (
    <ClickAway onClickAway={() => setOpen(false)}>
      <MobileNavBar open={open} profileId={user?._id} />
      <MobileFloatingMenuButton open={open} onClick={toggleOpen} />
    </ClickAway>
  )
}
