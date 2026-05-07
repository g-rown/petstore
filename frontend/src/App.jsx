import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import PageContainer from './components/layout/PageContainer';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import PetDetailPage from './pages/PetDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import AdminPage from './pages/AdminPage';
import NotFoundPage from './pages/NotFoundPage';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
};

const AdminRoute = ({ children }) => {
  const { user, isLoading } = useAuth();
  if (isLoading) return <div>Loading...</div>;
  if (!user || user.role !== 'ADMIN') return <Navigate to="/" replace />;
  return children;
};

// Route transition wrapper for smooth page transitions
const PageTransition = ({ children }) => {
  return (
    <div style={{ animation: 'fadeInUp 0.4s cubic-bezier(0.55, 0.055, 0.675, 0.19)' }}>
      {children}
    </div>
  );
};

function AppContent() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Routes>
        {/* Home — full-width, edge-to-edge */}
        <Route path="/" element={
          <PageTransition>
            <PageContainer fullWidth>
              <HomePage />
            </PageContainer>
          </PageTransition>
        } />

        {/* All other pages — constrained, padded container */}
        <Route path="/catalog" element={
          <PageTransition>
            <PageContainer><CatalogPage /></PageContainer>
          </PageTransition>
        } />
        <Route path="/pets/:id" element={
          <PageTransition>
            <PageContainer><PetDetailPage /></PageContainer>
          </PageTransition>
        } />
        <Route path="/login" element={
          <PageTransition>
            <PageContainer><LoginPage /></PageContainer>
          </PageTransition>
        } />
        <Route path="/register" element={
          <PageTransition>
            <PageContainer><RegisterPage /></PageContainer>
          </PageTransition>
        } />

        <Route path="/cart" element={
          <PageTransition>
            <PageContainer><ProtectedRoute><CartPage /></ProtectedRoute></PageContainer>
          </PageTransition>
        } />
        <Route path="/checkout" element={
          <PageTransition>
            <PageContainer><ProtectedRoute><CheckoutPage /></ProtectedRoute></PageContainer>
          </PageTransition>
        } />
        <Route path="/order-confirmation/:id" element={
          <PageTransition>
            <PageContainer><ProtectedRoute><OrderConfirmationPage /></ProtectedRoute></PageContainer>
          </PageTransition>
        } />
        <Route path="/orders" element={
          <PageTransition>
            <PageContainer><ProtectedRoute><OrderHistoryPage /></ProtectedRoute></PageContainer>
          </PageTransition>
        } />

        <Route path="/admin" element={
          <PageTransition>
            <PageContainer><AdminRoute><AdminPage /></AdminRoute></PageContainer>
          </PageTransition>
        } />

        <Route path="*" element={
          <PageTransition>
            <PageContainer><NotFoundPage /></PageContainer>
          </PageTransition>
        } />
      </Routes>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
