import React, { useState } from "react";
import axios from "axios";

function Login({ handleSetToken, handleSetIsTokenExist, isTokenExist }) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [isLoginButtonClick, setIsLoginButtonClick] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    await axios
      .post("https://open.delightintl.com/api/auth/login", {
        username: userName,
        cipherCode: password,
      })
      .then((res) => {
        if (res.data.status === 1) {
          handleSetIsTokenExist(true);
          handleSetToken(res.data.data.jwt.access_token);
        } else if (res.data.status === 0) {
          handleSetIsTokenExist(false);
        }
      });
    setIsLoginButtonClick(true);
  };

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
      {isLoginButtonClick ? (
        isTokenExist ? (
          <span>Login Succeeded</span>
        ) : (
          <span>Login Failed</span>
        )
      ) : null}
    </div>
  );
}

export default Login;
