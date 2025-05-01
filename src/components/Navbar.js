import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem("theme") === "dark";
    const root = document.documentElement;

    if (isDark) {
      root.classList.add("dark");
      setDarkMode(true);
    } else {
      root.classList.remove("dark");
      setDarkMode(false);
    }
  }, []);

  const toggleDarkMode = () => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // ✅ Navbar is now fixed at top, with height buffer
    <header className="fixed top-0 left-0 w-full bg-black bg-opacity-80 z-50 shadow-md">
      <div className="max-w-[1440px] mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0">
        {/* Left: Logo */}
        <Link to="/" className="text-blue-600 text-4xl md:text-5xl font-bold">
          NETFLIX
        </Link>

        {/* Center: Dark Mode */}
        <button
          onClick={toggleDarkMode}
          className="text-white px-4 py-1 border border-gray-400 rounded hover:bg-gray-700 transition"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>

        {/* Right: Auth */}
        <div className="flex space-x-2">
          {user?.email ? (
            <>
              <Link to="/account">
                <button className="text-white">Account</button>
              </Link>
              <button
                onClick={handleLogout}
                className="bg-blue-600 px-4 py-1.5 rounded hover:bg-blue-500"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="bg-blue-600 px-4 py-1.5 rounded hover:bg-blue-500">
                  Sign In
                </button>
              </Link>
              <Link to="/signup">
                <button className="bg-blue-600 px-4 py-1.5 rounded hover:bg-blue-500">
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
