import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { useAuthStore } from './store/authStore';
import { getDashboardPath } from './utils/roleManager';

// Layouts
import MainLayout from './components/layout/MainLayout';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import UnauthorizedPage from './pages/auth/UnauthorizedPage';
import DisabledUserPage from './pages/auth/DisabledUserPage';

// Dashboard Pages
import AdminDashboard from './pages/dashboard/AdminDashboard';
import SupervisorDashboard from './pages/dashboard/SupervisorDashboard';
import OperadorDashboard from './pages/dashboard/OperadorDashboard';

// Feature Pages
import ProductsPage from './pages/products/ProductsPage';
import ProductForm from './pages/products/components/ProductForm';
import UsersPage from './pages/users/UsersPage';

// Guards
import ActiveUserGuard from './components/auth/ActiveUserGuard';

// Theme Provider
import ThemeProvider from './providers/ThemeProvider';

// Create QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const AppRoutes = () => {
  const { user, initialize, initialized } = useAuthStore();

  React.useEffect(() => {
    initialize();
  }, [initialize]);

  if (!initialized) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white" />
      </div>
    );
  }

  return (
    <Routes>
      {/* Auth Routes */}
      <Route
        path="/login"
        element={user ? <Navigate to={getDashboardPath(user)} /> : <LoginPage />}
      />
      <Route
        path="/register"
        element={user ? <Navigate to={getDashboardPath(user)} /> : <RegisterPage />}
      />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      <Route path="/disabled" element={<DisabledUserPage />} />

      {/* Protected Routes */}
      {user ? (
        <Route element={<ActiveUserGuard><MainLayout /></ActiveUserGuard>}>
          {/* Dashboard Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/supervisor" element={<SupervisorDashboard />} />
          <Route path="/operador" element={<OperadorDashboard />} />

          {/* Feature Routes */}
          <Route path="/productos" element={<ProductsPage />} />
          <Route path="/productos/nuevo" element={<ProductForm />} />
          <Route path="/usuarios" element={<UsersPage />} />

          {/* Default Redirect */}
          <Route
            path="/"
            element={<Navigate to={getDashboardPath(user)} replace />}
          />
        </Route>
      ) : (
        <Route path="*" element={<Navigate to="/login" replace />} />
      )}
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            className: 'dark:bg-gray-800 dark:text-white',
            duration: 3000,
          }}
        />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;