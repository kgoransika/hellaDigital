import React from 'react';
import bgImg from '../assets/hellaDigitalBG3.png';

export default function PageNotFound() {
  return (
    <div
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        maxWidth: '100%',
        maxHeight: '100%',
      }}
    >
      {/*
        This example requires updating your template:

        ```
        <html class="h-full">
        <body class="h-full">
        ```
      */}
      <main className="grid min-h-full place-items-center py-24 px-6 sm:py-32 lg:px-8 h-screen backdrop-blur-md bg-black/20">
        <div className="text-center">
          <p className="text-base font-bold text-blue-600">404</p>
          <h1 className="mt-4 text-3xl tracking-tight text-white sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-6 text-base leading-7 text-white-50">
            Sorry, we couldn't find the page you're looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="/"
              className="rounded-md bg-blue-600 px-3.5 py-2.5 text-xl text-white shadow-sm hover:bg-indigo focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 no-underline hover:animate-pulse"
            >
              Go back home
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
