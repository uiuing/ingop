import { ReactElement } from 'react'

export type RP =
  | 'install'
  | 'installGo'
  | 'installGop'
  | 'manage'
  | 'errorNet'
  | 'errorVersion'
  | 'tipsReboot'
  | 'tipsIngopGo'
  | 'reinstall'
  | 'uninstall'

export type ET = {
  [key in RP]: ReactElement<unknown>
}
