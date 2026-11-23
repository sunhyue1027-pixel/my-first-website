import { Fragment, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import EditIcon from '@mui/icons-material/Edit'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import ShareIcon from '@mui/icons-material/Share'
import DownloadIcon from '@mui/icons-material/Download'
import ArchiveIcon from '@mui/icons-material/Archive'
import DeleteIcon from '@mui/icons-material/Delete'
import { SectionContainer } from '../ui'
import '../../styles/menu-section.css'

// 메뉴 아이템 목록
// - shortcut: 오른쪽에 표시할 단축키 안내
// - danger: 위험한 동작(빨간색 표시)
// - dividerBefore: 이 아이템 위에 구분선
const MENU_ITEMS = [
  { id: 'edit', label: '편집', Icon: EditIcon, shortcut: 'Ctrl+E' },
  { id: 'copy', label: '복사', Icon: ContentCopyIcon, shortcut: 'Ctrl+C' },
  { id: 'share', label: '공유', Icon: ShareIcon },
  { id: 'download', label: '다운로드', Icon: DownloadIcon, shortcut: 'Ctrl+S' },
  { id: 'archive', label: '보관', Icon: ArchiveIcon, dividerBefore: true },
  { id: 'delete', label: '삭제', Icon: DeleteIcon, danger: true },
]

const BUTTON_ID = 'menu-demo-button'
const MENU_ID = 'menu-demo-list'

/**
 * Menu 섹션
 * - 버튼을 누르면 버튼 바로 아래에 메뉴가 열립니다 (anchorEl).
 * - 각 MenuItem은 아이콘 + 이름 + 단축키 안내로 구성됩니다.
 * - 고른 메뉴를 화면에 표시하고, 메뉴를 다시 열면 해당 항목이 강조돼 있습니다.
 */
function Section13Menu({ number }) {
  // anchorEl: 메뉴가 붙을 기준 요소 (null이면 닫힘)
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedId, setSelectedId] = useState(null)
  const open = Boolean(anchorEl)

  const handleSelect = (id) => {
    setSelectedId(id)
    setAnchorEl(null)
  }

  const selectedItem = MENU_ITEMS.find((item) => item.id === selectedId)

  return (
    <SectionContainer
      id="section-menu"
      number={number}
      title="Menu"
      description="버튼을 누르면 아이콘이 있는 메뉴가 열려요. 메뉴를 고르면 아래에 표시됩니다."
    >
      <Box className="menu-layout">
        <Button
          id={BUTTON_ID}
          variant="contained"
          endIcon={<KeyboardArrowDownIcon className={open ? 'menu-arrow menu-arrow--open' : 'menu-arrow'} />}
          onClick={(event) => setAnchorEl(event.currentTarget)}
          // 접근성: 이 버튼이 어떤 메뉴를 여는지, 지금 열려 있는지 알려줍니다
          aria-controls={open ? MENU_ID : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          작업 메뉴
        </Button>

        <Box className="menu-result">
          <Typography variant="caption" color="text.secondary">
            선택한 메뉴
          </Typography>
          {selectedItem ? (
            <Box className="menu-result__value">
              <selectedItem.Icon color={selectedItem.danger ? 'error' : 'primary'} fontSize="small" />
              <Typography
                variant="subtitle1"
                color={selectedItem.danger ? 'error' : 'primary'}
                sx={{ fontWeight: 600 }}
              >
                {selectedItem.label}
              </Typography>
            </Box>
          ) : (
            <Typography variant="body2" color="text.disabled">
              아직 선택하지 않았어요.
            </Typography>
          )}
        </Box>
      </Box>

      <Menu
        id={MENU_ID}
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)} // 바깥 클릭 / ESC 키로 닫기
        slotProps={{
          list: { 'aria-labelledby': BUTTON_ID, dense: true },
          paper: { sx: { minWidth: 220 } },
        }}
      >
        {MENU_ITEMS.map(({ id, label, Icon, shortcut, danger, dividerBefore }) => (
          <Fragment key={id}>
            {dividerBefore && <Divider />}
            <MenuItem
              selected={id === selectedId}
              onClick={() => handleSelect(id)}
              sx={danger ? { color: 'error.main' } : undefined}
            >
              <ListItemIcon>
                <Icon fontSize="small" color={danger ? 'error' : 'inherit'} />
              </ListItemIcon>
              <ListItemText>{label}</ListItemText>
              {shortcut && (
                <Typography variant="caption" color="text.secondary">
                  {shortcut}
                </Typography>
              )}
            </MenuItem>
          </Fragment>
        ))}
      </Menu>
    </SectionContainer>
  )
}

export default Section13Menu
