import React from "react";
import { AuthContext } from "../context/auth-context";

const LogoutButton = () => {
  const auth = useContext(AuthContext);
  return (
    <div>
      {auth.isLoggedIn && (
        <li>
          <button onClick={auth.logout}>LOGOUT</button>
        </li>
      )}
    </div>
  );
};

export default LogoutButton;
