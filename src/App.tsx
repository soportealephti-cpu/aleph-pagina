import { useEffect, useState } from 'react';
import { Footer } from './components/Footer';
import { SiteHeader } from './components/SiteHeader';
import { normalizePath, pageContent } from './data/siteContent';
import { ContentPage } from './pages/ContentPage';
import { FallbackPage } from './pages/FallbackPage';
import { HomePage } from './pages/HomePage';
import { routeRegistry } from './pages/routeRegistry';

export default function App() {
  const [pathname, setPathname] = useState(() => normalizePath(window.location.pathname));

  useEffect(() => {
    const updatePath = () => {
      setPathname(normalizePath(window.location.pathname));
    };

    window.addEventListener('popstate', updatePath);
    return () => window.removeEventListener('popstate', updatePath);
  }, []);

  const isHome = pathname === '/';
  const aulaBasePath = pathname.startsWith('/aula-virtual/') ? '/aula-virtual/' : null;
  const isStandaloneAula = aulaBasePath === '/aula-virtual/';
  const content = pageContent[pathname];
  const RouteComponent = aulaBasePath ? routeRegistry[aulaBasePath] : routeRegistry[pathname];

  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-900">
      {isStandaloneAula ? null : <SiteHeader />}
      {isHome ? <HomePage /> : RouteComponent ? <RouteComponent /> : content ? <ContentPage content={content} /> : <FallbackPage />}
      {isStandaloneAula ? null : <Footer />}
    </main>
  );
}
