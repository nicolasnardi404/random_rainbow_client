import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import SignInForm from "../components/SignInForm";
import HeaderUserOn from "../components/HeaderUserOn";
import HeaderUserOff from "../components/HeaderUserOff";
import { AuthContext } from "../components/AuthContext";

const SignIn = () => {
  const history = useHistory();
  const { authToken } = useContext(AuthContext);

  function handleDoubleClick(path) {
    history.push(`/${path}`);
  }

  return (
    <div className="App">
      <header className="App-header">
        {authToken && authToken !== "" ? <HeaderUserOn /> : <HeaderUserOff />}
        <SignInForm />
      </header>
    </div>
  );
};

export default SignIn;
