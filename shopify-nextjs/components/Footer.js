export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <nav className="flex flex-wrap justify-center"></nav>
        <p className="mt-8 text-center text-gray-400">
          &copy;
          {new Date().getFullYear()} Shopify + Next.js
        </p>
      </div>
    </footer>
  );
}
