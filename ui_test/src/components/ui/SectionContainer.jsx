import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'

/**
 * 모든 섹션이 공통으로 사용하는 래퍼 컴포넌트
 * @param {number} number - 섹션 번호 (1 ~ 16)
 * @param {string} title - 섹션 제목
 * @param {string} [description] - 섹션 설명
 */
function SectionContainer({ id, number, title, description, children }) {
  return (
    <Paper component="section" id={id} variant="outlined" sx={{ p: { xs: 2, sm: 4 } }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="overline" color="primary">
          Section {String(number).padStart(2, '0')}
        </Typography>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
        {description && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {description}
          </Typography>
        )}
      </Box>
      <Divider sx={{ mb: 3 }} />
      {children}
    </Paper>
  )
}

export default SectionContainer
