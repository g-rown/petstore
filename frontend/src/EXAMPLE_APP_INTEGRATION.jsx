/**
 * EXAMPLE 1: Basic Integration with Existing App.jsx
 * 
 * This shows how to update your current App.jsx to use RouteTransitionProvider.
 * The provider wraps your Routes component and automatically handles transitions.
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Import transition provider
import RouteTransitionProvider from './components/layout/RouteTransitionProvider';

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

function AppContent() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* WRAP YOUR ROUTES WITH RouteTransitionProvider */}
      {/* This automatically handles page transitions on route changes */}
      <RouteTransitionProvider>
        <Routes>
          {/* Home — full-width, edge-to-edge */}
          <Route path="/" element={
            <PageContainer fullWidth>
              <HomePage />
            </PageContainer>
          } />

          {/* All other pages — constrained, padded container */}
          <Route path="/catalog" element={
            <PageContainer><CatalogPage /></PageContainer>
          } />
          <Route path="/pets/:id" element={
            <PageContainer><PetDetailPage /></PageContainer>
          } />
          <Route path="/login" element={
            <PageContainer><LoginPage /></PageContainer>
          } />
          <Route path="/register" element={
            <PageContainer><RegisterPage /></PageContainer>
          } />

          <Route path="/cart" element={
            <PageContainer><ProtectedRoute><CartPage /></ProtectedRoute></PageContainer>
          } />
          <Route path="/checkout" element={
            <PageContainer><ProtectedRoute><CheckoutPage /></ProtectedRoute></PageContainer>
          } />
          <Route path="/order-confirmation/:id" element={
            <PageContainer><ProtectedRoute><OrderConfirmationPage /></ProtectedRoute></PageContainer>
          } />
          <Route path="/orders" element={
            <PageContainer><ProtectedRoute><OrderHistoryPage /></ProtectedRoute></PageContainer>
          } />

          <Route path="/admin" element={
            <PageContainer><AdminRoute><AdminPage /></AdminRoute></PageContainer>
          } />

          <Route path="*" element={
            <PageContainer><NotFoundPage /></PageContainer>
          } />
        </Routes>
      </RouteTransitionProvider>
      
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

/**
 * KEY CHANGES:
 * 1. Import RouteTransitionProvider from './components/layout/RouteTransitionProvider'
 * 2. Wrap your <Routes> component with <RouteTransitionProvider>
 * 3. That's it! Animations automatically trigger on route changes
 * 
 * WHAT HAPPENS:
 * - When user navigates (Home → Catalog):
 *   1. Current page fades out and moves up (y: 0 → -20)
 *   2. New page fades in and moves up from bottom (y: 20 → 0)
 *   3. Both animations happen simultaneously
 *   4. No layout shift (uses transform)
 *   5. Spring physics make it feel organic
 */
