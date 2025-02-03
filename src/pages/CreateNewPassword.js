import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import "../App.css";
import axios from "axios";

export default function PasswordRecovery() {
  const history = useHistory();
  const { token } = useParams();
  const [showModal, setShowModal] = useState(false);
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

  const handleModalClose = () => {
    setShowModal(false);
    history.push("/log-in");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/new-password/${token}`,
        { password: formData.password }
      );

      if (!response.error) {
        setShowModal(true); // Show modal instead of alert
      } else {
        alert("Failed to update password.");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      alert("An error occurred while updating your password.");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
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
          {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
          <input
            className="default-btn special-btn"
            type="submit"
            value="CHANGE PASSWORD"
          />
        </form>

        {showModal && (
          <div className="modal-overlay" onClick={handleModalClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2>Success!</h2>
              <p>Your password has been successfully updated.</p>
              <div className="modal-buttons">
                <button
                  className="modal-btn confirm"
                  onClick={handleModalClose}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
