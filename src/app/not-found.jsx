/**
 * Error 404 Page.
 * @returns {JSX.Element} JSX Element that represents Error 404 page.
 */


export default function NotFoundPage() {
  return (
    <main className="bg-gray-900">

      {/* Container */}
      <section className="flex flex-col justify-center min-h-screen bg-secondary lg:bg-transparent">
        {/* Header */}
        <header className="text-center">
        <span className="font-bold text-primary text-white text-6xl sm:text-8xl md:text-9xl lg:text-10xl xl:text-11xl">
        <h1>COMING SOON</h1>
      </span>
        </header>
        {/* Text content section */}
        <section className="text-center mt-4">
          {/* Error 404 Message */}
          <span className="font-bold text-black text-4xl">
          </span>
        </section>
      </section>
    </main>
  );
}
