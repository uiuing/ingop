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
  | 'errorIngop'
  | 'tipsReboot'
  | 'tipsIngopGo'

export type ET = {
  [key in RP]: ReactElement<unknown>
}
