import { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { SectionContainer } from '../ui'
import '../../styles/input-section.css'

// variant별 label / placeholder 설정
const FIELDS = [
  { variant: 'standard', label: 'Standard', placeholder: '이름을 입력하세요' },
  { variant: 'outlined', label: 'Outlined', placeholder: '이메일을 입력하세요' },
  { variant: 'filled', label: 'Filled', placeholder: '메시지를 입력하세요' },
]

/**
 * Input 섹션
 * - TextField의 variant 3종을 보여줍니다.
 * - 입력한 값을 각 필드 아래에 실시간으로 표시합니다.
 */
function Section02Input({ number }) {
  // { standard: '', outlined: '', filled: '' } 형태로 값을 한 번에 관리
  const [values, setValues] = useState(() =>
    Object.fromEntries(FIELDS.map(({ variant }) => [variant, ''])),
  )

  const handleChange = (variant) => (event) => {
    setValues((prev) => ({ ...prev, [variant]: event.target.value }))
  }

  return (
    <SectionContainer
      id="section-input"
      number={number}
      title="Input"
      description="TextField의 variant(standard · outlined · filled)입니다. 입력값이 아래에 바로 표시돼요."
    >
      <Box className="input-grid">
        {FIELDS.map(({ variant, label, placeholder }) => (
          <Box key={variant} className="input-grid__item">
            <TextField
              variant={variant}
              label={label}
              placeholder={placeholder}
              value={values[variant]}
              onChange={handleChange(variant)}
              fullWidth
              // label이 항상 위에 떠 있어야 placeholder가 처음부터 보입니다
              slotProps={{ inputLabel: { shrink: true } }}
            />
            <Box className="input-grid__preview">
              <Typography variant="caption" color="text.secondary">
                입력값
              </Typography>
              <Typography
                variant="body2"
                color={values[variant] ? 'text.primary' : 'text.disabled'}
                className="input-grid__value"
              >
                {values[variant] || '(비어 있음)'}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </SectionContainer>
  )
}

export default Section02Input
