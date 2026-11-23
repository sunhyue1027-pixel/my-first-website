import { useState } from 'react'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormHelperText from '@mui/material/FormHelperText'
import Typography from '@mui/material/Typography'
import { SectionContainer } from '../ui'
import '../../styles/dropdown-section.css'

// 드롭다운 옵션 목록 (value는 저장용, label은 화면 표시용)
const OPTIONS = [
  { value: 'react', label: 'React', description: 'Meta가 만든 UI 라이브러리' },
  { value: 'vue', label: 'Vue', description: '배우기 쉬운 점진적 프레임워크' },
  { value: 'angular', label: 'Angular', description: 'Google이 만든 올인원 프레임워크' },
  { value: 'svelte', label: 'Svelte', description: '컴파일 단계에서 최적화하는 프레임워크' },
  { value: 'solid', label: 'Solid', description: '세밀한 반응성을 가진 라이브러리' },
  { value: 'preact', label: 'Preact', description: 'React 호환 초경량 라이브러리' },
]

const LABEL_ID = 'dropdown-framework-label'

/**
 * Dropdown 섹션
 * - Select + MenuItem으로 6개 옵션 중 하나를 고릅니다.
 * - 선택한 값을 오른쪽 상자에 실시간으로 보여줍니다.
 */
function Section04Dropdown({ number }) {
  const [selected, setSelected] = useState('')

  const selectedOption = OPTIONS.find((option) => option.value === selected)

  return (
    <SectionContainer
      id="section-dropdown"
      number={number}
      title="Dropdown"
      description="Select 컴포넌트로 여러 옵션 중 하나를 고릅니다. 선택값이 바로 표시돼요."
    >
      <Box className="dropdown-layout">
        {/* InputLabel의 id와 Select의 labelId를 맞춰야 label이 올바르게 연결됩니다 */}
        <FormControl fullWidth>
          <InputLabel id={LABEL_ID}>프레임워크</InputLabel>
          <Select
            labelId={LABEL_ID}
            label="프레임워크"
            value={selected}
            onChange={(event) => setSelected(event.target.value)}
          >
            <MenuItem value="">
              <em>선택 안 함</em>
            </MenuItem>
            {OPTIONS.map(({ value, label }) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>좋아하는 프론트엔드 도구를 골라보세요.</FormHelperText>
        </FormControl>

        <Box className="dropdown-result">
          <Typography variant="caption" color="text.secondary">
            선택한 값
          </Typography>
          {selectedOption ? (
            <>
              <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
                {selectedOption.label}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedOption.description}
              </Typography>
              <Typography variant="caption" color="text.disabled">
                value: &quot;{selectedOption.value}&quot;
              </Typography>
            </>
          ) : (
            <Typography variant="body2" color="text.disabled" sx={{ mt: 0.5 }}>
              아직 선택하지 않았어요.
            </Typography>
          )}
        </Box>
      </Box>
    </SectionContainer>
  )
}

export default Section04Dropdown
