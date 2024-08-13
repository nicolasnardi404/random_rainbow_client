import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import * as jose from "jose";
import { AuthContext } from "./AuthContext";

export default function LogInForm() {
  const history = useHistory();
  const {
    setRefreshTokenLocal,
    setAccessTokenLocal,
    setRole,
    setId,
    setUsername,
  } = useContext(AuthContext);

  const [formData, setFormData] = useState({
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

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/auth/authenticate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const contentType = response.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
          const responseData = await response.json();

          if (responseData.accessToken) {
            try {
              const decodedToken = jose.decodeJwt(responseData.accessToken);

              setAccessTokenLocal(responseData.accessToken);
              setRefreshTokenLocal(responseData.refreshToken);
              setRole(decodedToken.role);
              setId(decodedToken.userId);
              setUsername(decodedToken.sub);

              // Redirect to another page
              history.push("/videos");
            } catch (err) {
              // Handle decoding errors
              setError("Invalid token format");
            }
          } else {
            throw new Error("Token not received");
          }
        } else {
          throw new Error(`Expected JSON but got ${contentType}`);
        }
      } else {
        // Handle HTTP errors
        const errorMessage = await response.text();
        setError(`Server error: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error on log in:", error);
      setError("An unexpected error occurred");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label className="group-form">
        Email:
        <input
          className="input-form"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br />
        Password:
        <input
          className="input-form"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <input type="submit" value="LOG IN" />
      {error && <p>{error}</p>}
    </form>
  );
}
