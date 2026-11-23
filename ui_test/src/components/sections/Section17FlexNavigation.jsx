import { useState } from 'react'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import { SectionContainer } from '../ui'
import '../../styles/flex-navigation-section.css'

const MENUS = ['홈', '소개', '상품', '연락처', '설정']

/**
 * Flex Navigation 섹션
 * - MUI 컴포넌트 없이 일반 HTML + CSS flexbox로 만든 내비게이션입니다.
 *
 *   <nav class="flex-nav">            ← display: flex; justify-content: space-between
 *     <div class="flex-nav__logo">    ← 왼쪽 끝
 *     <ul class="flex-nav__menu">     ← 오른쪽 끝, display: flex; gap: 15px
 *       <li><a>홈</a></li> ...
 */
function Section17FlexNavigation({ number }) {
  const [active, setActive] = useState(MENUS[0])
  const [showOutline, setShowOutline] = useState(false)

  const handleClick = (event, menu) => {
    event.preventDefault() // 데모용 링크라 페이지 이동은 막음
    setActive(menu)
  }

  return (
    <SectionContainer
      id="section-flex-navigation"
      number={number}
      title="Flex Navigation"
      description="CSS flexbox만으로 만든 내비게이션입니다. 로고는 왼쪽, 메뉴는 오른쪽 끝에 정렬돼요."
    >
      <nav
        className={`flex-nav ${showOutline ? 'flex-nav--outline' : ''}`}
        aria-label="Flex 내비게이션 예시"
      >
        {/* 1. 로고 박스 (왼쪽) */}
        <div className="flex-nav__logo">MyWebsite</div>

        {/* 2. 메뉴들 박스 (오른쪽) */}
        <ul className="flex-nav__menu">
          {MENUS.map((menu) => (
            <li key={menu}>
              <a
                href="#"
                className={`flex-nav__link ${active === menu ? 'flex-nav__link--active' : ''}`}
                aria-current={active === menu ? 'page' : undefined}
                onClick={(event) => handleClick(event, menu)}
              >
                {menu}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* 학습용: 각 박스의 경계를 점선으로 보여주는 스위치 */}
      <FormControlLabel
        sx={{ mt: 2 }}
        control={<Switch checked={showOutline} onChange={(event) => setShowOutline(event.target.checked)} />}
        label="박스 구조 보기"
      />
    </SectionContainer>
  )
}

export default Section17FlexNavigation
