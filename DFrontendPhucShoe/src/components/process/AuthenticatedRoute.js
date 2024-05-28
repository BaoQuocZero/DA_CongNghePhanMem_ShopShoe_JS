// AuthenticatedRoute.js
import React from 'react';
import { Route, Navigate, Redirect } from 'react-router-dom';

// AuthenticatedRoute.js
const AuthenticatedRoute = ({ element: Element, ...rest }) => (
    <Route
        {...rest}
        element={isLoggedIn ? <Element /> : <Navigate to="/admin" replace />}
    />
);


export default AuthenticatedRoute;
