import { LocationFragment } from '@/utils/types/location'
import { BasicDetailStep } from './BasicDetailStep'
import { PhotoGalleryStep } from './PhotoGalleryStep'
import { OffersStep } from './OffersStep'

export type StepConfig = {
  name: string
  component: ({ onBack, onNext }: StepProps) => JSX.Element | null
}

export type StepProps = {
  name: string
  onNext: VoidFunction
  onBack: VoidFunction
  location: LocationFragment
  steps: StepConfig[]
}

export const editLocationSteps: StepConfig[] = [
  {
    name: 'Details',
    component: BasicDetailStep,
  },
  {
    name: 'Photo Gallery',
    component: PhotoGalleryStep,
  },
  {
    name: 'Experiences',
    component: OffersStep,
  },
]
