import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import DashboardLayout from './components/layout/DashboardLayout';
import DashboardPage from './pages/DashboardPage';
import ServicesPage from './pages/ServicesPage';
import StylistsPage from './pages/StylistsPage';
import AppointmentsPage from './pages/AppointmentsPage';
import ClientsPage from './pages/ClientsPage';
import ReviewsPage from './pages/ReviewsPage';
import GalleryPage from './pages/GalleryPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="stylists" element={<StylistsPage />} />
            <Route path="appointments" element={<AppointmentsPage />} />
            <Route path="clients" element={<ClientsPage />} />
            <Route path="reviews" element={<ReviewsPage />} />
            <Route path="gallery" element={<GalleryPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    
  );
}

export default App;