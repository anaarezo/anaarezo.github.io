"use client";

import Image from "next/image";
import { useTranslations } from 'next-intl';

const books = [
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    cover: "/books/clean-code.jpg",
  },
  {
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt, David Thomas",
    cover: "/books/the-pragmatic-programmer.jpg",
  },
  {
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    cover: "/books/designing-data-intensive-applications.jpg",
  },
];

export default function Books() {
  const t = useTranslations('books');
  
  return (
    <div className="flex flex-col items-center space-y-8 min-h-screen bg-white dark:bg-black py-16">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">{t('title')}</h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-center text-zinc-700 dark:text-zinc-300">
        {t('description')}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {books.map((book) => (
          <div key={book.title} className="flex flex-col items-center text-center group">
            <div className="relative overflow-hidden rounded-lg shadow-lg transition-transform transform group-hover:scale-105">
              <Image
                src={book.cover}
                alt={book.title}
                width={200}
                height={300}
                className="rounded-lg"
              />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-zinc-50">{book.title}</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">{book.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
