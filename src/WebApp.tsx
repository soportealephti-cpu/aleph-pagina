import { useEffect, useState } from 'react';
import { Footer } from './components/Footer';
import { SiteHeader } from './components/SiteHeader';
import { AULA_PUBLIC_URL } from './config/runtime';
import { normalizePath, pageContent } from './data/siteContent';
import { ContentPage } from './pages/ContentPage';
import { FallbackPage } from './pages/FallbackPage';
import { HomePage } from './pages/HomePage';
import { routeRegistry } from './pages/routeRegistry';

export default function WebApp() {
  const [pathname, setPathname] = useState(() => normalizePath(window.location.pathname));

  useEffect(() => {
    const updatePath = () => {
      setPathname(normalizePath(window.location.pathname));
    };

    window.addEventListener('popstate', updatePath);
    return () => window.removeEventListener('popstate', updatePath);
  }, []);

  useEffect(() => {
    if (pathname.startsWith('/aula-virtual/') && /^https?:\/\//i.test(AULA_PUBLIC_URL)) {
      window.location.replace(AULA_PUBLIC_URL);
    }
  }, [pathname]);

  const isHome = pathname === '/';
  const content = pageContent[pathname];
  const RouteComponent = routeRegistry[pathname];

  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-900">
      <SiteHeader />
      {isHome ? <HomePage /> : RouteComponent ? <RouteComponent /> : content ? <ContentPage content={content} /> : <FallbackPage />}
      <Footer />
    </main>
  );
}
