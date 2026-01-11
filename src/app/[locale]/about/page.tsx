"use client";

import { useTranslations } from 'next-intl';

const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "GraphQL",
  "PostgreSQL",
  "Docker",
  "Kubernetes",
  "AWS",
];

export default function About() {
  const t = useTranslations('about');
  
  return (
    <div className="flex flex-col items-center space-y-8 min-h-screen bg-white dark:bg-black py-16">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">{t('title')}</h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-center text-zinc-700 dark:text-zinc-300">
        {t('description')}
      </p>
      <div className="mt-12 w-full">
        <h2 className="text-2xl font-bold text-center text-zinc-900 dark:text-zinc-50">{t('skills')}</h2>
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          {skills.map((skill) => (
            <div key={skill} className="px-6 py-3 bg-gradient-to-r from-blue-500/10 to-purple-600/10 border border-blue-500/20 rounded-full text-sm font-medium hover:border-blue-500/50 transition-colors text-zinc-900 dark:text-zinc-100">
              {skill}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
