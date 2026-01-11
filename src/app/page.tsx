'use client';

import { useEffect } from 'react';

export default function RootPage() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

  useEffect(() => {
    window.location.replace(`${basePath}/en/`);
  }, [basePath]);

  return (
    <div style={{ padding: 24, fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif' }}>
      <p>Redirecting…</p>
      <p>
        If you are not redirected, choose a language:{' '}
        <a href={`${basePath}/en/`}>English</a> · <a href={`${basePath}/pt/`}>Português</a> ·{' '}
        <a href={`${basePath}/es/`}>Español</a>
      </p>
    </div>
  );
}
