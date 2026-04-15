import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './context/auth.store'

// Public Pages
import HomePage from './pages/public/HomePage'
import HowItWorksPage from './pages/public/HowItWorksPage'
import AboutPage from './pages/public/AboutPage'
import FAQPage from './pages/public/FAQPage'
import ContactPage from './pages/public/ContactPage'

// Merchant Portal
import MerchantLoginPage from './pages/merchant/LoginPage'
import MerchantRegisterPage from './pages/merchant/RegisterPage'
import MerchantDashboardPage from './pages/merchant/DashboardPage'
import ApplicationWizard from './pages/merchant/ApplicationWizard'
import DocumentUploadPage from './pages/merchant/DocumentUploadPage'
import MerchantProfilePage from './pages/merchant/ProfilePage'

// Internal Operations
import OpsLoginPage from './pages/ops/LoginPage'
import OpsDashboardPage from './pages/ops/OpsDashboardPage'
import OpsApplicationsListPage from './pages/ops/OpsApplicationsListPage'
import OpsApplicationDetailPage from './pages/ops/OpsApplicationDetailPage'
import OpsDealsListPage from './pages/ops/OpsDealsListPage'
import OpsDealDetailPage from './pages/ops/OpsDealDetailPage'
import OpsCollectionsPage from './pages/ops/OpsCollectionsPage'
import OpsMerchantsListPage from './pages/ops/OpsMerchantsListPage'
import OpsSettingsPage from './pages/ops/OpsSettingsPage'

// Layouts
import PublicLayout from './components/layout/PublicLayout'
import MerchantLayout from './components/layout/MerchantLayout'
import OpsLayout from './components/layout/OpsLayout'

// Protected Route Component
function ProtectedRoute({ 
  children, 
  allowedRoles 
}: { 
  children: React.ReactNode
  allowedRoles?: string[] 
}) {
  const { isAuthenticated, user } = useAuthStore()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />
  }

  return <>{children}</>
}

function App() {
  return (
    <Routes>
      {/* Public Website */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/apply" element={<Navigate to="/merchant/register" replace />} />
      </Route>

      {/* Merchant Portal */}
      <Route path="/merchant">
        <Route path="login" element={<MerchantLoginPage />} />
        <Route path="register" element={<MerchantRegisterPage />} />
        <Route element={<ProtectedRoute allowedRoles={['merchant']} />}>
          <Route element={<MerchantLayout />}>
            <Route path="dashboard" element={<MerchantDashboardPage />} />
            <Route path="application" element={<ApplicationWizard />} />
            <Route path="application/step/:step" element={<ApplicationWizard />} />
            <Route path="documents" element={<DocumentUploadPage />} />
            <Route path="profile" element={<MerchantProfilePage />} />
          </Route>
        </Route>
      </Route>

      {/* Internal Operations */}
      <Route path="/ops">
        <Route path="login" element={<OpsLoginPage />} />
        <Route element={<ProtectedRoute allowedRoles={['admin', 'underwriter', 'viewer']} />}>
          <Route element={<OpsLayout />}>
            <Route path="dashboard" element={<OpsDashboardPage />} />
            <Route path="applications" element={<OpsApplicationsListPage />} />
            <Route path="applications/:id" element={<OpsApplicationDetailPage />} />
            <Route path="deals" element={<OpsDealsListPage />} />
            <Route path="deals/:id" element={<OpsDealDetailPage />} />
            <Route path="collections" element={<OpsCollectionsPage />} />
            <Route path="merchants" element={<OpsMerchantsListPage />} />
            <Route path="settings" element={<OpsSettingsPage />} />
          </Route>
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
