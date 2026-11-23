/**
 * 섹션 레지스트리
 *
 * 새 섹션을 추가하는 방법:
 *   1. src/components/sections/SectionXX이름.jsx 파일 생성
 *   2. 아래에 import 후 sections 배열에 순서대로 추가
 *
 * App은 이 배열을 순서대로 렌더링하므로 App.jsx는 수정할 필요가 없습니다.
 */
import Section01Button from './Section01Button'
import Section02Input from './Section02Input'
import Section03Navigation from './Section03Navigation'
import Section04Dropdown from './Section04Dropdown'
import Section05Checkbox from './Section05Checkbox'
import Section06Radio from './Section06Radio'
import Section07Slider from './Section07Slider'
import Section08Modal from './Section08Modal'
import Section09Card from './Section09Card'
import Section10DragDrop from './Section10DragDrop'
import Section11Scroll from './Section11Scroll'
import Section12Animation from './Section12Animation'
import Section13Menu from './Section13Menu'
import Section14Sidebar from './Section14Sidebar'
import Section15Hover from './Section15Hover'
import Section16Swipe from './Section16Swipe'
import Section17FlexNavigation from './Section17FlexNavigation'

const sections = [
  Section01Button,
  Section02Input,
  Section03Navigation,
  Section04Dropdown,
  Section05Checkbox,
  Section06Radio,
  Section07Slider,
  Section08Modal,
  Section09Card,
  Section10DragDrop,
  Section11Scroll,
  Section12Animation,
  Section13Menu,
  Section14Sidebar,
  Section15Hover,
  Section16Swipe,
  Section17FlexNavigation,
]

export default sections
