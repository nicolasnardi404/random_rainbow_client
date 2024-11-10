import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../App.css";
import axios from "axios";

export default function PasswordRecovery() {
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
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/reset-password`,
        formData
      );
      if (response.status === 200) {
        alert("Password reset email sent!");
        // Redirect to /home/0 after successful password reset email send
        history.push("/home/0");
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
            className="default-btn log-in-btn"
            type="submit"
            value={loading ? "Sending..." : "RESET PASSWORD"} // Display loading message if in loading state
            disabled={loading} // Disable button while loading
          />
        </form>
        {loading && <p>Loading...</p>} {/* Show loading message */}
      </header>
    </div>
  );
}
