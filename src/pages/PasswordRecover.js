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

  const handleChange = (event) => {
    const { name, value } = event.target;
    // Correctly spread the previous state
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
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
        console.log(formData);
        alert("Failed to send password reset email.");
      }
    } catch (error) {
      console.error("Error sending password reset email:", error);
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
            value="LOG IN"
          />
        </form>
      </header>
    </div>
  );
}
