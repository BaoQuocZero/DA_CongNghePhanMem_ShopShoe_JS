// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthenticatedRoute from './components/process/AuthenticatedRoute';
import AdminLogin from '../views/loginAdmin';
import PageAdmin from '../views/PageAdmin';

const CheckAdmin = () => {
    const [isAuthenticated, setAuthenticated] = useState(/* Your initial authentication state */);

    return (
        <Router>
            <Routes>
                {/* Các route khác */}

                {/* AuthenticatedRoute cho trang quản trị */}
                <AuthenticatedRoute
                    path="/PageAdmin"
                    element={<PageAdmin />}
                />
            </Routes>

        </Router>
    );
};

export default CheckAdmin;
