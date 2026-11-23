import { useState } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import { SectionContainer } from '../ui'
import '../../styles/dragdrop-section.css'

// 드롭 영역 목록
const ZONES = [
  { id: 'todo', title: '📋 할 일' },
  { id: 'done', title: '✅ 완료' },
]

// 처음 상태: 모든 아이템이 '할 일'에 있음
const INITIAL_ITEMS = [
  { id: 'design', label: '화면 디자인', zone: 'todo' },
  { id: 'api', label: 'API 연결', zone: 'todo' },
  { id: 'test', label: '테스트 작성', zone: 'todo' },
  { id: 'deploy', label: '배포하기', zone: 'todo' },
]

/**
 * Drag & Drop 섹션 (HTML5 Drag and Drop API)
 *
 * 드래그 흐름:
 *   아이템 dragstart → 영역 dragover(드롭 허용) → 영역 drop(이동) → 아이템 dragend(정리)
 *
 * 시각적 피드백:
 *   - 잡은 아이템은 반투명 + 점선 테두리
 *   - 아이템이 올라간 드롭 영역은 파란 배경 + 테두리 강조
 *   - 마우스 커서가 grab / grabbing 으로 바뀜
 */
function Section10DragDrop({ number }) {
  const [items, setItems] = useState(INITIAL_ITEMS)
  const [draggingId, setDraggingId] = useState(null) // 지금 끌고 있는 아이템
  const [overZone, setOverZone] = useState(null) // 아이템이 올라가 있는 영역

  // ── 아이템 이벤트 ──
  const handleDragStart = (event, id) => {
    // dataTransfer에 아이템 id를 담아 drop 할 때 꺼내 씁니다
    event.dataTransfer.setData('text/plain', id)
    event.dataTransfer.effectAllowed = 'move'
    setDraggingId(id)
  }

  const handleDragEnd = () => {
    // 드롭에 성공하든, 영역 밖에 놓아 취소하든 항상 호출됨
    setDraggingId(null)
    setOverZone(null)
  }

  // ── 드롭 영역 이벤트 ──
  const handleDragOver = (event, zoneId) => {
    // 기본 동작을 막아야 이 영역에 drop 이 허용됩니다 (HTML5 DnD 필수)
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
    if (overZone !== zoneId) setOverZone(zoneId)
  }

  const handleDragLeave = (event) => {
    // 영역 안의 자식 요소로 이동할 때도 dragleave 가 발생하므로, 진짜 영역 밖으로 나갔을 때만 해제
    if (!event.currentTarget.contains(event.relatedTarget)) setOverZone(null)
  }

  const handleDrop = (event, zoneId) => {
    event.preventDefault()
    const id = event.dataTransfer.getData('text/plain')
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, zone: zoneId } : item)))
    setOverZone(null)
  }

  return (
    <SectionContainer
      id="section-dragdrop"
      number={number}
      title="Drag & Drop"
      description="HTML5 Drag and Drop API로 만든 보드입니다. 아이템을 끌어서 다른 영역에 놓아보세요."
    >
      <Box className="dnd-board">
        {ZONES.map((zone) => {
          const zoneItems = items.filter((item) => item.zone === zone.id)
          const isOver = overZone === zone.id

          return (
            <Box
              key={zone.id}
              className={`dnd-zone ${isOver ? 'dnd-zone--over' : ''}`}
              onDragOver={(event) => handleDragOver(event, zone.id)}
              onDragLeave={handleDragLeave}
              onDrop={(event) => handleDrop(event, zone.id)}
            >
              <Box className="dnd-zone__header">
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  {zone.title}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {zoneItems.length}개
                </Typography>
              </Box>

              <Box className="dnd-zone__list">
                {zoneItems.map((item) => (
                  <Paper
                    key={item.id}
                    draggable
                    onDragStart={(event) => handleDragStart(event, item.id)}
                    onDragEnd={handleDragEnd}
                    elevation={1}
                    className={`dnd-item ${draggingId === item.id ? 'dnd-item--dragging' : ''}`}
                  >
                    <DragIndicatorIcon fontSize="small" color="action" />
                    <Typography variant="body2">{item.label}</Typography>
                  </Paper>
                ))}

                {zoneItems.length === 0 && (
                  <Typography variant="body2" color="text.disabled" className="dnd-zone__empty">
                    여기에 놓으세요
                  </Typography>
                )}
              </Box>
            </Box>
          )
        })}
      </Box>

      <Button
        size="small"
        startIcon={<RestartAltIcon />}
        onClick={() => setItems(INITIAL_ITEMS)}
        sx={{ mt: 2 }}
      >
        처음 상태로
      </Button>
    </SectionContainer>
  )
}

export default Section10DragDrop
