import { useState } from 'react'
import Grid from '@mui/material/Grid'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import TravelExploreIcon from '@mui/icons-material/TravelExplore'
import RestaurantIcon from '@mui/icons-material/Restaurant'
import HikingIcon from '@mui/icons-material/Hiking'
import { SectionContainer, HoverCard, Notification } from '../ui'
import '../../styles/card-section.css'

// 카드 데이터 (이미지는 외부 파일 없이 그라데이션 + 아이콘으로 표현)
const CARDS = [
  {
    id: 'travel',
    title: '도시 여행',
    category: '여행',
    description: '골목마다 숨은 카페와 전시를 찾아 떠나는 하루 코스를 소개합니다.',
    gradient: 'linear-gradient(135deg, #42a5f5 0%, #1565c0 100%)',
    Icon: TravelExploreIcon,
  },
  {
    id: 'food',
    title: '제철 요리',
    category: '음식',
    description: '이번 달 가장 맛있는 재료로 만드는 간단한 집밥 레시피 모음입니다.',
    gradient: 'linear-gradient(135deg, #ffb74d 0%, #e65100 100%)',
    Icon: RestaurantIcon,
  },
  {
    id: 'hiking',
    title: '주말 등산',
    category: '아웃도어',
    description: '초보자도 2시간이면 다녀올 수 있는 가까운 산책로를 골라봤어요.',
    gradient: 'linear-gradient(135deg, #66bb6a 0%, #2e7d32 100%)',
    Icon: HikingIcon,
  },
]

/**
 * Card 섹션
 * - CardMedia(이미지 영역) + CardContent(내용) + CardActions(버튼)로 구성
 * - Grid로 배치: 모바일 1열 → 태블릿 2열 → 데스크톱 3열
 * - 마우스를 올리면 elevation이 커지며 떠오릅니다 (HoverCard)
 */
function Section09Card({ number }) {
  const [notice, setNotice] = useState({ open: false, message: '' })

  const notify = (message) => setNotice({ open: true, message })

  return (
    <SectionContainer
      id="section-card"
      number={number}
      title="Card"
      description="CardMedia · CardContent · CardActions로 만든 카드입니다. 마우스를 올려보세요."
    >
      <Grid container spacing={3}>
        {CARDS.map(({ id, title, category, description, gradient, Icon }) => (
          <Grid key={id} size={{ xs: 12, sm: 6, md: 4 }}>
            <HoverCard>
              {/* 실제 이미지를 쓰려면 component="div" 대신 image="이미지 주소"를 넣으세요 */}
              <CardMedia component="div" className="card-media" sx={{ background: gradient }}>
                <Icon className="card-media__icon" sx={{ fontSize: 56 }} />
              </CardMedia>

              <CardContent sx={{ flexGrow: 1 }}>
                <Chip label={category} size="small" sx={{ mb: 1 }} />
                <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
                  {title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  {description}
                </Typography>
              </CardContent>

              <CardActions>
                <Button size="small" onClick={() => notify(`'${title}' 자세히 보기`)}>
                  자세히 보기
                </Button>
                <Button size="small" color="secondary" onClick={() => notify(`'${title}' 저장했어요!`)}>
                  저장
                </Button>
              </CardActions>
            </HoverCard>
          </Grid>
        ))}
      </Grid>

      <Notification
        open={notice.open}
        message={notice.message}
        severity="success"
        onClose={() => setNotice((prev) => ({ ...prev, open: false }))}
      />
    </SectionContainer>
  )
}

export default Section09Card
