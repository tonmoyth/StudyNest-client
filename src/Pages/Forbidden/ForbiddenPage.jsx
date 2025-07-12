import { Link } from "react-router";
import { FaBan } from "react-icons/fa";

const ForbiddenPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4">
      <FaBan className="text-red-500 text-6xl mb-4" />
      <h1 className="text-3xl font-bold text-gray-800 mb-2">403 - Forbidden</h1>
      <p className="text-gray-600 mb-6 text-center">
        You don't have permission to access this page or resource.
      </p>
      <Link
        to="/"
        className="btn btn-primary"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default ForbiddenPage;
