import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import "../App.css";
import HeaderUserOn from "../components/HeaderUserOn";
import HeaderUserOff from "../components/HeaderUserOff";
import { AuthContext } from "../components/AuthContext";

export default function PasswordRecovery() {
  const { accessToken } = useContext(AuthContext);
  const history = useHistory();
  const [formData, setFormData] = useState({ email: "" });
  const [loading, setLoading] = useState(false); // State to manage loading status

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Start loading

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        alert("Password reset email sent!");
        // Redirect to /welcome after successful password reset email send
        history.push("/welcome");
      } else {
        alert("Failed to send password reset email.");
      }
    } catch (error) {
      console.error("Error sending password reset email:", error);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        {accessToken && accessToken !== "" ? (
          <HeaderUserOn />
        ) : (
          <HeaderUserOff />
        )}
        <form onSubmit={handleSubmit}>
          <label className="group-form">
            Email:
            <input
              className="input-form"
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <input
            className="default-btn special-btn"
            type="submit"
            value={loading ? "Sending..." : "Send Reset Email"} // Display loading message if in loading state
            disabled={loading} // Disable button while loading
          />
        </form>
        {loading && <p>Loading...</p>} {/* Show loading message */}
      </header>
    </div>
  );
}
