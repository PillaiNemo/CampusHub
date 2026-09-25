import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import Layout from './components/layout/Layout'
import ScrollToTop from './components/layout/ScrollToTop'
import PageLoader from './components/layout/PageLoader'

const Home = lazy(() => import('./pages/Home'))
const News = lazy(() => import('./pages/News'))
const Schedule = lazy(() => import('./pages/Schedule'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Feedback = lazy(() => import('./pages/Feedback'))
const Booking = lazy(() => import('./pages/Booking'))
const Profile = lazy(() => import('./pages/Profile'))

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter basename="/CampusHub_Prototype2">
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/news" element={<News />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </MotionConfig>
  )
}
