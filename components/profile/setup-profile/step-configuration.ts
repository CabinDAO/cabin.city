import { ContactFieldType } from '@/utils/types/profile'
import { AboutStep } from './AboutStep'
import { ContactStep } from './ContactStep'

export type StepConfig = {
  name: string
  component: ({ onBack, onNext }: StepProps) => JSX.Element | null
}

export type StepProps = {
  name: string
  onNext: VoidFunction
  onBack: VoidFunction
}

export const steps: StepConfig[] = [
  {
    name: 'About',
    component: AboutStep,
  },
  {
    name: 'Contact',
    component: ContactStep,
  },
]

export const contactFieldDisplayNameMapping = {
  [ContactFieldType.Email]: 'Email',
  [ContactFieldType.Discord]: 'Discord Username',
  [ContactFieldType.Twitter]: 'Twitter Username',
  [ContactFieldType.Instagram]: 'Instagram Username',
  [ContactFieldType.LinkedIn]: 'Linkedin Username',
  [ContactFieldType.Telegram]: 'Telegram Username',
  [ContactFieldType.Lens]: 'Lens Username',
  [ContactFieldType.Website]: 'Website URL',
  [ContactFieldType.Farcaster]: 'Farcaster Username',
}
