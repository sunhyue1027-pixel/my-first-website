import { useState } from 'react'
import Card from '@mui/material/Card'

/**
 * 마우스를 올리면 elevation(그림자 깊이)이 커지며 살짝 떠오르는 Card
 * @param {number} [restElevation] - 평소 그림자 깊이 (0 ~ 24)
 * @param {number} [hoverElevation] - 호버 시 그림자 깊이 (0 ~ 24)
 */
function HoverCard({ restElevation = 1, hoverElevation = 8, sx, children, ...props }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Card
      elevation={hovered ? hoverElevation : restElevation}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        transform: hovered ? 'translateY(-4px)' : 'none',
        ...sx,
      }}
      {...props}
    >
      {children}
    </Card>
  )
}

export default HoverCard
