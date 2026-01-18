'use client';

import { FaGithub, FaLinkedin, FaTwitter, FaCodepen } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className=" relative bg-white dark:bg-black mt-32 border-t border-zinc-200 dark:border-zinc-800 z-40">
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center space-x-6">
          <a href="https://github.com/anaarezo" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-blue-500 transition-colors">
            <span className="sr-only">GitHub</span>
            <FaGithub className="h-6 w-6" />
          </a>
          <a href="https://www.linkedin.com/in/anaarezo/" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-blue-500 transition-colors">
            <span className="sr-only">LinkedIn</span>
            <FaLinkedin className="h-6 w-6" />
          </a>
          <a href="https://codepen.io/anaarezo" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-blue-500 transition-colors">
            <span className="sr-only">CodePen</span>
            <FaCodepen className="h-6 w-6" />
          </a>
          <a href="https://twitter.com/anaarezo" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-blue-500 transition-colors">
            <span className="sr-only">Twitter</span>
            <FaTwitter className="h-6 w-6" />
          </a>
        </div>
        <p className="mt-8 text-center text-base text-zinc-600 dark:text-zinc-400">
          &copy; {new Date().getFullYear()} Ana Arezo. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
