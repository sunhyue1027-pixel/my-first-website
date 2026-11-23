import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

/**
 * 화면 하단에 잠시 나타나는 알림창 (다른 섹션에서도 재사용 가능)
 * @param {boolean} open - 표시 여부
 * @param {string} message - 알림 내용
 * @param {'success'|'info'|'warning'|'error'} [severity] - 알림 종류
 * @param {() => void} onClose - 닫힐 때 호출
 */
function Notification({ open, message, severity = 'info', onClose }) {
  const handleClose = (_event, reason) => {
    // 알림 바깥을 클릭해서 닫히는 것은 막고, 시간 경과·X 버튼으로만 닫히게 합니다.
    if (reason === 'clickaway') return
    onClose()
  }

  return (
    <Snackbar
      open={open}
      autoHideDuration={2500}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert onClose={handleClose} severity={severity} variant="filled" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default Notification
