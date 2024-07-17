import React, { useState } from "react";
import Dragbtn from "../components/Dragbtn";
import { useHistory } from "react-router-dom";
import "../App.css";
import { faUserAstronaut } from "@fortawesome/free-solid-svg-icons";
import DragIcon from "../components/DragIcon";

export default function PasswordRecovery() {
  const history = useHistory();
  const [formData, setFormData] = useState({ email: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDoubleClick = (path) => {
    history.push(`/${path}`);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/auth/reset-password",
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
        <a href="/welcome" className="app-title">
          RANDOM RAINBOW
        </a>
        <div className="icons-group">
          <Dragbtn
            name="back to homepage"
            onDoubleClick={() => handleDoubleClick("")}
          />
        </div>
        <div className="icons-style">
          <DragIcon icon={faUserAstronaut} />
        </div>
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
          <input type="submit" value="LOG IN" />
        </form>
      </header>
    </div>
  );
}
