import { useState } from 'react'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import Radio from '@mui/material/Radio'
import FormControlLabel from '@mui/material/FormControlLabel'
import Typography from '@mui/material/Typography'
import { SectionContainer } from '../ui'
import '../../styles/radio-section.css'

// 라디오 옵션 목록
const OPTIONS = [
  { value: 'standard', label: '일반 배송', detail: '3~5일 소요 · 무료' },
  { value: 'express', label: '빠른 배송', detail: '1~2일 소요 · 3,000원' },
  { value: 'dawn', label: '새벽 배송', detail: '다음 날 오전 7시 전 · 5,000원' },
  { value: 'pickup', label: '매장 픽업', detail: '당일 수령 가능 · 무료' },
]

const LABEL_ID = 'radio-delivery-label'

/**
 * Radio 섹션
 * - RadioGroup 안의 Radio는 하나만 선택됩니다.
 * - 각 Radio는 FormControlLabel로 레이블과 연결해, 글자를 눌러도 선택됩니다.
 * - 선택한 옵션을 오른쪽 상자에 보여줍니다.
 */
function Section06Radio({ number }) {
  // 라디오는 보통 기본값 하나를 미리 선택해 둡니다
  const [selected, setSelected] = useState(OPTIONS[0].value)

  const selectedOption = OPTIONS.find((option) => option.value === selected)

  return (
    <SectionContainer
      id="section-radio"
      number={number}
      title="Radio"
      description="RadioGroup 안에서는 하나만 선택할 수 있어요. 레이블 글자를 눌러도 선택됩니다."
    >
      <Box className="radio-layout">
        <FormControl>
          {/* FormLabel의 id와 RadioGroup의 aria-labelledby를 맞춰 스크린리더에 그룹 이름을 알려줍니다 */}
          <FormLabel id={LABEL_ID}>배송 방법</FormLabel>
          <RadioGroup
            aria-labelledby={LABEL_ID}
            name="delivery"
            value={selected}
            onChange={(event) => setSelected(event.target.value)}
          >
            {OPTIONS.map(({ value, label }) => (
              <FormControlLabel key={value} value={value} control={<Radio />} label={label} />
            ))}
          </RadioGroup>
        </FormControl>

        <Box className="radio-result">
          <Typography variant="caption" color="text.secondary">
            선택한 옵션
          </Typography>
          <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
            {selectedOption.label}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {selectedOption.detail}
          </Typography>
          <Typography variant="caption" color="text.disabled">
            value: &quot;{selectedOption.value}&quot;
          </Typography>
        </Box>
      </Box>
    </SectionContainer>
  )
}

export default Section06Radio
