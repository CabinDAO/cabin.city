import { getAppConfig } from '@/utils/app-config'

export const emailConfig = getAppConfig({
  dev: {
    vouchedTemplateId: 'd-d80c2b806b784961a56bbd313a0ec8c2',
  },
  prod: {
    vouchedTemplateId: 'd-5347c5e59ab9421c96ac70c1d5ca8207',
  },
})
