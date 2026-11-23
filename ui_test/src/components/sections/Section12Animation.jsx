import { useRef, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Fade from '@mui/material/Fade'
import Grow from '@mui/material/Grow'
import Slide from '@mui/material/Slide'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import { SectionContainer } from '../ui'
import '../../styles/animation-section.css'

// ─────────────────────────────────────────────
// 1) MUI 트랜지션 + CSS 애니메이션 조합
//    - MUI 트랜지션: 나타나기/사라지기 (Fade, Grow, Slide)
//    - CSS 애니메이션: 나타난 뒤 계속 움직이는 효과 (float, pulse, wiggle)
// ─────────────────────────────────────────────
const TRANSITIONS = [
  { id: 'fade', name: 'Fade', note: '투명도 0 → 1', emoji: '🌙', cssEffect: 'float' },
  { id: 'grow', name: 'Grow', note: '작게 → 크게', emoji: '🌱', cssEffect: 'pulse' },
  { id: 'slide', name: 'Slide', note: '아래 → 제자리', emoji: '🚀', cssEffect: 'wiggle' },
]

/** 트랜지션 종류에 맞는 MUI 컴포넌트로 children을 감쌉니다 */
function Transition({ type, show, container, children }) {
  if (type === 'fade') {
    return (
      <Fade in={show} timeout={600}>
        {children}
      </Fade>
    )
  }
  if (type === 'grow') {
    return (
      <Grow in={show} timeout={600}>
        {children}
      </Grow>
    )
  }
  // container: 이 영역 경계에서 미끄러져 들어옵니다 (지정하지 않으면 화면 끝에서 들어옴)
  return (
    <Slide in={show} direction="up" container={container} timeout={500}>
      {children}
    </Slide>
  )
}

function TransitionDemo({ type, name, note, emoji, cssEffect }) {
  const [show, setShow] = useState(true)
  const stageRef = useRef(null)

  return (
    <Box className="anim-card">
      <Box ref={stageRef} className="anim-stage">
        <Transition type={type} show={show} container={() => stageRef.current}>
          {/* MUI 트랜지션의 자식은 ref를 받을 수 있는 요소여야 합니다 (Box OK) */}
          <Box className="anim-target">
            {/* 바깥 Box: MUI가 transform/opacity 담당, 안쪽 span: CSS 애니메이션 담당 → 서로 충돌하지 않음 */}
            <span className={`anim-emoji anim-css--${cssEffect}`}>{emoji}</span>
          </Box>
        </Transition>
      </Box>
      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
        {name}
      </Typography>
      <Typography variant="caption" color="text.secondary" component="p" sx={{ mb: 1 }}>
        {note} + CSS {cssEffect}
      </Typography>
      <Button
        size="small"
        variant={show ? 'outlined' : 'contained'}
        onClick={() => setShow((prev) => !prev)}
      >
        {show ? '숨기기' : '보이기'}
      </Button>
    </Box>
  )
}

// ─────────────────────────────────────────────
// 2) CSS 키프레임 애니메이션 (버튼을 누를 때마다 1회 재생)
// ─────────────────────────────────────────────
const CSS_ANIMATIONS = [
  { id: 'bounce', label: '통통 (bounce)' },
  { id: 'shake', label: '흔들기 (shake)' },
  { id: 'spin', label: '회전 (spin)' },
  { id: 'flip', label: '뒤집기 (flip)' },
  { id: 'rubber', label: '고무줄 (rubber)' },
]

function CssAnimationDemo() {
  // key를 바꿔 요소를 새로 그려야 같은 애니메이션도 다시 재생됩니다
  const [play, setPlay] = useState({ name: null, key: 0 })

  return (
    <Box>
      <Box className="css-demo__stage">
        <Box
          key={play.key}
          className={`css-demo__target ${play.name ? `anim-once--${play.name}` : ''}`}
        >
          ⭐
        </Box>
      </Box>
      <Stack direction="row" useFlexGap sx={{ flexWrap: 'wrap', gap: 1 }}>
        {CSS_ANIMATIONS.map(({ id, label }) => (
          <Button
            key={id}
            size="small"
            variant={play.name === id ? 'contained' : 'outlined'}
            startIcon={<PlayArrowIcon />}
            onClick={() => setPlay((prev) => ({ name: id, key: prev.key + 1 }))}
          >
            {label}
          </Button>
        ))}
      </Stack>
    </Box>
  )
}

/**
 * Animation 섹션
 * - 위: MUI Fade / Grow / Slide 트랜지션 + 안쪽 요소의 CSS 반복 애니메이션 조합
 * - 아래: 버튼으로 재생하는 CSS 키프레임 애니메이션 5종
 */
function Section12Animation({ number }) {
  return (
    <SectionContainer
      id="section-animation"
      number={number}
      title="Animation"
      description="MUI 트랜지션(Fade · Grow · Slide)과 CSS 키프레임 애니메이션을 조합했어요. 버튼을 눌러보세요."
    >
      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1.5 }}>
        MUI 트랜지션 + CSS 애니메이션
      </Typography>
      <Box className="anim-grid">
        {TRANSITIONS.map(({ id, ...rest }) => (
          <TransitionDemo key={id} type={id} {...rest} />
        ))}
      </Box>

      <Typography variant="subtitle1" sx={{ fontWeight: 600, mt: 4, mb: 1.5 }}>
        CSS 키프레임 애니메이션
      </Typography>
      <CssAnimationDemo />
    </SectionContainer>
  )
}

export default Section12Animation
