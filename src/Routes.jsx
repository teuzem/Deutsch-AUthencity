import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import Homepage from "pages/homepage";
import UserLogin from "pages/user-login";
import Dashboard from "pages/dashboard";
import AdminApplicationManagement from "pages/admin-application-management";
import DocumentGallery from "pages/document-gallery";
import DocumentApplicationForm from "pages/document-application-form";
import UserProfileManagement from "pages/user-profile-management";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<Homepage />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin-application-management" element={<AdminApplicationManagement />} />
        <Route path="/document-gallery" element={<DocumentGallery />} />
        <Route path="/document-application-form" element={<DocumentApplicationForm />} />
        <Route path="/user-profile-management" element={<UserProfileManagement />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;