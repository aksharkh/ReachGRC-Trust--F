import { Github, Menu, Moon, Sun } from 'lucide-react';
import { Button } from '../ui/button';

type DocsNavbarProps = {
  isDark: boolean;
  onThemeToggle: () => void;
  onMenuToggle: () => void;
};

export const DocsNavbar = ({ isDark, onThemeToggle, onMenuToggle }: DocsNavbarProps) => (
  <header className="sticky top-0 z-30 border-b border-neutral-200 bg-white/85 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/85">
    <div className="flex h-16 items-center justify-between px-4 lg:px-8">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenuToggle} aria-label="Open menu">
          <Menu size={20} />
        </Button>
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-neutral-950 text-sm font-bold text-white dark:bg-white dark:text-neutral-950">
          R
        </div>
        <div>
          <p className="text-sm font-semibold text-neutral-950 dark:text-white">ReachGRC Docs</p>
          <p className="hidden text-xs text-neutral-500 sm:block">Developer Guide</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={onThemeToggle} aria-label="Toggle theme">
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </Button>
        <Button variant="outline" size="sm" onClick={() => window.open('https://github.com', '_blank')}>
          <Github size={16} />
          <span className="hidden sm:inline">GitHub</span>
        </Button>
      </div>
    </div>
  </header>
);
