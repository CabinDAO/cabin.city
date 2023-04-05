import { IconName } from './Icon'
import { IconCard } from './IconCard'
import { H1 } from './Typography'
interface TitleCardProps {
  title: string
  icon: IconName
  iconHref?: string
}

export const TitleCard = ({ title, icon, iconHref }: TitleCardProps) => {
  return (
    <IconCard iconHref={iconHref} icon={icon}>
      <H1 $color="green900">{title}</H1>
    </IconCard>
  )
}
