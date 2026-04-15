import { createBrowserRouter } from 'react-router';
import { RootLayout } from './layouts/RootLayout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Programs } from './pages/Programs';
import { Projects } from './pages/Projects';
import { ProjectDetail } from './pages/ProjectDetail';
import { Achievements } from './pages/Achievements';
import { Events } from './pages/Events';
import { Team } from './pages/Team';
import { Gallery } from './pages/Gallery';
import { Contact } from './pages/Contact';
import { Membership } from './pages/Membership';
import { Dashboard } from './pages/Dashboard';
import { Blog } from './pages/Blog';
import { Support } from './pages/Support';
import { NotFound } from './pages/NotFound';
import { CourseQuiz } from './pages/CourseQuiz';
import { CertificateClaim } from './pages/CertificateClaim';
import { CertificateVerify } from './pages/CertificateVerify';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';

import { AdminLayout } from './layouts/AdminLayout';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminMembers } from './pages/admin/AdminMembers';
import { AdminEvents } from './pages/admin/AdminEvents';
import { AdminProjects } from './pages/admin/AdminProjects';
import { AdminBlog } from './pages/admin/AdminBlog';
import { AdminDonations } from './pages/admin/AdminDonations';
import { AdminMessages } from './pages/admin/AdminMessages';
import { AdminSettings } from './pages/admin/AdminSettings';
import { AdminPrograms } from './pages/admin/AdminPrograms';
import { AdminAchievements } from './pages/admin/AdminAchievements';
import { AdminGallery } from './pages/admin/AdminGallery';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: 'about', Component: About },
      { path: 'programs', Component: Programs },
      { path: 'projects', Component: Projects },
      { path: 'projects/:id', Component: ProjectDetail },
      { path: 'achievements', Component: Achievements },
      { path: 'events', Component: Events },
      { path: 'team', Component: Team },
      { path: 'gallery', Component: Gallery },
      { path: 'contact', Component: Contact },
      { path: 'join', Component: Membership },
      { path: 'dashboard', Component: Dashboard },
      { path: 'blog', Component: Blog },
      { path: 'support', Component: Support },
      { path: 'courses/:id/quiz', Component: CourseQuiz },
      { path: 'certificates/claim/:id', Component: CertificateClaim },
      { path: 'certificates/v/:slug', Component: CertificateVerify },
      { path: 'privacy', Component: Privacy },
      { path: 'terms', Component: Terms },
      { path: '*', Component: NotFound },
    ],
  },
  {
    path: '/admin/login',
    Component: AdminLogin,
  },
  {
    path: '/admin',
    Component: AdminLayout,
    children: [
      { index: true, Component: AdminDashboard },
      { path: 'members', Component: AdminMembers },
      { path: 'programs', Component: AdminPrograms },
      { path: 'projects', Component: AdminProjects },
      { path: 'achievements', Component: AdminAchievements },
      { path: 'events', Component: AdminEvents },
      { path: 'blog', Component: AdminBlog },
      { path: 'gallery', Component: AdminGallery },
      { path: 'messages', Component: AdminMessages },
      { path: 'donations', Component: AdminDonations },
      { path: 'settings', Component: AdminSettings },
    ],
  },
]);
