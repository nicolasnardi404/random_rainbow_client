import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../App.css";
import axios from "axios";

export default function PasswordRecovery() {
  const history = useHistory();
  const [formData, setFormData] = useState({ email: "" });
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false); // Add modal state

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/reset-password`,
        formData
      );
      if (response.status === 200) {
        setShowModal(true);
        setLoading(false);
        // Remove the immediate redirect
      } else {
        alert("Failed to send password reset email.");
      }
    } catch (error) {
      console.error("Error sending password reset email:", error);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    history.push("/home/0");
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
            className="default-btn create-account-btn"
            type="submit"
            value={loading ? "Sending..." : "RESET PASSWORD"}
            disabled={loading}
          />
        </form>
        {loading && <p>Loading...</p>}

        {/* Add Modal */}
        {showModal && (
          <div className="modal-overlay" onClick={handleModalClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2>Success!</h2>
              <p>Password reset email sent! </p>
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
