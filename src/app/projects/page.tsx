"use client";

import { useEffect, useMemo, useState } from 'react';

type GithubRepo = {
  id: number;
  html_url: string;
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
};

export default function Projects() {
  const [projects, setProjects] = useState<GithubRepo[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch("https://api.github.com/users/anaarezo/repos?sort=updated");
        if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
        const data = (await res.json()) as GithubRepo[];
        if (!cancelled) setProjects(data);
      } catch {
        if (!cancelled) setError("Couldn't load projects right now.");
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const topProjects = useMemo(() => (projects ?? []).slice(0, 6), [projects]);

  return (
    <div className="flex flex-col items-center space-y-8 min-h-screen bg-white dark:bg-black py-16">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">My Projects</h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-center text-zinc-700 dark:text-zinc-300">
        Here are some of my projects on GitHub.
      </p>
      {error ? (
        <div className="mt-8 max-w-2xl text-center text-zinc-700 dark:text-zinc-300">
          <p>{error}</p>
          <a
            className="mt-3 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline"
            href="https://github.com/anaarezo"
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/anaarezo
          </a>
        </div>
      ) : projects === null ? (
        <div className="mt-8 text-zinc-600 dark:text-zinc-400">Loading projects…</div>
      ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 w-full">
        {topProjects.map((project) => (
          <a
            key={project.id}
            href={project.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-zinc-50 dark:bg-zinc-900 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-zinc-200 dark:border-zinc-800"
          >
            <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">{project.name}</h3>
            <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">{project.description || "No description available."}</p>
            <div className="mt-4 flex items-center text-sm text-zinc-600 dark:text-zinc-400">
              {project.language && <span>{project.language}</span>}
              {project.language && <span className="mx-2">&middot;</span>}
              <span>{project.stargazers_count} ★</span>
            </div>
          </a>
        ))}
      </div>
      )}
    </div>
  );
}
