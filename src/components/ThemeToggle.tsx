'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { FiMonitor, FiMoon, FiSun } from 'react-icons/fi';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="p-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900">
        <div className="h-5 w-5" />
      </button>
    );
  }

  const cycleTheme = () => {
    const order: Array<'system' | 'light' | 'dark'> = ['system', 'light', 'dark'];
    const current = (theme ?? 'system') as 'system' | 'light' | 'dark';
    const next = order[(order.indexOf(current) + 1) % order.length];
    setTheme(next);
  };

  const Icon = theme === 'system' ? FiMonitor : resolvedTheme === 'dark' ? FiSun : FiMoon;
  const label = theme === 'system' ? 'Theme: System' : `Theme: ${resolvedTheme === 'dark' ? 'Dark' : 'Light'}`;

  return (
    <button
      onClick={cycleTheme}
      className="p-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
      aria-label={label}
      title={label}
      type="button"
    >
      <Icon className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
    </button>
  );
}
