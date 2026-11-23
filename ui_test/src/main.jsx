import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import './styles/global.css'

import theme from './theme/theme'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* injectFirst: MUI 스타일을 <head> 앞쪽에 넣어서 src/styles/의 CSS가 MUI 기본 스타일을 덮어쓸 수 있게 합니다 */}
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        {/* CssBaseline: 브라우저 기본 스타일 초기화 + 테마 배경색 적용 */}
        <CssBaseline />
        <App />
      </ThemeProvider>
    </StyledEngineProvider>
  </StrictMode>,
)
