import { IconLanguage } from '@douyinfe/semi-icons'
import { Button, Dropdown } from '@douyinfe/semi-ui'
import { ReactNode, useEffect, useState } from 'react'
import { getI18n } from 'react-i18next'

import { resources as i81nSrc } from '../../../locales/i81n'
import { setLanguage } from '../../../utils/i18n'

export default function SelectLang(): ReactNode {
  return (
    <Dropdown
      showTick
      position="bottomRight"
      render={<Dropdown.Menu>{LangItems()}</Dropdown.Menu>}
    >
      <Button
        theme="borderless"
        type="tertiary"
        icon={<IconLanguage size="extra-large" />}
      />
    </Dropdown>
  )
}

function LangItems() {
  const [Lang, setLang] = useState(getI18n().language)
  useEffect(() => {
    setLang(getI18n().language)
  }, [])
  return (
    <>
      {Object.keys(i81nSrc).map((value) => (
        <Dropdown.Item
          key={value}
          active={value === Lang}
          onClick={() => {
            setLang(value)
            setLanguage(value)
          }}
        >
          {i81nSrc[value].description}
        </Dropdown.Item>
      ))}
    </>
  )
}
