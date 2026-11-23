import { useRef, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Typography from '@mui/material/Typography'
import MenuOpenIcon from '@mui/icons-material/MenuOpen'
import CloseIcon from '@mui/icons-material/Close'
import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft'
import AlignHorizontalRightIcon from '@mui/icons-material/AlignHorizontalRight'
import SmartButtonIcon from '@mui/icons-material/SmartButton'
import TextFieldsIcon from '@mui/icons-material/TextFields'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import TuneIcon from '@mui/icons-material/Tune'
import WebAssetIcon from '@mui/icons-material/WebAsset'
import ViewModuleIcon from '@mui/icons-material/ViewModule'
import AnimationIcon from '@mui/icons-material/Animation'
import ListIcon from '@mui/icons-material/List'
import { SectionContainer } from '../ui'
import '../../styles/sidebar-section.css'

const DRAWER_WIDTH = 260

// 사이드바 네비게이션 링크: 이 페이지의 다른 섹션으로 이동합니다
// (href의 id는 각 섹션의 SectionContainer id와 같아야 합니다)
const NAV_GROUPS = [
  {
    title: '입력',
    links: [
      { href: '#section-button', label: 'Button', Icon: SmartButtonIcon },
      { href: '#section-input', label: 'Input', Icon: TextFieldsIcon },
      { href: '#section-checkbox', label: 'Checkbox', Icon: CheckBoxIcon },
      { href: '#section-slider', label: 'Slider', Icon: TuneIcon },
    ],
  },
  {
    title: '표시',
    links: [
      { href: '#section-modal', label: 'Modal', Icon: WebAssetIcon },
      { href: '#section-card', label: 'Card', Icon: ViewModuleIcon },
      { href: '#section-animation', label: 'Animation', Icon: AnimationIcon },
      { href: '#section-menu', label: 'Menu', Icon: ListIcon },
    ],
  },
]

/**
 * Sidebar 섹션
 * - 버튼으로 Drawer(사이드바)를 열고 닫습니다.
 * - 왼쪽/오른쪽 중 어디서 열릴지 고를 수 있습니다.
 * - 사이드바 안의 링크를 누르면 사이드바가 닫히고 해당 섹션으로 스크롤됩니다.
 */
function Section14Sidebar({ number }) {
  const [open, setOpen] = useState(false)
  const [anchor, setAnchor] = useState('left')
  const [lastLink, setLastLink] = useState(null)
  const pendingHref = useRef(null) // 사이드바가 닫힌 뒤 이동할 링크

  const toggleDrawer = () => setOpen((prev) => !prev)

  const handleNavigate = (event, href, label) => {
    // 기본 링크 이동을 막고, 사이드바가 완전히 닫힌 뒤(handleExited)에 스크롤합니다.
    // Drawer가 열려 있는 동안은 MUI가 페이지 스크롤을 잠가 두기 때문이에요.
    event.preventDefault()
    pendingHref.current = href
    setLastLink(label)
    setOpen(false)
  }

  // 닫힘 애니메이션이 끝나면 호출됨
  const handleExited = () => {
    if (!pendingHref.current) return
    document.querySelector(pendingHref.current)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    pendingHref.current = null
  }

  return (
    <SectionContainer
      id="section-sidebar"
      number={number}
      title="Sidebar"
      description="Drawer로 만든 사이드바입니다. 위치를 고르고 열어보세요. 안의 링크로 다른 섹션에 이동할 수 있어요."
    >
      <Box className="sidebar-controls">
        <Box>
          <Typography variant="caption" color="text.secondary" component="p" sx={{ mb: 0.5 }}>
            열리는 위치
          </Typography>
          <ToggleButtonGroup
            value={anchor}
            exclusive
            size="small"
            // exclusive 모드에서 이미 선택된 버튼을 다시 누르면 null이 오므로 무시
            onChange={(_event, value) => value && setAnchor(value)}
            aria-label="사이드바 위치"
          >
            <ToggleButton value="left" aria-label="왼쪽">
              <AlignHorizontalLeftIcon fontSize="small" sx={{ mr: 0.5 }} /> 왼쪽
            </ToggleButton>
            <ToggleButton value="right" aria-label="오른쪽">
              <AlignHorizontalRightIcon fontSize="small" sx={{ mr: 0.5 }} /> 오른쪽
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Button
          variant="contained"
          startIcon={<MenuOpenIcon className={anchor === 'right' ? 'sidebar-icon--flip' : ''} />}
          onClick={toggleDrawer}
          aria-expanded={open}
          aria-controls="sidebar-drawer"
        >
          {open ? '사이드바 닫기' : '사이드바 열기'}
        </Button>

        <Typography variant="body2" color={lastLink ? 'text.primary' : 'text.disabled'} className="sidebar-status">
          {lastLink ? `마지막 이동: ${lastLink} 섹션` : '사이드바 링크로 이동해 보세요.'}
        </Typography>
      </Box>

      <Drawer
        id="sidebar-drawer"
        anchor={anchor}
        open={open}
        onClose={() => setOpen(false)} // 배경 클릭 / ESC 키로 닫기
        // 닫힐 때 포커스를 '열기' 버튼으로 되돌리면 브라우저가 그 버튼으로 다시 스크롤하므로 끕니다
        ModalProps={{ disableRestoreFocus: true }}
        slotProps={{ transition: { onExited: handleExited } }}
      >
        <Box sx={{ width: DRAWER_WIDTH }} role="navigation" aria-label="섹션 바로가기">
          <Box className="sidebar-header">
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              UI Test
            </Typography>
            <IconButton aria-label="사이드바 닫기" onClick={() => setOpen(false)} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider />

          {NAV_GROUPS.map(({ title, links }) => (
            <List
              key={title}
              dense
              subheader={<ListSubheader component="div">{title}</ListSubheader>}
            >
              {links.map(({ href, label, Icon }) => (
                <ListItem key={href} disablePadding>
                  {/* component="a": 실제 <a href> 링크로 렌더링 (새 탭 열기, 링크 복사 가능) */}
                  <ListItemButton
                    component="a"
                    href={href}
                    selected={lastLink === label}
                    onClick={(event) => handleNavigate(event, href, label)}
                  >
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <Icon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={label} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          ))}
        </Box>
      </Drawer>
    </SectionContainer>
  )
}

export default Section14Sidebar
