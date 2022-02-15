import React from "react";
import { Route, Navigate } from "react-router-dom";

export function PrivateRoute({ children, auth, redirectTo  }) {
  
    return auth ? children : <Navigate to={redirectTo} />;
}