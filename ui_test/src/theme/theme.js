import { createTheme } from '@mui/material/styles'

/**
 * 프로젝트 전역 MUI 테마
 * - 색상, 타이포그래피, 모양 등을 이곳에서 한 번에 관리합니다.
 */
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1976d2' },
    secondary: { main: '#9c27b0' },
    background: {
      default: '#f7f8fa',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      '"Pretendard"',
      '"Apple SD Gothic Neo"',
      '"Malgun Gothic"',
      'sans-serif',
    ].join(','),
  },
  shape: {
    borderRadius: 8,
  },
})

export default theme
