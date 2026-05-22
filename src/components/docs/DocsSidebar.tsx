import { ChevronLeft, ChevronRight, Search, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { docSections } from '../../data/docs';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { ScrollArea } from '../ui/scroll-area';

type DocsSidebarProps = {
  collapsed: boolean;
  mobileOpen: boolean;
  onCollapseToggle: () => void;
  onMobileClose: () => void;
};

export const DocsSidebar = ({ collapsed, mobileOpen, onCollapseToggle, onMobileClose }: DocsSidebarProps) => {
  const [query, setQuery] = useState('');

  const sections = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return docSections;

    return docSections
      .map((section) => ({
        ...section,
        pages: section.pages.filter((page) =>
          `${page.title} ${page.description}`.toLowerCase().includes(normalized),
        ),
      }))
      .filter((section) => section.pages.length > 0);
  }, [query]);

  return (
    <>
      <div
        className={cn('fixed inset-0 z-40 bg-black/40 lg:hidden', mobileOpen ? 'block' : 'hidden')}
        onClick={onMobileClose}
      />
      <aside
        className={cn(
          'fixed left-0 top-0 z-50 h-screen border-r border-neutral-200 bg-white transition-all dark:border-neutral-800 dark:bg-neutral-950',
          collapsed ? 'lg:w-20' : 'lg:w-72',
          mobileOpen ? 'w-80 translate-x-0' : 'w-80 -translate-x-full lg:translate-x-0',
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-neutral-200 px-4 dark:border-neutral-800">
          {!collapsed && <span className="text-sm font-semibold text-neutral-950 dark:text-white">Documentation</span>}
          <Button variant="ghost" size="icon" className="hidden lg:inline-flex" onClick={onCollapseToggle} aria-label="Collapse sidebar">
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </Button>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMobileClose} aria-label="Close menu">
            <X size={18} />
          </Button>
        </div>

        {!collapsed && (
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
              <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search docs..." className="pl-9" />
            </div>
          </div>
        )}

        <ScrollArea className="h-[calc(100vh-8rem)] px-3 pb-6">
          <nav className="space-y-6">
            {sections.map((section) => (
              <div key={section.title}>
                {!collapsed && <p className="mb-2 px-3 text-xs font-semibold uppercase text-neutral-500">{section.title}</p>}
                <div className="space-y-1">
                  {section.pages.map((page) => {
                    const Icon = page.icon;

                    return (
                      <NavLink
                        key={page.slug}
                        to={`/developers/guide/${page.slug}`}
                        onClick={onMobileClose}
                        className={({ isActive }) =>
                          cn(
                            'flex items-center gap-3 rounded-md px-3 py-2 text-sm text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-950 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-white',
                            isActive && 'bg-neutral-100 font-medium text-neutral-950 dark:bg-neutral-900 dark:text-white',
                            collapsed && 'justify-center',
                          )
                        }
                        title={page.title}
                      >
                        <Icon size={17} />
                        {!collapsed && <span>{page.title}</span>}
                      </NavLink>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </ScrollArea>
      </aside>
    </>
  );
};
