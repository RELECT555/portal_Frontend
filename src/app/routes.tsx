import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';
import { ROUTES } from '@/lib/constants';
import { MainLayout } from '@/components/layout/MainLayout';

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

const PageLoader: React.FC = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
    <CircularProgress color="primary" />
  </Box>
);

export const AppRoutes: React.FC = () => (
  <Suspense fallback={<PageLoader />}>
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.COMPANY} element={<CompanyPage />} />
        <Route path={ROUTES.COMPANY_SECTION} element={<CompanySectionPage />} />
        <Route path={ROUTES.NEWS} element={<NewsPage />} />
        <Route path={ROUTES.TEAM} element={<TeamPage />} />
        <Route path={ROUTES.CULTURE} element={<CulturePage />} />
        <Route path={ROUTES.LIVE} element={<LivePage />} />
        <Route path={ROUTES.IDEAS} element={<IdeasPage />} />
        <Route path={ROUTES.KNOWLEDGE_BASE} element={<KnowledgeBasePage />} />
        <Route path={ROUTES.VACANCIES} element={<VacanciesPage />} />
        <Route path={ROUTES.GRATITUDE} element={<GratitudePage />} />
        <Route path={ROUTES.LIBRARY} element={<LibraryPage />} />
      </Route>
    </Routes>
  </Suspense>
);
