import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ToastProvider from './components/system/ToastProvider';
import PublicLayout from './components/layout/PublicLayout';
import AdminLayout from './components/layout/AdminLayout';
import { SessionProvider } from './components/system/SessionProvider';
import AuthGuard from './components/layout/AuthGuard';

// Public Pages
import Home from './pages/public/Home';
import About from './pages/public/About';
import Programs from './pages/public/Programs';
import Startups from './pages/public/Startups';
import StartupDetail from './pages/public/StartupDetail';
import Leadership from './pages/public/Leadership';
import Events from './pages/public/Events';
import EventDetail from './pages/public/EventDetail';
import Blogs from './pages/public/Blogs';
import BlogDetail from './pages/public/BlogDetail';
import Infrastructure from './pages/public/Infrastructure';
import Downloads from './pages/public/Downloads';
import Donate from './pages/public/Donate';
import Contact from './pages/public/Contact';
import NotFound from './pages/public/NotFound';

// Admin Pages
import Login from './pages/admin/Login';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminStartups from './pages/admin/AdminStartups';
import AdminEvents from './pages/admin/AdminEvents';
import AdminBlogs from './pages/admin/AdminBlogs';
import AdminDocuments from './pages/admin/AdminDocuments';
import AdminSettings from './pages/admin/AdminSettings';
import AdminLeadership from './pages/admin/AdminLeadership';
import AdminInfrastructure from './pages/admin/AdminInfrastructure';
import AdminApplications from './pages/admin/AdminApplications';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <BrowserRouter>
          <ToastProvider />
          <Routes>
            {/* Public Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/startups" element={<Startups />} />
              <Route path="/startups/:slug" element={<StartupDetail />} />
              <Route path="/leadership" element={<Leadership />} />
              <Route path="/events" element={<Events />} />
              <Route path="/events/:slug" element={<EventDetail />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blogs/:slug" element={<BlogDetail />} />
              <Route path="/infrastructure" element={<Infrastructure />} />
              <Route path="/downloads" element={<Downloads />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin/login" element={<Login />} />
            <Route 
              path="/admin" 
              element={
                <AuthGuard>
                  <AdminLayout />
                </AuthGuard>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="startups" element={<AdminStartups />} />
              <Route path="events" element={<AdminEvents />} />
              <Route path="blogs" element={<AdminBlogs />} />
              <Route path="documents" element={<AdminDocuments />} />
              <Route path="leadership" element={<AdminLeadership />} />
              <Route path="infrastructure" element={<AdminInfrastructure />} />
              <Route path="applications" element={<AdminApplications />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </SessionProvider>
    </QueryClientProvider>
  );
}

export default App;
