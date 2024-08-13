// ProtectedRoute.js
import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const ProtectedRoute = ({ element, ...rest }) => {
  const { accessToken } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        accessToken ? (
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

export default ProtectedRoute;
