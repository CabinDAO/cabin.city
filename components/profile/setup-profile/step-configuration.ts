import { ContactFieldType } from '@/utils/types/profile'
import { AboutStep } from './AboutStep'
import { ContactStep } from './ContactStep'

export type StepConfig = {
  stepName: string
  component: ({ onBack, onNext }: StepProps) => JSX.Element | null
}

export type StepProps = {
  stepName: string
  onNext: VoidFunction
  onBack: VoidFunction
}

export const steps: StepConfig[] = [
  {
    stepName: 'About',
    component: AboutStep,
  },
  {
    stepName: 'Contact',
    component: ContactStep,
  },
]

export const contactFieldDisplayNameMapping = {
  [ContactFieldType.Email]: 'Email',
  [ContactFieldType.Discord]: 'Discord Username',
  [ContactFieldType.Twitter]: 'Twitter Username',
  [ContactFieldType.Instagram]: 'Instagram Username',
  [ContactFieldType.LinkedIn]: 'LinkedIn URL',
  [ContactFieldType.Telegram]: 'Telegram Username',
  [ContactFieldType.Lens]: 'Lens Username',
  [ContactFieldType.Website]: 'Website URL',
  [ContactFieldType.Farcaster]: 'Farcaster Username',
}

export const contactFieldPlaceholderMapping = {
  [ContactFieldType.Email]: 'jon@cabin.city',
  [ContactFieldType.Discord]: 'cabin',
  [ContactFieldType.Twitter]: 'cabindotcity',
  [ContactFieldType.Instagram]: 'cabindotcity',
  [ContactFieldType.LinkedIn]: 'https://www.linkedin.com/in/cabin/',
  [ContactFieldType.Telegram]: 'cabin',
  [ContactFieldType.Lens]: 'cabin',
  [ContactFieldType.Website]: 'https://cabin.city',
  [ContactFieldType.Farcaster]: 'cabin',
}
