import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function SignInForm() {
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState(""); // New state for confirmPassword
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "confirmPassword") {
      setConfirmPassword(value); // Update confirmPassword state specifically
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }

    if (name === "confirmPassword" && value !== formData.password) {
      setPasswordError("Passwords do not match.");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Perform password confirmation check here
    if (formData.password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }
    console.log(JSON.stringify(formData)); // Now formData does not include confirmPassword
    try {
      const response = await fetch(
        "https://random-rainbow-database.onrender.com/api/v1/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData), // formData does not include confirmPassword
        }
      );
      console.log(response);

      if (!response.ok) {
        // Attempt to parse the response as JSON
        const errorData = await response.json();
        if (errorData && errorData.errorMessage) {
          // Use errorData.errorMessage instead of errorData.message
          setError(errorData.errorMessage);
          console.log(errorData.errorMessage);
        } else {
          // Fallback to a generic error message if the expected structure is not found
          setError("An unexpected error occurred. Please try again later.");
        }
      } else {
        history.push("/email-verification-sent");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("An unexpected error occurred");
    }
  };

  return (
    <div className="mb-5">
      <form className="group-form" onSubmit={handleSubmit}>
        <label>Username:</label>
        <input
          className="input-form"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <br />
        <label>New Password:</label>
        <input
          className="input-form"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <br />
        <label>Confirm Password:</label>
        <input
          className="input-form"
          type="password"
          name="confirmPassword"
          onChange={handleChange} // Removed value prop since it's managed separately
          required
        />
        <br />
        <label>First Name:</label>
        <input
          className="input-form"
          type="text"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          required
        />
        <br />
        <label>Last Name:</label>
        <input
          className="input-form"
          type="text"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          required
        />
        <br />
        <label>Email:</label>
        <input
          className="input-form"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br />
        <input type="submit" value="Sign Up" />
        {passwordError && <div className="error">{passwordError}</div>}
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}
