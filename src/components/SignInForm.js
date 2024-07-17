import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function SignInForm() {
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      console.log(formData);

      if (response.ok) {
        // After successful submission, redirect to the new endpoint
        history.push("/email-verification-sent");
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("An unexpected error occurred");
    }
  };

  return (
    <div className="mb-5">
      <form className="group-form" onSubmit={handleSubmit}>
        {error && <div className="error">{error}</div>}
        <label>username:</label>
        <input
          className="input-form"
          type="text"
          name="username"
          value={formData.username}
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
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          required
        />
        <br />
        <label>Last Name:</label>
        <input
          className="input-form"
          type="text"
          name="lastname"
          value={formData.lastname}
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
