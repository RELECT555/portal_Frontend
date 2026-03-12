import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';
import { ROUTES } from '@/lib/constants';
import { MainLayout } from '@/components/layout/MainLayout';
import { NotFoundPage } from '@/components/shared';

const HomePage = lazy(() => import('@/features/home/HomePage'));
const CompanyPage = lazy(() => import('@/features/company/CompanyPage'));
const CompanySectionPage = lazy(() => import('@/features/company/CompanySectionPage'));
const NewsPage = lazy(() => import('@/features/news/NewsPage'));
const TeamPage = lazy(() => import('@/features/team/TeamPage'));
const CulturePage = lazy(() => import('@/features/culture/CulturePage'));
const LivePage = lazy(() => import('@/features/live/LivePage'));
const IdeasPage = lazy(() => import('@/features/ideas/IdeasPage'));
const KnowledgeBasePage = lazy(() => import('@/features/knowledge-base/KnowledgeBasePage'));
const VacanciesPage = lazy(() => import('@/features/vacancies/VacanciesPage'));
const GratitudePage = lazy(() => import('@/features/gratitude/GratitudePage'));
const LibraryPage = lazy(() => import('@/features/library/LibraryPage'));
const MerchShopPage = lazy(() => import('@/features/merch-shop/MerchShopPage'));
const PostConstructorPage = lazy(
  () => import('@/features/post-constructor/components/PostConstructorPage'),
);
const ProfilePage = lazy(() => import('@/features/profile/ProfilePage'));
const MoodPortalPage = lazy(() => import('@/features/mood/MoodPortalPage'));

const PageLoader: React.FC = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
    <CircularProgress color="primary" />
  </Box>
);

function withSuspense(Component: React.LazyExoticComponent<React.ComponentType>): React.ReactNode {
  return (
    <Suspense fallback={<PageLoader />}>
      <Component />
    </Suspense>
  );
}

export const AppRoutes: React.FC = () => (
  <Routes>
    {/* Fullscreen immersive routes — no layout shell */}
    <Route path={ROUTES.MERCH_SHOP} element={withSuspense(MerchShopPage)} />
    <Route path={ROUTES.MOOD} element={withSuspense(MoodPortalPage)} />

    <Route element={<MainLayout />}>
      <Route path={ROUTES.HOME} element={withSuspense(HomePage)} />
      <Route path={ROUTES.COMPANY} element={withSuspense(CompanyPage)} />
      <Route path={ROUTES.COMPANY_SECTION} element={withSuspense(CompanySectionPage)} />
      <Route path={ROUTES.NEWS} element={withSuspense(NewsPage)} />
      <Route path={ROUTES.TEAM} element={withSuspense(TeamPage)} />
      <Route path={ROUTES.CULTURE} element={withSuspense(CulturePage)} />
      <Route path={ROUTES.LIVE} element={withSuspense(LivePage)} />
      <Route path={ROUTES.IDEAS} element={withSuspense(IdeasPage)} />
      <Route path={ROUTES.KNOWLEDGE_BASE} element={withSuspense(KnowledgeBasePage)} />
      <Route path={ROUTES.VACANCIES} element={withSuspense(VacanciesPage)} />
      <Route path={ROUTES.GRATITUDE} element={withSuspense(GratitudePage)} />
      <Route path={ROUTES.LIBRARY} element={withSuspense(LibraryPage)} />
      <Route path={ROUTES.POST_CONSTRUCTOR} element={withSuspense(PostConstructorPage)} />
      <Route path={ROUTES.POST_CONSTRUCTOR_EDIT} element={withSuspense(PostConstructorPage)} />
      <Route path={ROUTES.PROFILE} element={withSuspense(ProfilePage)} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);
