import { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import MenuIcon from '@mui/icons-material/Menu'
import { SectionContainer, Notification } from '../ui'
import '../../styles/navigation-section.css'

const MENUS = ['홈', '소개', '서비스', '연락처']

/**
 * Navigation 섹션
 * - 데스크톱(sm 이상): 메뉴 버튼이 툴바에 가로로 나열됩니다.
 * - 모바일(sm 미만): 햄버거 아이콘을 누르면 오른쪽에서 메뉴(Drawer)가 열립니다.
 * - 메뉴를 클릭하면 메뉴명을 알림창으로 보여줍니다.
 */
function Section03Navigation({ number }) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [notice, setNotice] = useState({ open: false, message: '' })

  const handleMenuClick = (menu) => {
    setDrawerOpen(false)
    setNotice({ open: true, message: `'${menu}' 메뉴를 클릭했어요!` })
  }

  return (
    <SectionContainer
      id="section-navigation"
      number={number}
      title="Navigation"
      description="AppBar + Toolbar 내비게이션입니다. 화면 폭을 줄이면 햄버거 메뉴로 바뀌어요."
    >
      {/* 섹션 안에 미리보기로 넣기 위해 position="static" 사용 (화면 상단 고정 X) */}
      <AppBar position="static" className="nav-preview">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700 }}>
            MyBrand
          </Typography>

          {/* 데스크톱 메뉴: sm 이상에서만 표시 */}
          <Box component="nav" sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1 }}>
            {MENUS.map((menu) => (
              <Button key={menu} color="inherit" onClick={() => handleMenuClick(menu)}>
                {menu}
              </Button>
            ))}
          </Box>

          {/* 햄버거 버튼: sm 미만(모바일)에서만 표시 */}
          <IconButton
            color="inherit"
            edge="end"
            aria-label="메뉴 열기"
            onClick={() => setDrawerOpen(true)}
            sx={{ display: { xs: 'inline-flex', sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* 모바일 메뉴 (오른쪽에서 열림) */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box className="nav-drawer" role="presentation">
          <Typography variant="h6" className="nav-drawer__title">
            MyBrand
          </Typography>
          <Divider />
          <List>
            {MENUS.map((menu) => (
              <ListItem key={menu} disablePadding>
                <ListItemButton onClick={() => handleMenuClick(menu)}>
                  <ListItemText primary={menu} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Notification
        open={notice.open}
        message={notice.message}
        severity="info"
        onClose={() => setNotice((prev) => ({ ...prev, open: false }))}
      />
    </SectionContainer>
  )
}

export default Section03Navigation
