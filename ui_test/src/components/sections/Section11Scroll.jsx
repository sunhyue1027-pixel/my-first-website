import { Fragment, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import Fab from '@mui/material/Fab'
import Zoom from '@mui/material/Zoom'
import LinearProgress from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { SectionContainer } from '../ui'
import '../../styles/scroll-section.css'

const CONTAINER_HEIGHT = 300
// 이 거리(px) 이상 내려가면 Top 버튼을 보여줍니다
const SHOW_TOP_BUTTON_AFTER = 100

// 스크롤을 확인하기 위한 콘텐츠 30개
const MESSAGES = Array.from({ length: 30 }, (_, index) => ({
  id: index + 1,
  title: `알림 #${index + 1}`,
  body: `스크롤 테스트용 ${index + 1}번째 메시지입니다.`,
}))

/**
 * Scroll 섹션
 * - 높이 300px로 고정된 Paper 안에서만 스크롤됩니다 (페이지 전체는 그대로).
 * - 스크롤 위치(px, %)를 실시간으로 보여줍니다.
 * - 100px 이상 내려가면 오른쪽 아래에 Top 버튼이 나타나고, 누르면 맨 위로 부드럽게 이동합니다.
 */
function Section11Scroll({ number }) {
  const scrollRef = useRef(null)
  const [scroll, setScroll] = useState({ top: 0, percent: 0 })

  const handleScroll = (event) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget
    const maxScroll = scrollHeight - clientHeight
    setScroll({
      top: Math.round(scrollTop),
      percent: maxScroll > 0 ? Math.round((scrollTop / maxScroll) * 100) : 0,
    })
  }

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const showTopButton = scroll.top > SHOW_TOP_BUTTON_AFTER

  return (
    <SectionContainer
      id="section-scroll"
      number={number}
      title="Scroll"
      description="높이 300px로 고정된 스크롤 영역입니다. 조금 내려가면 Top 버튼이 나타나요."
    >
      {/* 스크롤 위치 표시 */}
      <Box className="scroll-status">
        <Typography variant="caption" color="text.secondary">
          스크롤 위치: <strong>{scroll.top}px</strong> ({scroll.percent}%)
        </Typography>
        <LinearProgress
          variant="determinate"
          value={scroll.percent}
          sx={{ flexGrow: 1, height: 6, borderRadius: 3 }}
        />
      </Box>

      {/* 바깥 Box: Top 버튼의 기준점 (버튼이 콘텐츠와 함께 스크롤되지 않도록) */}
      <Box className="scroll-wrapper">
        <Paper
          ref={scrollRef}
          variant="outlined"
          onScroll={handleScroll}
          className="scroll-container"
          sx={{ height: CONTAINER_HEIGHT }}
        >
          <List disablePadding>
            {MESSAGES.map(({ id, title, body }, index) => (
              <Fragment key={id}>
                {index > 0 && <Divider component="li" />}
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: id % 2 ? 'primary.main' : 'secondary.main' }}>{id}</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={title} secondary={body} />
                </ListItem>
              </Fragment>
            ))}
          </List>
          <Typography variant="caption" color="text.disabled" className="scroll-end">
            — 마지막 메시지입니다 —
          </Typography>
        </Paper>

        {/* Zoom: 나타나고 사라질 때 확대/축소 애니메이션 */}
        <Zoom in={showTopButton}>
          <Fab
            color="primary"
            size="small"
            aria-label="맨 위로 이동"
            onClick={scrollToTop}
            sx={{ position: 'absolute', right: 24, bottom: 16 }}
          >
            <KeyboardArrowUpIcon />
          </Fab>
        </Zoom>
      </Box>
    </SectionContainer>
  )
}

export default Section11Scroll
