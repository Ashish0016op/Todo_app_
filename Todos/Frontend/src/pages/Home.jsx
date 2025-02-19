import React from "react";
import { Toaster } from "react-hot-toast";
import Todo from "../components/Todo";
import { Link } from "react-router-dom";
const Home = () => {
  const isloginIn=localStorage.getItem('login');
  return (
    <div>
      <header className="bg-slate-600">
      <div className="flex space-x-4 p-4 justify-end">
        <Link
          to="/login"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Register
        </Link>
      </div>
      </header>
      {isloginIn?<Todo />:<div>please login first</div>}
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default Home;
