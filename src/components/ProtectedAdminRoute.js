import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const ProtectedAdminRoute = ({ element, requiredRole, ...rest }) => {
  const { authToken, role } = useContext(AuthContext);

  // Check if the user has the required role
  const hasRequiredRole = role === requiredRole;

  return (
    <Route
      {...rest}
      render={({ location }) =>
        authToken && hasRequiredRole ? (
          element
        ) : (
          <Redirect
            to={{
              pathname: "/welcome",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedAdminRoute;
