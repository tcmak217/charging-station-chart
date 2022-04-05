import React, { useEffect, useState } from "react";
import moment from "moment";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

function FetchData({ csvJson, handleSetCsvJson }) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleFetch = async (e) => {
    e.preventDefault();
    let token;
    setIsLoading(true);
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
        const parsedData = res.data.data.contents
          .filter(
            (row) =>
              (row[1] === "1_1") |
              (row[1] === "1_2") |
              (row[1] === "1_3") |
              (row[1] === "1_4")
          )
          .map((row) => {
            return {
              Date: moment(row[0], "YYYY-MM-DD hh:mm:ss").format(),
              ID: row[1],
              "Current Sum(A)": row[11].toString(),
            };
          });
        handleSetCsvJson(parsedData);
        console.log(res.data.data.contents);
        console.log(parsedData);
      });
    setIsLoading(false);
  };

  useEffect(() => {
    // console.log("userName", userName);
    // console.log("password", password);
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
        {isLoading ? <CircularProgress /> : null}
      </form>
    </div>
  );
}

export default FetchData;
