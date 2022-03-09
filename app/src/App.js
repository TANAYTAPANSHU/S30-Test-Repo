import logo from "./logo.svg";
import "./App.css";
import React from "react";

function App() {
  const [user, setUser] = React.useState([]);
  const [userDetail, setUserDetail] = React.useState({
    name: "",
    email: "",
  });
  const axios = require("axios");

  async function fetchUser() {
    axios
      .get("https://randomuser.me/api")
      .then((res) => {
        setUser(res.data?.results);
        setUserDetail({
          name:
            res.data?.results[0]?.name?.title +
            " " +
            res.data?.results[0]?.name?.first +
            " " +
            res.data?.results[0]?.name?.last,
          email: res.data?.results[0]?.email,
        });
        localStorage.setItem("Name", userDetail.name);
        localStorage.setItem("Email", userDetail.email);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }
  React.useEffect(() => {
    fetchUser();
  }, []);

  React.useEffect(() => {
    // storing input name
    localStorage.setItem("Name", userDetail.name);
    localStorage.setItem("Email", userDetail.email);
  }, [userDetail]);

  return (
    <div className="App">
      {!user ? (
        <>
          <h1
            style={{
              color: "white",
            }}
          >
            <i>Loading .....</i>
          </h1>
        </>
      ) : (
        <>
          <h1
            style={{
              color: "white",
            }}
          >
            <i>User Details</i>
          </h1>
          <div
            className="userDetail"
            style={{
              backgroundColor: "white",
              width: "25%",
              marginLeft: "auto",
              marginRight: "auto",
              padding: "10px",
              borderRadius: "10px",
                  marginBlock: "50px"
            }}
          >
            <h4 style={{ color: "black" }}>{userDetail.name}</h4>

            <h4 style={{ color: "black" }}>{userDetail.email}</h4>
          </div>
          <h3
            onClick={fetchUser}
            className="refreshButton"
            style={{
              color: "white",
              cursor: "pointer",
            }}
          >
            <i>Refresh</i>
          </h3>
        </>
      )}
    </div>
  );
}

export default App;
