import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function SignInForm() {
    const history = useHistory();
    const [formData, setFormData] = useState({
        userName: '',
        password: '',
        firstName: '',
        lastName: '',
        email: ''
    });
    const [error, setError] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/api/register/processRegistrationForm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                // After successful submission, redirect to the new endpoint
                history.push('/email-verification-sent');
            } else {
                const errorData = await response.json();
                setError(errorData.message);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setError('An unexpected error occurred');
        }
    };

    return (
        <div className="mb-5">
            <form className="group-form" onSubmit={handleSubmit}>
                {error && <div className="error">{error}</div>}
                <label>Username:</label>
                <input
                    className="input-form"
                    type="text"
                    name="userName"
                    value={formData.userName}
                    onChange={handleChange}
                    required
                />
                <br />
                <label>Password:</label>
                <input
                    className="input-form"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <br />
                <label>First Name:</label>
                <input
                    className="input-form"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                />
                <br />
                <label>Last Name:</label>
                <input
                    className="input-form"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                />
                <br />
                <label>Email:</label>
                <input
                    className="input-form"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <br />
                <input type="submit" value="SIGN UP" />
            </form>
        </div>
    );
}
