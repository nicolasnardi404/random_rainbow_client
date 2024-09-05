import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import * as jose from "jose";
import { AuthContext } from "./AuthContext";
import axios from "axios";

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
  const [loading, setLoading] = useState(false); // Add loading state

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/authenticate`,
        formData
      );
      console.log(response);

      if (response.status === 200) {
        const contentType = response.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
          console.log(response);
          if (response.data.accessToken) {
            try {
              const decodedToken = jose.decodeJwt(response.data.accessToken);

              setAccessTokenLocal(response.data.accessToken);
              setRefreshTokenLocal(response.data.refreshToken);
              setRole(decodedToken.role);
              setId(decodedToken.userId);
              setUsername(decodedToken.sub);

              // Redirect to another page
              history.push("/videos");
            } catch (err) {
              setError("Invalid token format");
            }
          } else {
            throw new Error("Token not received");
          }
        } else {
          throw new Error(`Expected JSON but got ${contentType}`);
        }
      } else {
        setError(`Server error`);
      }
    } catch (error) {
      console.error("Error on log in:", error);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false); // End loading
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
      <input
        className="default-btn special-btn"
        type="submit"
        value={loading ? "Loading..." : "LOG IN"} // Show loading text
        disabled={loading} // Disable button when loading
      />
      {error && <p>{error}</p>}
    </form>
  );
}
