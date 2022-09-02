import { Modal } from '@douyinfe/semi-ui'

type Props = {
  nowTm: {
    dK: string
    confirm: () => void
    close: () => void
  } | null
  title: string
  confirmText: string
  closeText: string
}

export default function ConfirmTips({
  nowTm,
  title,
  confirmText,
  closeText
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
      This is the content of a basic modal.
      <br />
      More content...
    </Modal>
  )
}
