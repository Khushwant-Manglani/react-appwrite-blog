import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "./features/authSlice";
import authService from "./appwrite/authService";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";
// import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    authService
      .getAccount()
      .then((userData) => {
        if (userData) {
          useDispatch(login({ userData }));
        } else {
          useDispatch(logout());
        }
      })
      // .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (error.length) {
    return <div>Error Occurred: {error}</div>;
  }

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header />
        <main>TODO: {/* <Outlet /> */}</main>
        <Footer />
      </div>
    </div>
  ) : (
    <div>Loading</div>
  );
}

export default App;
