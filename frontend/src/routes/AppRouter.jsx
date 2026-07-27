import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

// Layouts
import { MainLayout } from '../layouts/MainLayout';
import { AdminLayout } from '../layouts/AdminLayout';
import { AuthLayout } from '../layouts/AuthLayout';

// Route Guards
import { ProtectedRoute } from './ProtectedRoute';
import { PublicRoute } from './PublicRoute';

// Customer Pages
import { Home } from '../pages/Home';
import { About } from '../pages/About';
import { Services } from '../pages/Services';
import { Packages } from '../pages/Packages';
import { Themes } from '../pages/Themes';
import { Gallery } from '../pages/Gallery';
import { Contact } from '../pages/Contact';
import { AIEventPlannerPage } from '../pages/AIEventPlannerPage';
import { CustomerLoginPlaceholder } from '../pages/CustomerLoginPlaceholder';

// Admin Pages & Features
import { AdminLogin } from '../pages/AdminLogin';
import { AdminDashboard } from '../features/admin/dashboard/AdminDashboard';
import { AdminEnquiries } from '../features/admin/enquiries/AdminEnquiries';
import { AdminEventTypes } from '../features/admin/event-types/AdminEventTypes';
import { AdminPackages } from '../features/admin/packages/AdminPackages';
import { AdminThemes } from '../features/admin/themes/AdminThemes';
import { AdminGallery } from '../features/admin/gallery/AdminGallery';
import { AdminSubscribers } from '../features/admin/newsletter/AdminSubscribers';

// Error Pages
import { NotFound } from '../pages/NotFound';
import { Unauthorized } from '../pages/Unauthorized';

/**
 * Main EventEasy Application Router component configuring route hierarchies and guards.
 */
export const AppRouter = () => {
  return (
    <Routes>
      {/* Customer Public Layout Routes */}
      <Route element={<MainLayout />}>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.ABOUT} element={<About />} />
        <Route path={ROUTES.SERVICES} element={<Services />} />
        <Route path={ROUTES.PACKAGES} element={<Packages />} />
        <Route path={ROUTES.THEMES} element={<Themes />} />
        <Route path={ROUTES.GALLERY} element={<Gallery />} />
        <Route path={ROUTES.CONTACT} element={<Contact />} />
        <Route path={ROUTES.AI_PLANNER} element={<AIEventPlannerPage />} />
        <Route path={ROUTES.LOGIN_CUSTOMER} element={<CustomerLoginPlaceholder />} />
      </Route>

      {/* Admin Public Auth Route */}
      <Route element={<PublicRoute />}>
        <Route element={<AuthLayout />}>
          <Route path={ROUTES.ADMIN_LOGIN} element={<AdminLogin />} />
        </Route>
      </Route>

      {/* Protected Admin Portal Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/enquiries" element={<AdminEnquiries />} />
          <Route path="/admin/subscribers" element={<AdminSubscribers />} />
          <Route path="/admin/event-types" element={<AdminEventTypes />} />
          <Route path="/admin/packages" element={<AdminPackages />} />
          <Route path="/admin/themes" element={<AdminThemes />} />
          <Route path="/admin/gallery" element={<AdminGallery />} />
        </Route>
      </Route>

      {/* Status & Catch-all Fallback Routes */}
      <Route path={ROUTES.UNAUTHORIZED} element={<Unauthorized />} />
      <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
    </Routes>
  );
};
