import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { DocsContent } from '../components/docs/DocsContent';
import { DocsNavbar } from '../components/docs/DocsNavbar';
import { DocsSidebar } from '../components/docs/DocsSidebar';
import { allDocPages, getDocPage } from '../data/docs';
import { cn } from '../lib/utils';

export const DeveloperGuide = () => {
  const { slug } = useParams<{ slug?: string }>();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const page = getDocPage(slug);
  const isKnownSlug = !slug || allDocPages.some((docPage) => docPage.slug === slug);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page.slug]);

  if (!isKnownSlug) {
    return <Navigate to="/developers/guide/introduction" replace />;
  }

  return (
    <div className="min-h-screen scroll-smooth bg-white text-neutral-950 dark:bg-neutral-950 dark:text-neutral-50">
      <DocsSidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onCollapseToggle={() => setCollapsed((value) => !value)}
        onMobileClose={() => setMobileOpen(false)}
      />
      <div className={cn('transition-all', collapsed ? 'lg:pl-20' : 'lg:pl-72')}>
        <DocsNavbar
          isDark={isDark}
          onThemeToggle={() => setIsDark((value) => !value)}
          onMenuToggle={() => setMobileOpen(true)}
        />
        <main>
          <DocsContent page={page} />
        </main>
      </div>
    </div>
  );
};
