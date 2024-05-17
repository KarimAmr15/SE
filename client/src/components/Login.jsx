import React, { useState } from 'react';

const Login = ({ setUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        // Perform login API call
        const response = await fetch('/Login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ mail: email, password: password })
        });
        const data = await response.json();

        if (response.ok) {
            setUser(data.user); // Update the user context
            // Redirect or perform any other actions
        } else {
            // Handle login error
        }
    };

    return (
        <div>
            {/* Login form */}
        </div>
    );
};

export default Login;
