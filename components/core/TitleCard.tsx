import { IconName } from './Icon'
import { IconCard } from './IconCard'
import { H1 } from './Typography'
interface TitleCardProps {
  title: string
  icon: IconName
}

export const TitleCard = ({ title, icon }: TitleCardProps) => {
  return (
    <IconCard icon={icon}>
      <H1 $color="green900">{title}</H1>
    </IconCard>
  )
}
