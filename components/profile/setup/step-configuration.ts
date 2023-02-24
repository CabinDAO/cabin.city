import { AboutStep } from './AboutStep'
import { ContactStep } from './ContactStep'
import { RoleStep } from './RoleStep'

export type StepConfig = {
  name: string
  component: ({ onBack, onNext }: StepProps) => JSX.Element
}

export type StepProps = {
  name: string
  onNext: () => void
  onBack: () => void
}

export const steps: StepConfig[] = [
  {
    name: 'About',
    component: AboutStep,
  },
  {
    name: 'Roles',
    component: RoleStep,
  },
  {
    name: 'Contact',
    component: ContactStep,
  },
]
