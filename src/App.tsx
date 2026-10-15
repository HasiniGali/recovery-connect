import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { SavedProvider } from './context/SavedContext';
import { AccessibilityProvider } from './context/AccessibilityContext';
import { RootLayout } from './layouts/RootLayout';
import { AdminLayout } from './layouts/AdminLayout';

// Public Pages
import { LandingPage } from './pages/LandingPage';
import { DiscoverPage } from './pages/DiscoverPage';
import { ResourceDetailPage } from './pages/ResourceDetailPage';
import { MapPage } from './pages/MapPage';
import { SavedPage } from './pages/SavedPage';
import { EmergencyPage } from './pages/EmergencyPage';
import { AboutPage } from './pages/AboutPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminResourcesPage } from './pages/admin/AdminResourcesPage';
import { AdminVerificationPage } from './pages/admin/AdminVerificationPage';
import { AdminReportsPage } from './pages/admin/AdminReportsPage';
import { AdminAnalyticsPage } from './pages/admin/AdminAnalyticsPage';

export function App() {
  return (
    <LanguageProvider>
      <AccessibilityProvider>
        <SavedProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Application Routes */}
              <Route path="/" element={<RootLayout />}>
                <Route index element={<LandingPage />} />
                <Route path="discover" element={<DiscoverPage />} />
                <Route path="resources/:id" element={<ResourceDetailPage />} />
                <Route path="map" element={<MapPage />} />
                <Route path="saved" element={<SavedPage />} />
                <Route path="emergency" element={<EmergencyPage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>

              {/* Admin Portal Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="resources" element={<AdminResourcesPage />} />
                <Route path="verification" element={<AdminVerificationPage />} />
                <Route path="reports" element={<AdminReportsPage />} />
                <Route path="analytics" element={<AdminAnalyticsPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </SavedProvider>
      </AccessibilityProvider>
    </LanguageProvider>
  );
}

export default App;
