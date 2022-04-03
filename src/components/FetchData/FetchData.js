import React, { useEffect, useState } from "react";
import axios from "axios";

function FetchData() {
  const [userName, setUserName] = useState("cec-evc-admin");
  const [password, setPassword] = useState("admin");
  const handleFetch = async (e) => {
    e.preventDefault();
    let token;
    await axios
      .post("https://open.delightintl.com/api/auth/login", {
        username: userName,
        cipherCode: password,
      })
      .then((res) => {
        token = res.data.data.jwt.access_token;
      });
    await axios
      .post(
        "https://open.delightintl.com/api/device-status/query",
        {
          type: "4",
          projectId: 30013,
          startDate: "2021-12-27T16:00:00.000Z",
          endDate: "2021-12-28T16:00:00.000Z",
          areas: [],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data.data.contents);
      });
  };

  useEffect(() => {
    console.log("userName", userName);
    console.log("password", password);
  }, [userName, password]);

  return (
    <div>
      <form>
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
        <button onClick={handleFetch}>Fetch data</button>
      </form>
    </div>
  );
}

export default FetchData;
