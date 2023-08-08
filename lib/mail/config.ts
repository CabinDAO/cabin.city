import { getAppConfig } from '@/utils/app-config'

export const emailConfig = getAppConfig({
  dev: {
    vouchedTemplateId: 'd-d80c2b806b784961a56bbd313a0ec8c2',
    vouchRequestedTemplateId: 'd-9887288888e940ef99d55b935c696e0e',
  },
  prod: {
    vouchedTemplateId: 'd-5347c5e59ab9421c96ac70c1d5ca8207',
    vouchRequestedTemplateId: 'd-9887288888e940ef99d55b935c696e0e',
  },
})
