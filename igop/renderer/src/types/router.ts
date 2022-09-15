import { ReactElement } from 'react'

export type RP =
  | 'install'
  | 'installGo'
  | 'installGop'
  | 'manage'
  | 'manageUpdate'
  | 'manageReinstall'
  | 'manageUninstall'
  | 'errorNet'
  | 'errorVersion'
  | 'errorIGop'
  | 'tipsReboot'
  | 'tipsIGopGo'

export type ET = {
  [key in RP]: ReactElement<unknown>
}
