import React, { useEffect, useState } from "react";
import axios from "axios";

function Login({ handleSetToken }) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    await axios
      .post("https://open.delightintl.com/api/auth/login", {
        username: userName,
        cipherCode: password,
      })
      .then((res) => {
        handleSetToken(res.data.data.jwt.access_token);
      });
  };

  useEffect(() => {
    console.log("userName", userName);
    console.log("password", password);
  }, [userName, password]);

  return (
    <div>
      <label htmlFor="userName">Username: </label>
      <input
        type="text"
        name="userName"
        id="userName"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <br></br>
      <label htmlFor="password">Password: </label>
      <input
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br></br>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
