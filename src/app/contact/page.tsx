"use client";

export default function Contact() {
  return (
    <div className="flex flex-col items-center space-y-8 min-h-screen bg-white dark:bg-black py-16">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Contact Me</h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-center text-zinc-700 dark:text-zinc-300">
        I'm always open to new opportunities and collaborations. Feel free to reach out to me.
      </p>
      <div className="mt-12 w-full max-w-md">
        <form className="grid grid-cols-1 gap-y-6">
          <div>
            <label htmlFor="name" className="sr-only">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              autoComplete="name"
              className="block w-full shadow-sm py-3 px-4 placeholder-zinc-500 focus:ring-blue-500 focus:border-blue-500 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-900"
              placeholder="Name"
            />
          </div>
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              className="block w-full shadow-sm py-3 px-4 placeholder-zinc-500 focus:ring-blue-500 focus:border-blue-500 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-900"
              placeholder="Email"
            />
          </div>
          <div>
            <label htmlFor="message" className="sr-only">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="block w-full shadow-sm py-3 px-4 placeholder-zinc-500 focus:ring-blue-500 focus:border-blue-500 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-900"
              placeholder="Message"
            />
          </div>
          <div>
            <button
              type="submit"
              className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-lg transition-shadow"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
