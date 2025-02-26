import React from "react";
import { Toaster } from "react-hot-toast";
import Todo from "../components/Todo";
import { Link } from "react-router-dom";
const Home = () => {
  const isloginIn=localStorage.getItem('login');
  const handleLogout = () => {
    localStorage.removeItem('login');
    window.location.reload();
  };
  return (
    <div>
      <header className="bg-slate-600">
      <div className="flex space-x-4 p-4 justify-end">
        {!isloginIn && <Link
          to="/login"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Login
        </Link>}
        {isloginIn && <Link
          onClick={handleLogout}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Logout
        </Link>}
        {!isloginIn && <Link
          to="/register"
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Register
        </Link>}
      </div>
      </header>
      {isloginIn?<Todo />:<div>please login first</div>}
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default Home;
