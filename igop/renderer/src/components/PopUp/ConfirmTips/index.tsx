import { Modal } from '@douyinfe/semi-ui'
import { ReactNode } from 'react'

type Props = {
  nowTm: {
    dK: string
    confirm: () => void
    close: () => void
  } | null
  title: string
  confirmText: string
  closeText: string
  content: ReactNode
}

export default function ConfirmTips({
  nowTm,
  title,
  confirmText,
  closeText,
  content
}: Props) {
  return (
    <Modal
      title={title}
      visible={nowTm !== null}
      onCancel={nowTm?.close}
      onOk={nowTm?.confirm}
      okText={confirmText}
      cancelText={closeText}
      closeOnEsc
    >
      {content}
    </Modal>
  )
}
