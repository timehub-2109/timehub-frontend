import { Link} from "react-router-dom";

function NotFound() {
  return (
    <div className="mt-12">
    <h1 className="text-3xl font-bold mb-4">404 - Not Found!</h1>
      <Link to="/dashboard" className="text-green-600 underline"> 
        Back to Dashboard
      </Link>
  </div>
  );
}

export default NotFound;