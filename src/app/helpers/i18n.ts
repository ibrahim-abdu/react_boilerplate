import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import * as commonEn from '../../assets/locals/en.json'
import * as commonFr from '../../assets/locals/fr.json'
import * as commonAm from '../../assets/locals/am.json'

// eslint-disable-next-line @typescript-eslint/no-floating-promises
i18n
  .use(initReactI18next)
  .init({
    // we init with resources
    resources: {
      en: {
        translations: commonEn
      },
      fr: {
        translations: commonFr
      },
      am: {
        translations: commonAm
      }
    },
    fallbackLng: 'en',

    // have a common namespace used around the full app
    ns: ['d'],
    defaultNS: 'translations',

    nsSeparator: false,

    interpolation: {
      escapeValue: false
    }
  })

export default i18n
