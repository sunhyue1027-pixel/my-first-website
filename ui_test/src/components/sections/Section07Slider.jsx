import { useState } from 'react'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import Typography from '@mui/material/Typography'
import LinearProgress from '@mui/material/LinearProgress'
import { SectionContainer } from '../ui'
import '../../styles/slider-section.css'

const MIN = 0
const MAX = 100

// 구간 표시(marks): 0, 25, 50, 75, 100 위치에 눈금과 라벨
const MARKS = [0, 25, 50, 75, 100].map((value) => ({ value, label: `${value}` }))

/**
 * Slider 섹션
 * - 0~100 범위에서 값을 고릅니다 (1 단위로 이동).
 * - 25 간격으로 구간 표시(marks)가 있습니다.
 * - 현재 값을 숫자와 막대로 실시간 표시합니다.
 */
function Section07Slider({ number }) {
  const [value, setValue] = useState(50)

  return (
    <SectionContainer
      id="section-slider"
      number={number}
      title="Slider"
      description="0부터 100까지 값을 고르는 슬라이더입니다. 25 간격으로 구간이 표시돼요."
    >
      <Box className="slider-layout">
        <Box className="slider-value">
          <Typography variant="caption" color="text.secondary">
            현재 값
          </Typography>
          <Typography variant="h3" color="primary" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
            {value}
          </Typography>
          <LinearProgress variant="determinate" value={value} sx={{ height: 6, borderRadius: 3 }} />
        </Box>

        <Box className="slider-control">
          <Typography id="slider-volume-label" variant="body2" sx={{ mb: 1 }}>
            볼륨
          </Typography>
          <Slider
            aria-labelledby="slider-volume-label"
            min={MIN}
            max={MAX}
            step={1}
            marks={MARKS}
            value={value}
            onChange={(_event, newValue) => setValue(newValue)}
            valueLabelDisplay="auto"
          />
        </Box>
      </Box>
    </SectionContainer>
  )
}

export default Section07Slider
