import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import localforage from "localforage";
import Loading from "../components/common/Loading";

function RequireAuth() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
  localforage.getItem("auth").then((value) => {
    if (value && value.x === "b3f8d2a9e7c1f4b6") {
      setIsLoggedIn(true);
    }
    setIsLoading(false);
  });
}, []);


  if (isLoading) {
    return <Loading />; // or a spinner
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default RequireAuth;
