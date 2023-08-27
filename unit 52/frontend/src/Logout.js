import { Redirect } from "react-router-dom";
import { useEffect } from "react";
import WeTripApi from "./WeTripApi";

// Component to handle user logout
function Logout({ updateCurrentUser }) {
  // Effect to clear user data and token
  useEffect(() => {
    // Clear name, location, and token from state and local storage
    updateCurrentUser("", "", "");
    WeTripApi.token = "";
  }, [updateCurrentUser]);

  // Redirect to home page after logout
  return <Redirect to="/" />;
}

export default Logout;
