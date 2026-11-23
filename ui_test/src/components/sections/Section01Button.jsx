import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { SectionContainer, Notification } from '../ui'
import '../../styles/button-section.css'

const VARIANTS = ['contained', 'outlined', 'text']
const COLORS = ['primary', 'secondary', 'error']

// 알림창 색상을 버튼 색상과 맞추기 위한 매핑
const SEVERITY_BY_COLOR = {
  primary: 'info',
  secondary: 'success',
  error: 'error',
}

/**
 * Button 섹션
 * - variant 3종 × color 3종 = 9개 버튼을 표 형태로 보여줍니다.
 * - 버튼을 누르면 어떤 버튼인지 알림창으로 알려줍니다.
 */
function Section01Button({ number }) {
  const [notice, setNotice] = useState({ open: false, message: '', severity: 'info' })

  const handleClick = (variant, color) => {
    setNotice({
      open: true,
      message: `${variant} / ${color} 버튼을 클릭했어요!`,
      severity: SEVERITY_BY_COLOR[color],
    })
  }

  const handleClose = () => setNotice((prev) => ({ ...prev, open: false }))

  return (
    <SectionContainer
      id="section-button"
      number={number}
      title="Button"
      description="variant(contained · outlined · text)와 color(primary · secondary · error) 조합입니다. 버튼을 눌러보세요."
    >
      <Box className="button-grid">
        {/* 첫 줄: 빈 칸 + variant 이름 */}
        <span />
        {VARIANTS.map((variant) => (
          <Typography key={variant} variant="caption" color="text.secondary" className="button-grid__label">
            {variant}
          </Typography>
        ))}

        {/* 각 줄: color 이름 + variant별 버튼 */}
        {COLORS.map((color) => (
          <Box key={color} sx={{ display: 'contents' }}>
            <Typography variant="caption" color="text.secondary" className="button-grid__label">
              {color}
            </Typography>
            {VARIANTS.map((variant) => (
              <Button
                key={variant}
                variant={variant}
                color={color}
                onClick={() => handleClick(variant, color)}
              >
                {color}
              </Button>
            ))}
          </Box>
        ))}
      </Box>

      <Notification
        open={notice.open}
        message={notice.message}
        severity={notice.severity}
        onClose={handleClose}
      />
    </SectionContainer>
  )
}

export default Section01Button
