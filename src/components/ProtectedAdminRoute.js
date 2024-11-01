import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const ProtectedAdminRoute = ({ element, requiredRole, ...rest }) => {
  const { accessToken, role } = useContext(AuthContext);

  const hasRequiredRole = role === requiredRole;

  return (
    <Route
      {...rest}
      render={({ location }) =>
        accessToken && hasRequiredRole ? (
          element
        ) : (
          <Redirect
            to={{
              pathname: "/home/0",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedAdminRoute;
