import Home from 'pages/Home';
import Showcases from 'pages/Showcases';
import Verified from 'pages/verified';
import Notfound from 'pages/404';
import Discord from 'pages/discord';
import Pricing from 'pages/Pricing';
import Terms from 'pages/terms/terms';
import Faq from 'pages/faq';
import PrivacyPolicy from 'pages/terms/privacypolicy';
import RefundPolicy from 'pages/terms/refundpolicy';
import { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Progress from 'components/LoadingTopBar/ProgressBar';
import Dashboard from 'pages/user/Dashboard';
import Logs from 'pages/admin/logs';
import Games from 'pages/buyers/games';
import Scripts from 'pages/buyers/scripts';
import Executor from 'pages/buyers/executor';
import RequireAuth from 'lib/RequireAuth';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import FAQ from '@pages/faq';
import Trial from 'pages/trial';
import { NOTFOUND } from 'dns';
const queryClient = new QueryClient();
export default function App() {
  // eslint-disable-next-line
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  return (
    <>
      <Progress isAnimating={isLoading} key={location.key} />

      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/showcases" element={<Showcases />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/discord" element={<Discord />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/verified" element={<Verified />} />
          <Route path="/terms/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms/refund-policy" element={<RefundPolicy />} />
          <Route path="/trial" element={<Trial/>} />
          <Route path="*" element={<Notfound />} />
          {/* Protected Routes */}
          <Route
            path="/user/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/buyers/games"
            element={
              <RequireAuth>
                <Games />
              </RequireAuth>
            }
          />
          <Route
            path="/buyers/scripts"
            element={
              <RequireAuth>
                <Scripts />
              </RequireAuth>
            }
          />
          <Route
            path="/buyers/executor"
            element={
              <RequireAuth>
                <Executor />
              </RequireAuth>
            }
          />

          <Route
            path="/admin/logs"
            element={
              <RequireAuth>
                <Logs />
              </RequireAuth>
            }
          />
        </Routes>
      </QueryClientProvider>
    </>
  );
}
