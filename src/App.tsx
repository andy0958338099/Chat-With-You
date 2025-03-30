import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import authService from './services/auth'
import MainLayout from './layouts/MainLayout'

// Auth Flow
import Login from './views/AuthFlow/Login'
import Register from './views/AuthFlow/Register'
import Onboarding from './views/AuthFlow/Onboarding'
import OAuthCallback from './views/AuthFlow/OAuthCallback'

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

// 我們使用已經創建的 authService 實例，它應該是在 services/auth.ts 中導出的

function App() {
  return (
    <AuthProvider authService={authService}>
      <Routes>
        {/* Auth Flow - 不需要登入才能訪問 */}
        <Route path="login" element={
          <ProtectedRoute requiredLogin={false} redirectTo="/chat-list">
            <Login />
          </ProtectedRoute>
        } />
        <Route path="register" element={
          <ProtectedRoute requiredLogin={false} redirectTo="/chat-list">
            <Register />
          </ProtectedRoute>
        } />
        <Route path="oauth-callback" element={<OAuthCallback />} />
        <Route path="onboarding" element={
          <ProtectedRoute redirectTo="/login">
            <Onboarding />
          </ProtectedRoute>
        } />
        
        {/* Main Flow with MainLayout - 需要登入才能訪問，使用子路由設計 */}
        <Route path="/" element={
          <ProtectedRoute redirectTo="/login">
            <MainLayout />
          </ProtectedRoute>
        }>
          <Route path="chat-list" element={<ChatList />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="ai-assistant" element={<MyAIAssistants />} />
          <Route path="profile" element={<Profile />} />
          <Route index element={<Navigate to="chat-list" replace />} />
        </Route>
        
        {/* Chat Features - 需要登入才能訪問 */}
        <Route path="chat/:chatId?" element={
          <ProtectedRoute redirectTo="/login">
            <Chat />
          </ProtectedRoute>
        } />
        <Route path="ai-assistant-settings/:assistantId?" element={
          <ProtectedRoute redirectTo="/login">
            <AIAssistantSettings />
          </ProtectedRoute>
        } />
        
        {/* AI Features - 需要登入才能訪問 */}
        <Route path="ai-assistant-market" element={
          <ProtectedRoute redirectTo="/login">
            <AIAssistantMarket />
          </ProtectedRoute>
        } />
        <Route path="create-ai-assistant" element={
          <ProtectedRoute redirectTo="/login">
            <CreateAIAssistant />
          </ProtectedRoute>
        } />
        <Route path="edit-ai-assistant/:assistantId" element={
          <ProtectedRoute redirectTo="/login">
            <EditAIAssistant />
          </ProtectedRoute>
        } />
        
        {/* Contact Management - 需要登入才能訪問 */}
        <Route path="add-contact" element={
          <ProtectedRoute redirectTo="/login">
            <AddContact />
          </ProtectedRoute>
        } />
        
        {/* User Management - 需要登入才能訪問 */}
        <Route path="settings" element={
          <ProtectedRoute redirectTo="/login">
            <Settings />
          </ProtectedRoute>
        } />
        <Route path="edit-profile" element={
          <ProtectedRoute redirectTo="/login">
            <EditProfile />
          </ProtectedRoute>
        } />
        <Route path="notification-settings" element={
          <ProtectedRoute redirectTo="/login">
            <NotificationSettings />
          </ProtectedRoute>
        } />
        <Route path="privacy-settings" element={
          <ProtectedRoute redirectTo="/login">
            <PrivacySettings />
          </ProtectedRoute>
        } />
        <Route path="billing-subscription" element={
          <ProtectedRoute redirectTo="/login">
            <BillingSubscription />
          </ProtectedRoute>
        } />
        
        {/* User Guide - 需要登入才能訪問 */}
        <Route path="ai-assistant-setup" element={
          <ProtectedRoute redirectTo="/login">
            <AIAssistantSetup />
          </ProtectedRoute>
        } />
        
        {/* Payment Features - 需要登入才能訪問 */}
        <Route path="subscription-plans" element={
          <ProtectedRoute redirectTo="/login">
            <SubscriptionPlans />
          </ProtectedRoute>
        } />
        <Route path="buy-credits" element={
          <ProtectedRoute redirectTo="/login">
            <BuyCredits />
          </ProtectedRoute>
        } />
        
        {/* 兜底路由 - 未找到頁面重定向到登入頁 */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
