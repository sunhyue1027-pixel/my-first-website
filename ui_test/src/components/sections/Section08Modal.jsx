import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
import { SectionContainer } from '../ui'
import '../../styles/modal-section.css'

// 모달이 어떻게 닫혔는지 화면에 보여주기 위한 문구
const CLOSE_MESSAGES = {
  confirm: '✅ 확인 버튼으로 닫았어요.',
  cancel: '↩️ 취소 버튼으로 닫았어요.',
  closeButton: '✖️ 닫기(X) 버튼으로 닫았어요.',
  backdropClick: '🖱️ 배경을 클릭해서 닫았어요.',
  escapeKeyDown: '⌨️ ESC 키로 닫았어요.',
}

const TITLE_ID = 'modal-dialog-title'
const DESCRIPTION_ID = 'modal-dialog-description'

/**
 * Modal 섹션
 * - 버튼을 누르면 Dialog가 열립니다.
 * - 확인 / 취소 / 닫기(X) / 배경 클릭 / ESC 키로 닫을 수 있습니다.
 * - 마지막으로 어떻게 닫혔는지 화면에 표시합니다.
 */
function Section08Modal({ number }) {
  const [open, setOpen] = useState(false)
  const [lastResult, setLastResult] = useState(null)

  const closeWith = (reason) => {
    setOpen(false)
    setLastResult(reason)
  }

  return (
    <SectionContainer
      id="section-modal"
      number={number}
      title="Modal"
      description="Dialog 컴포넌트입니다. 버튼으로 열고, 확인·취소·X 버튼이나 배경 클릭으로 닫을 수 있어요."
    >
      <Box className="modal-layout">
        <Button variant="contained" onClick={() => setOpen(true)}>
          모달 열기
        </Button>
        <Typography
          variant="body2"
          color={lastResult ? 'text.primary' : 'text.disabled'}
          className="modal-result"
        >
          {lastResult ? CLOSE_MESSAGES[lastResult] : '아직 모달을 열지 않았어요.'}
        </Typography>
      </Box>

      <Dialog
        open={open}
        // 배경 클릭 → reason: 'backdropClick', ESC 키 → reason: 'escapeKeyDown'
        onClose={(_event, reason) => closeWith(reason)}
        aria-labelledby={TITLE_ID}
        aria-describedby={DESCRIPTION_ID}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle id={TITLE_ID} sx={{ pr: 6 }}>
          변경사항 저장
        </DialogTitle>

        {/* 오른쪽 위 닫기(X) 버튼 */}
        <IconButton
          aria-label="닫기"
          onClick={() => closeWith('closeButton')}
          sx={{ position: 'absolute', top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent dividers>
          <DialogContentText id={DESCRIPTION_ID}>
            작성 중인 내용을 저장할까요? 저장하지 않으면 변경사항이 사라집니다.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => closeWith('cancel')}>취소</Button>
          <Button variant="contained" onClick={() => closeWith('confirm')} autoFocus>
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </SectionContainer>
  )
}

export default Section08Modal
