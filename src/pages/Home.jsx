import Hero from '../components/sections/Hero'
import CampusHighlights from '../components/sections/CampusHighlights'
import CampusGallery from '../components/sections/CampusGallery'
import QuickAccess from '../components/sections/QuickAccess'
import Announcements from '../components/sections/Announcements'
import WelcomeClose from '../components/sections/WelcomeClose'
import HomePager from '../components/layout/HomePager'

const pages = [
  { id: 'hero', label: 'Home', tone: '#0b0b0b', content: <Hero /> },
  { id: 'highlights', label: 'Campus stats', tone: '#0f1f13', content: <CampusHighlights /> },
  { id: 'gallery', label: 'Around campus', tone: '#0b0b0b', content: <CampusGallery /> },
  { id: 'quick-access', label: 'Quick access', tone: '#0f1f13', content: <QuickAccess /> },
  { id: 'announcements', label: 'Announcements', tone: '#0b0b0b', content: <Announcements /> },
  { id: 'welcome', label: 'Welcome', tone: '#0f1f13', content: <WelcomeClose /> },
]

export default function Home() {
  return <HomePager pages={pages} />
}
