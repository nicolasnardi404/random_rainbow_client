import React, { useContext } from "react";
import "../App.css";
import RandomVideoCard from "../components/RandomVideoCard";
import HeaderUserOn from "../components/HeaderUserOn";
import HeaderUserOff from "../components/HeaderUserOff";
import { AuthContext } from "../components/AuthContext";

const Home = () => {
  const { authToken } = useContext(AuthContext);

  return (
    <div className="App">
      <header className="App-header">
        {authToken && authToken !== "" ? <HeaderUserOn /> : <HeaderUserOff />}
        <RandomVideoCard />
      </header>
    </div>
  );
};

export default Home;
