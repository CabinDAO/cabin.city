import { IconName } from './Icon'
import { IconCard } from './IconCard'
import { H1 } from './Typography'
import { ReactNode } from 'react'
interface TitleCardProps {
  title: string
  icon: IconName
  iconHref?: string
  end?: ReactNode | null
}

export const TitleCard = ({ title, icon, iconHref, end }: TitleCardProps) => {
  return (
    <IconCard iconHref={iconHref} icon={icon}>
      <H1 $color="green900">{title}</H1>
      {end}
    </IconCard>
  )
}
