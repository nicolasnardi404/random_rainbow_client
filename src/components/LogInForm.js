import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as jose from 'jose';

export default function LogInForm() {
    const history = useHistory();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/api/v1/auth/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            console.log('Response:', response);

            if (response.ok && response.headers.get("content-type")?.includes("application/json")) {
                const responseData = await response.json();
                console.log('Response Data:', responseData.token);

                if (responseData.token) {
                    // Decode the JWT token using jose
                    const decodedToken = jose.decodeJwt(responseData.token);
                    console.log('Decoded Token:', decodedToken);

                    // Extract userId from the decoded token
                    const userId = decodedToken.userId;
                    console.log('User ID:', userId);
                    const username = decodedToken.sub;

                    // Store the userId in local storage
                    localStorage.setItem('userId', userId);
                    localStorage.setItem('username', username);

                    // Assuming successful authentication, redirect or show success message
                    history.push('/videos');
                } else {
                    throw new Error('Token not received');
                }
            } else {
                const contentType = response.headers.get("content-type");
                let errorMessage = 'Server error';
                if (contentType && !contentType.includes('application/json')) {
                    errorMessage += `, expected JSON but got ${contentType}`;
                }
                setError(errorMessage);
            }
        } catch (error) {
            console.error('Error on log in:', error);
            setError('An unexpected error occurred');
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label className="group-form">
                Email:
                <input className="input-form"
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required />
                <br></br>
                Password:
                <input className="input-form"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required />
            </label>
            <br></br>
            <input type="submit" value="LOG IN" />
            {error && <p>{error}</p>}
        </form>
    );
}
