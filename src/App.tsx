import { useRef, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import Footer from './components/Footer'
import SignupModal from './components/SignupModal'
import CrossPromotionSection from './components/CrossPromotionSection'
import FileConverterSection from './components/FileConverterSection'
import UserDashboard from './components/UserDashboard'
import DashboardLayout from './components/DashboardLayout'
import AdminDashboardLayout from './components/AdminDashboardLayout'
import Login from './Pages/Login'
import AdminLogin from './Pages/AdminLogin'
import AdminDashboard from './Pages/AdminDashboard'
import Signup from './Pages/SignUp'
import DashboardHome from './Pages/DashboardHome'
import FileConverterPage from './Pages/FileConverter'


function App() {
  const toolsRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const [showSignup, setShowSignup] = useState(false)

  const scrollToTools = () => {
    toolsRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const openSignup = () => {
    setShowSignup(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const closeSignup = () => setShowSignup(false)

  return (
    <Router>
     
      <Routes>

        {/* -------------------- LOGIN PAGE (NO HEADER / FOOTER) -------------------- */}
        <Route 
          path="/login" 
          element={<Login />} 
        />
        <Route 
          path="/admin-login" 
          element={<AdminLogin />} 
        />
        <Route 
          path="/admin-dashboard" 
          element={<AdminDashboard />}
        />
        <Route 
          path="/signup" 
          element={<Signup />} 
        />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="/dashboard/file-converter" element={<FileConverterPage />} />
        </Route>
        <Route path="/admin-dashboard" element={<AdminDashboardLayout />}>
          <Route index element={<AdminDashboard />} />
        </Route>

        {/* -------------------- MAIN WEBSITE (WITH HEADER/FOOTER) ----------------- */}
        <Route 
          path="/*" 
          element={
            <>
              <div className="min-h-screen bg-white">
                <Header 
                  scrollToTools={scrollToTools}
                  scrollToFeatures={scrollToFeatures}
                  openSignup={openSignup}
                />

                <Routes>
                  {/* HOME */}
                  <Route 
                    path="/" 
                    element={
                      <>
                        <HeroSection scrollToTools={scrollToTools} openSignup={openSignup} />
                        <main>
                          <div ref={toolsRef} id="tools"></div>
                          <div ref={featuresRef} id="features">
                            <CrossPromotionSection />
                          </div>
                        </main>
                      </>
                    }
                  />

                  {/* FILE CONVERTER */}
                  {/* <Route
                    path="/file-converter"
                    element={
                      <main className="py-16">
                        <FileConverterSection />
                      </main>
                    }
                  /> */}

                  {/* DASHBOARD */}
                  {/* <Route path="/dashboard" element={<UserDashboard />} /> */}
                </Routes>

                <Footer />
                {showSignup && <SignupModal onClose={closeSignup} />}
              </div>
            </>
          }
        />

      </Routes>
    </Router>
  )
}

export default App
