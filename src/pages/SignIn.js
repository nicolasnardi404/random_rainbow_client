import React from "react";
import { useHistory } from "react-router-dom";
import SignInForm from "../components/SignInForm";

const SignIn = () => {
  const history = useHistory();

  function handleDoubleClick(path) {
    history.push(`/${path}`);
  }

  return (
    <div className="App">
      <header className="App-header">
        <SignInForm />
      </header>
    </div>
  );
};

export default SignIn;
