// AdminLogin.js
import React, { useState } from 'react';

const AdminLogin = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (username === phucne && password === 123) {

        }

    };

    return (
        <div>
            <h2>Admin Login</h2>
            <form>
                <label>
                    Username:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <br />
                <button type="button" onClick={handleLogin}>
                    Login
                </button>
            </form>
        </div>
    );
};

export default AdminLogin;
