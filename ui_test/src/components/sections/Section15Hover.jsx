import { useState } from 'react'
import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'
import PaletteIcon from '@mui/icons-material/Palette'
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap'
import LayersIcon from '@mui/icons-material/Layers'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import ThreeSixtyIcon from '@mui/icons-material/ThreeSixty'
import SwipeRightIcon from '@mui/icons-material/SwipeRight'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { SectionContainer } from '../ui'
import '../../styles/hover-section.css'

// 호버 효과 목록 — effect 값이 CSS 클래스(hover-card--{effect})와 연결됩니다
const EFFECTS = [
  { effect: 'color', title: '색상 변화', desc: '배경과 글자색이 반전돼요', Icon: PaletteIcon },
  { effect: 'scale', title: '크기 변화', desc: '카드가 살짝 커져요', Icon: ZoomOutMapIcon },
  { effect: 'shadow', title: '그림자', desc: '떠오르며 그림자가 짙어져요', Icon: LayersIcon },
  { effect: 'glow', title: '테두리 빛', desc: '색 테두리가 빛나요', Icon: AutoAwesomeIcon },
  { effect: 'rotate', title: '아이콘 회전', desc: '아이콘이 한 바퀴 돌아요', Icon: ThreeSixtyIcon },
  { effect: 'slide', title: '배경 채우기', desc: '왼쪽부터 색이 차오르고 화살표가 나타나요', Icon: SwipeRightIcon },
]

/**
 * Hover 섹션
 * - MUI ButtonBase로 만든 카드 6개에 서로 다른 호버 효과를 줍니다.
 *   (ButtonBase: 클릭 물결 효과 + 키보드 포커스를 기본 제공하는 MUI의 '버튼 뼈대')
 * - 효과는 모두 CSS(:hover, :focus-visible)로 구현했습니다 → src/styles/hover-section.css
 */
function Section15Hover({ number }) {
  const [clicked, setClicked] = useState(null)

  return (
    <SectionContainer
      id="section-hover"
      number={number}
      title="Hover"
      description="카드에 마우스를 올려보세요. 키보드 Tab으로 이동해도 같은 효과가 나타나요."
    >
      <Box className="hover-grid">
        {EFFECTS.map(({ effect, title, desc, Icon }) => (
          <ButtonBase
            key={effect}
            className={`hover-card hover-card--${effect}`}
            onClick={() => setClicked(title)}
            focusRipple
          >
            <Icon className="hover-card__icon" />
            <Typography variant="subtitle1" className="hover-card__title">
              {title}
            </Typography>
            <Typography variant="body2" className="hover-card__desc">
              {desc}
            </Typography>
            {/* 'slide' 효과에서만 보이는 화살표 */}
            {effect === 'slide' && <ArrowForwardIcon className="hover-card__arrow" fontSize="small" />}
          </ButtonBase>
        ))}
      </Box>

      <Typography variant="body2" color={clicked ? 'text.primary' : 'text.disabled'} sx={{ mt: 2 }}>
        {clicked ? `마지막으로 클릭한 카드: ${clicked}` : '카드를 클릭하면 물결(ripple) 효과도 볼 수 있어요.'}
      </Typography>
    </SectionContainer>
  )
}

export default Section15Hover
