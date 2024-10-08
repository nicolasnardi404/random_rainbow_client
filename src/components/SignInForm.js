import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function SignInForm() {
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "confirmPassword" && value !== formData.password) {
      setPasswordError("Passwords do not match.");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }
    console.log("hey");

    setLoading(true); // Start loading

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/register`,
        formData
      );

      history.push("/email-verification-sent");
    } catch (error) {
      console.error("Error submitting form:", error);
      setError(error.response.data.errorMessage);
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="mb-5">
      {loading ? ( // Display loading message if loading is true
        <div className="special-title" style={{ border: "none" }}>
          Loading...
        </div>
      ) : (
        // Otherwise, display the form
        <form className="group-form" onSubmit={handleSubmit}>
          <label>Username:</label>
          <input
            className="input-form"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <br />
          <label>New Password:</label>
          <input
            className="input-form"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <br />
          <label>Confirm Password:</label>
          <input
            className="input-form"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
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
          <input
            className="default-btn special-btn"
            type="submit"
            value="Sign Up"
          />
          {passwordError && <div className="error">{passwordError}</div>}
          {error && <div className="error">{error}</div>}
        </form>
      )}
    </div>
  );
}
