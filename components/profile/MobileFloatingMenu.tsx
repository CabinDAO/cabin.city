import { useState } from 'react'
import { useUser } from '../auth/useUser'
import { MobileFloatingMenuButton } from '../core/mobile/MobileFloatingMenuButton'
import { MobileNavBar } from '../core/mobile/MobileNavBar'

export const MobileFloatingMenu = () => {
  const [open, setOpen] = useState(false)
  const { user } = useUser()

  const toggleOpen = () => {
    setOpen(!open)
  }

  return (
    <>
      <MobileNavBar open={open} profileId={user?._id} />
      <MobileFloatingMenuButton open={open} onClick={toggleOpen} />
    </>
  )
}
