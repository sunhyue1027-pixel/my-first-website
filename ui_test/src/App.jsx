import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import sections from './components/sections'
import './styles/layout.css'

function App() {
  return (
    <Container maxWidth="md">
      <Box component="header" className="page-header">
        <Typography variant="h3" component="h1" sx={{ fontWeight: 700 }}>
          UI Test
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          MUI 기반 UI 요소 모음 · 총 {sections.length}개 섹션
        </Typography>
      </Box>

      <Box component="main" className="section-list">
        {sections.map((Section, index) => (
          <Section key={index} number={index + 1} />
        ))}
      </Box>
    </Container>
  )
}

export default App
