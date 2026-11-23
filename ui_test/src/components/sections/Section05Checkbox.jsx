import { useState } from 'react'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import Divider from '@mui/material/Divider'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import { SectionContainer } from '../ui'
import '../../styles/checkbox-section.css'

// 체크박스 항목 목록
const ITEMS = [
  { id: 'email', label: '이메일 알림' },
  { id: 'sms', label: 'SMS 알림' },
  { id: 'push', label: '푸시 알림' },
  { id: 'newsletter', label: '뉴스레터 구독' },
  { id: 'event', label: '이벤트 소식 받기' },
]

/**
 * Checkbox 섹션
 * - 여러 항목을 동시에 선택할 수 있습니다.
 * - "전체 선택" 체크박스로 한 번에 선택/해제합니다.
 *   (일부만 선택된 경우 indeterminate(—) 상태로 표시)
 * - 선택한 개수와 항목을 실시간으로 보여줍니다.
 */
function Section05Checkbox({ number }) {
  // 선택된 항목의 id 목록
  const [checkedIds, setCheckedIds] = useState([])

  const checkedCount = checkedIds.length
  const allChecked = checkedCount === ITEMS.length
  const someChecked = checkedCount > 0 && !allChecked

  const handleToggle = (id) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((checkedId) => checkedId !== id) : [...prev, id],
    )
  }

  // 전부 선택돼 있으면 모두 해제, 아니면 모두 선택
  const handleToggleAll = () => {
    setCheckedIds(allChecked ? [] : ITEMS.map((item) => item.id))
  }

  // 선택 순서와 상관없이 원래 목록 순서대로 표시
  const checkedItems = ITEMS.filter((item) => checkedIds.includes(item.id))

  return (
    <SectionContainer
      id="section-checkbox"
      number={number}
      title="Checkbox"
      description="여러 항목을 동시에 선택할 수 있어요. 전체 선택으로 한 번에 선택/해제할 수 있습니다."
    >
      <Box className="checkbox-layout">
        <Box>
          <FormControlLabel
            label={<Typography sx={{ fontWeight: 600 }}>전체 선택</Typography>}
            control={
              <Checkbox
                checked={allChecked}
                indeterminate={someChecked}
                onChange={handleToggleAll}
              />
            }
          />
          <Divider sx={{ my: 1 }} />
          {/* 하위 항목은 들여쓰기해서 "전체 선택"에 속한다는 걸 보여줍니다 */}
          <FormGroup sx={{ pl: 3 }}>
            {ITEMS.map(({ id, label }) => (
              <FormControlLabel
                key={id}
                label={label}
                control={
                  <Checkbox checked={checkedIds.includes(id)} onChange={() => handleToggle(id)} />
                }
              />
            ))}
          </FormGroup>
        </Box>

        <Box className="checkbox-result">
          <Typography variant="caption" color="text.secondary">
            선택한 항목
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            <Box component="span" sx={{ color: 'primary.main' }}>
              {checkedCount}
            </Box>{' '}
            / {ITEMS.length}개
          </Typography>
          <Box className="checkbox-result__chips">
            {checkedItems.length > 0 ? (
              checkedItems.map(({ id, label }) => (
                <Chip
                  key={id}
                  label={label}
                  size="small"
                  color="primary"
                  variant="outlined"
                  onDelete={() => handleToggle(id)}
                />
              ))
            ) : (
              <Typography variant="body2" color="text.disabled">
                선택한 항목이 없어요.
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </SectionContainer>
  )
}

export default Section05Checkbox
