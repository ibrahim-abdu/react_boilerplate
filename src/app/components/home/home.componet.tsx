import { DIContext } from '../../helpers/dependencies.context'
import React, { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export default function HomeComponet (): JSX.Element {
  const dependencies = React.useContext(DIContext)
  const { translation } = dependencies
  const { t } = useTranslation()
  const changeLanguageHandler = useCallback(
    (lang: string): void => {
      void translation.changeLanguage(lang)
    },
    [translation]
  )

  useEffect(() => {
    changeLanguageHandler('am')
  }, [changeLanguageHandler])

  return (
    <div>
      {t('HELLO_WORD')}

    </div>
  )
}
