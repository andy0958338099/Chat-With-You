import { Routes, Route, Navigate } from 'react-router-dom'
import TabbarLayout from './layouts/TabbarLayout'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import authService from './services/auth'

// Auth Flow
import Login from './views/AuthFlow/Login'
import Register from './views/AuthFlow/Register'
import Onboarding from './views/AuthFlow/Onboarding'

// Main Flow
import ChatList from './views/MainFlow/ChatList'
import Contacts from './views/MainFlow/Contacts'
import Discover from './views/MainFlow/Discover'
import Profile from './views/MainFlow/Profile'

// Chat Features
import Chat from './views/ChatFeatures/Chat'
import AIAssistantSettings from './views/ChatFeatures/AIAssistantSettings'

// AI Features
import AIAssistantMarket from './views/AIFeatures/AIAssistantMarket'
import CreateAIAssistant from './views/AIFeatures/CreateAIAssistant'
import EditAIAssistant from './views/AIFeatures/EditAIAssistant'
import MyAIAssistants from './views/AIFeatures/MyAIAssistants'

// Contact Management
import AddContact from './views/ContactManagement/AddContact'

// User Management
import Settings from './views/UserManagement/Settings'
import EditProfile from './views/UserManagement/EditProfile'
import NotificationSettings from './views/UserManagement/NotificationSettings'
import PrivacySettings from './views/UserManagement/PrivacySettings'
import BillingSubscription from './views/UserManagement/BillingSubscription'

// User Guide
import AIAssistantSetup from './views/UserGuide/AIAssistantSetup'

// Payment Features
import SubscriptionPlans from './views/PaymentFeatures/SubscriptionPlans'
import BuyCredits from './views/PaymentFeatures/BuyCredits'

function App() {
  return (
    <AuthProvider authService={authService}>
      <Routes>
        {/* Auth Flow - 不需要登入才能訪問 */}
        <Route path="/login" element={
          <ProtectedRoute requiredLogin={false} redirectTo="/chat-list">
            <Login />
          </ProtectedRoute>
        } />
        <Route path="/register" element={
          <ProtectedRoute requiredLogin={false} redirectTo="/chat-list">
            <Register />
          </ProtectedRoute>
        } />
        <Route path="/onboarding" element={
          <ProtectedRoute>
            <Onboarding />
          </ProtectedRoute>
        } />
        
        {/* Main Flow with TabbarLayout - 需要登入才能訪問 */}
        <Route element={
          <ProtectedRoute>
            <TabbarLayout />
          </ProtectedRoute>
        }>
          <Route path="/chat-list" element={<ChatList />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        
        {/* Chat Features - 需要登入才能訪問 */}
        <Route path="/chat" element={
          <ProtectedRoute>
            <Chat />
          </ProtectedRoute>
        } />
        <Route path="/ai-assistant-settings" element={
          <ProtectedRoute>
            <AIAssistantSettings />
          </ProtectedRoute>
        } />
        
        {/* AI Features - 需要登入才能訪問 */}
        <Route path="/ai-assistant-market" element={
          <ProtectedRoute>
            <AIAssistantMarket />
          </ProtectedRoute>
        } />
        <Route path="/create-ai-assistant" element={
          <ProtectedRoute>
            <CreateAIAssistant />
          </ProtectedRoute>
        } />
        <Route path="/edit-ai-assistant" element={
          <ProtectedRoute>
            <EditAIAssistant />
          </ProtectedRoute>
        } />
        <Route path="/my-ai-assistants" element={
          <ProtectedRoute>
            <MyAIAssistants />
          </ProtectedRoute>
        } />
        
        {/* Contact Management - 需要登入才能訪問 */}
        <Route path="/add-contact" element={
          <ProtectedRoute>
            <AddContact />
          </ProtectedRoute>
        } />
        
        {/* User Management - 需要登入才能訪問 */}
        <Route path="/settings" element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        } />
        <Route path="/edit-profile" element={
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        } />
        <Route path="/notification-settings" element={
          <ProtectedRoute>
            <NotificationSettings />
          </ProtectedRoute>
        } />
        <Route path="/privacy-settings" element={
          <ProtectedRoute>
            <PrivacySettings />
          </ProtectedRoute>
        } />
        <Route path="/billing-subscription" element={
          <ProtectedRoute>
            <BillingSubscription />
          </ProtectedRoute>
        } />
        
        {/* User Guide - 需要登入才能訪問 */}
        <Route path="/ai-assistant-setup" element={
          <ProtectedRoute>
            <AIAssistantSetup />
          </ProtectedRoute>
        } />
        
        {/* Payment Features - 需要登入才能訪問 */}
        <Route path="/subscription-plans" element={
          <ProtectedRoute>
            <SubscriptionPlans />
          </ProtectedRoute>
        } />
        <Route path="/buy-credits" element={
          <ProtectedRoute>
            <BuyCredits />
          </ProtectedRoute>
        } />
        
        {/* Default route */}
        <Route path="/" element={<Navigate to="/chat-list" replace />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
