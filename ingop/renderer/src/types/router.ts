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

export type ET = {
  [key in RP]: ReactElement<unknown>
}
