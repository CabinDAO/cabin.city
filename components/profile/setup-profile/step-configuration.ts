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
