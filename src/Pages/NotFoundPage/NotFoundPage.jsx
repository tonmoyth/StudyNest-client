import { Link } from "react-router";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--background)] text-[var(--text)] px-4">
      <h1 className="text-6xl font-bold text-[var(--primary)] mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-center max-w-md mb-6 text-gray-500">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-6 py-2 rounded bg-[var(--primary)] hover:bg-[var(--secondary)] text-white font-medium transition"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
