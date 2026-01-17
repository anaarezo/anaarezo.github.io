'use client';

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center text-center space-y-8 min-h-screen bg-white dark:bg-black py-16">
      <Image
        src="/assets/profile.png"
        alt="Ana Arezo"
        width={128}
        height={128}
        className="rounded-full border-4 border-blue-500 shadow-lg"
      />
      <div>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Ana Arezo</h1>
        <p className="text-xl text-zinc-700 dark:text-zinc-300 mt-2">Software Engineer</p>
        <p className="text-md text-zinc-600 dark:text-zinc-400">📍 London, UK</p>
      </div>
      <p className="max-w-md text-lg leading-8 text-zinc-700 dark:text-zinc-300">
        I'm a passionate software engineer with a focus on creating beautiful and user-friendly applications. I have experience in a variety of technologies and I'm always eager to learn new things.
      </p>
      <div className="flex gap-4">
        <Link href="/projects" className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          View Projects
        </Link>
        <Link href="/contact" className="px-6 py-3 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-50 font-medium rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
          Contact Me
        </Link>
      </div>
    </div>
  );
}

