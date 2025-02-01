import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import * as jose from "jose";
import { AuthContext } from "../components/AuthContext";
import axios from "axios";
import "../styles/LogIn.css";

export default function LogIn() {
  const history = useHistory();

  function handleClick(path) {
    history.push(`/${path}`);
  }
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
              history.push("/my-piece-of-random-rainbow");
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
    <form onSubmit={handleSubmit} className="login-container">
      <label className="group-form">
        EMAIL:
        <input
          className="login-input"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br />
        PASSWORD:
        <input
          className="login-input"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </label>
      <input
        className="default-btn log-in-btn"
        type="submit"
        value={loading ? "Loading..." : "LOG IN"}
        disabled={loading}
      />
      {error && <p>{error}</p>}
      <div className="extra-btns">
        <button
          className="default-btn"
          onClick={() => handleClick("password-recovery")}
        >
          FORGOT MY PASSWORD
        </button>
        <button className="default-btn" onClick={() => handleClick("sign-in")}>
          CREATE ACCOUNT
        </button>
      </div>
    </form>
  );
}
