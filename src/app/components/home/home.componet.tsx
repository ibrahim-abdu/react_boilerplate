import { DIContext } from '../../helpers/dependencies.context';
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';

export default function HomeComponet() {
  const dependencies = React.useContext(DIContext);
  const { translation } = dependencies;
  const { t } = useTranslation()

  const changeLanguageHandler = (lang: string) => {
    translation.changeLanguage(lang)
  }
  useEffect(() => {

    changeLanguageHandler('am')


  }, [])


  return (
    <div>
      {t('HELLO_WORD')}

    </div>
  )
}
