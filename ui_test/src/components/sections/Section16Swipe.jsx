import { useState } from 'react'
import { useSwipeable } from 'react-swipeable'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { SectionContainer } from '../ui'
import '../../styles/swipe-section.css'

// 슬라이드 목록 (Card 섹션처럼 외부 이미지 없이 그라데이션 + 이모지로 표현)
// 실제 사진을 쓰려면 slide 안에 <img src="..." draggable={false} /> 를 넣으세요
const SLIDES = [
  { id: 'sunrise', title: '해돋이', emoji: '🌅', gradient: 'linear-gradient(135deg, #ff9a8b 0%, #ff6a88 55%, #ff99ac 100%)' },
  { id: 'ocean', title: '바다', emoji: '🌊', gradient: 'linear-gradient(135deg, #4facfe 0%, #00c6fb 100%)' },
  { id: 'forest', title: '숲', emoji: '🌲', gradient: 'linear-gradient(135deg, #43e97b 0%, #2e9e5b 100%)' },
  { id: 'desert', title: '사막', emoji: '🏜️', gradient: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)' },
  { id: 'night', title: '밤하늘', emoji: '🌌', gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)' },
]

// 이 거리(px) 이상 끌어야 스와이프로 인정
const SWIPE_THRESHOLD = 50

const DIRECTION_LABEL = {
  Left: '⬅️ 왼쪽으로 스와이프 → 다음',
  Right: '➡️ 오른쪽으로 스와이프 → 이전',
}

/**
 * Swipe 섹션 (react-swipeable)
 * - 터치(휴대폰) 또는 마우스 드래그(PC)로 좌우 스와이프해 슬라이드를 넘깁니다.
 * - 끄는 동안 슬라이드가 손가락/마우스를 따라 움직입니다.
 * - 이전/다음 버튼, 아래 점(dot), 키보드 ← → 로도 이동할 수 있습니다.
 */
function Section16Swipe({ number }) {
  const [index, setIndex] = useState(0)
  const [dragOffset, setDragOffset] = useState(0) // 끄는 중인 거리(px)
  const [lastSwipe, setLastSwipe] = useState(null)

  const isFirst = index === 0
  const isLast = index === SLIDES.length - 1

  const goTo = (nextIndex) => setIndex(Math.min(Math.max(nextIndex, 0), SLIDES.length - 1))
  const goPrev = () => goTo(index - 1)
  const goNext = () => goTo(index + 1)

  const handlers = useSwipeable({
    // 끄는 중: 좌우 방향일 때만 슬라이드를 따라 움직임
    onSwiping: ({ dir, deltaX }) => {
      if (dir !== 'Left' && dir !== 'Right') return
      // 첫/마지막 슬라이드에서 바깥쪽으로 끌면 1/3만 움직여 '더 없음'을 느끼게 함
      const pullingPastEdge = (isFirst && deltaX > 0) || (isLast && deltaX < 0)
      setDragOffset(pullingPastEdge ? deltaX / 3 : deltaX)
    },
    onSwipedLeft: () => {
      setLastSwipe('Left')
      goNext()
    },
    onSwipedRight: () => {
      setLastSwipe('Right')
      goPrev()
    },
    // 스와이프가 끝나면(방향 무관) 끌던 거리 초기화 → 제자리로 돌아감
    onSwiped: () => setDragOffset(0),
    // 짧게 끌다 놓아 스와이프로 인정되지 않은 경우에도 초기화
    onTouchEndOrOnMouseUp: () => setDragOffset(0),
    delta: SWIPE_THRESHOLD,
    trackMouse: true, // 마우스 드래그도 스와이프로 인식
    preventScrollOnSwipe: true, // 좌우 스와이프 중 페이지가 위아래로 움직이지 않게
  })

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowLeft') goPrev()
    if (event.key === 'ArrowRight') goNext()
  }

  const isDragging = dragOffset !== 0

  return (
    <SectionContainer
      id="section-swipe"
      number={number}
      title="Swipe"
      description="react-swipeable로 만든 슬라이드입니다. 손가락이나 마우스로 좌우로 끌어보세요."
    >
      <Box className="swipe-carousel">
        {/* 보이는 창 (스와이프 이벤트를 받는 곳) */}
        <Box
          {...handlers}
          className={`swipe-viewport ${isDragging ? 'swipe-viewport--dragging' : ''}`}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          role="region"
          aria-roledescription="carousel"
          aria-label="이미지 슬라이드"
        >
          {/* 슬라이드를 가로로 이어 붙인 띠 → index만큼 왼쪽으로 이동 */}
          <Box
            className="swipe-track"
            sx={{
              transform: `translateX(calc(${-index * 100}% + ${dragOffset}px))`,
              // 끄는 중에는 즉시 따라오고, 놓으면 부드럽게 제자리로
              transition: isDragging ? 'none' : 'transform 0.35s ease',
            }}
          >
            {SLIDES.map(({ id, title, emoji, gradient }, slideIndex) => (
              <Box
                key={id}
                className="swipe-slide"
                sx={{ background: gradient }}
                aria-hidden={slideIndex !== index}
              >
                <span className="swipe-slide__emoji">{emoji}</span>
                <Typography variant="h5" className="swipe-slide__title">
                  {title}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* 현재 슬라이드 번호 */}
          <Box className="swipe-counter" aria-live="polite">
            {index + 1} / {SLIDES.length}
          </Box>

          {/* 이전/다음 버튼 */}
          <IconButton
            aria-label="이전 슬라이드"
            onClick={goPrev}
            disabled={isFirst}
            className="swipe-nav swipe-nav--prev"
          >
            <ChevronLeftIcon />
          </IconButton>
          <IconButton
            aria-label="다음 슬라이드"
            onClick={goNext}
            disabled={isLast}
            className="swipe-nav swipe-nav--next"
          >
            <ChevronRightIcon />
          </IconButton>
        </Box>

        {/* 점(dot) 표시 — 눌러서 바로 이동 */}
        <Box className="swipe-dots">
          {SLIDES.map(({ id, title }, dotIndex) => (
            <button
              key={id}
              type="button"
              className={`swipe-dot ${dotIndex === index ? 'swipe-dot--active' : ''}`}
              onClick={() => goTo(dotIndex)}
              aria-label={`${dotIndex + 1}번 슬라이드: ${title}`}
              aria-current={dotIndex === index}
            />
          ))}
        </Box>

        {/* 상태 표시 */}
        <Box className="swipe-status">
          <Typography variant="body2">
            현재 슬라이드: <strong>{index + 1}번 · {SLIDES[index].title}</strong> (index: {index})
          </Typography>
          <Typography variant="body2" color={lastSwipe ? 'text.secondary' : 'text.disabled'}>
            {lastSwipe ? `마지막 제스처: ${DIRECTION_LABEL[lastSwipe]}` : '아직 스와이프하지 않았어요.'}
          </Typography>
        </Box>
      </Box>
    </SectionContainer>
  )
}

export default Section16Swipe
