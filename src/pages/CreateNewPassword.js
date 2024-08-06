import HeaderUserOn from "../components/HeaderUserOn";
import HeaderUserOff from "../components/HeaderUserOff";
import { AuthContext } from "../components/AuthContext";
import React, { useContext, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import "../App.css";

export default function PasswordRecovery() {
  const { authToken } = useContext(AuthContext);

  const history = useHistory();
  const { token } = useParams();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState(""); // State to manage password mismatch error

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Real-time validation for password match
    if (name === "confirmPassword" && value !== formData.password) {
      setPasswordError("Passwords do not match.");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `https://random-rainbow-database.onrender.com/api/v1/auth/new-password/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            newPassword: formData.password,
          }),
        }
      );
      console.log(formData.password);
      if (response.ok) {
        alert("Password successfully updated!");
        history.push("/log-in"); // Redirect to login page after success
      } else {
        alert("Failed to update password.");
      }
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        {authToken && authToken !== "" ? <HeaderUserOn /> : <HeaderUserOff />}
        <form onSubmit={handleSubmit}>
          <label className="group-form">
            NEW PASSWORD:
            <input
              className="input-form"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            CONFIRM PASSWORD:
            <input
              className="input-form"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </label>
          {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}{" "}
          {/* Display error message if passwords don't match */}
          <input type="submit" value="CHANGE PASSWORD" />
        </form>
      </header>
    </div>
  );
}
