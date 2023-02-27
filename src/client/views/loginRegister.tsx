import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { apiService } from "../services/apiService";
import { TOKENKEY } from "../services/apiService";

const LoginPage = () => {
  //const [isLoggingIn, setIsLoggingIn] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const nav = useNavigate();

  const handleLoginRegister = () => {
    const url = "/auth/login";
    //const url = isLoggingIn ? "/auth/login" : "/auth/register";

    const loginInfo = { email: userEmail, password: userPassword };

    //apiService needs the url, method, and data to send.
    //url changes where the data goes ie. login route, register route
    apiService(url, "POST", loginInfo)
      .then((data) => {
        // if (!isLoggingIn) {
        //   console.log(`Registered with userID ${data.id}`);
        // }

        localStorage.setItem(TOKENKEY, data.token);
        Swal.fire("Login successful").then(() => nav("/admin/items"));
      })
      .catch((error) => alert(error.message));
  };

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-12 col-md-5 mt-5 bg-white shadow p-3">
          {/* Currently {isLoggingIn ? "Logging in" : "Registering"} */}
          {/* <button onClick={() => setIsLoggingIn(!isLoggingIn)} type="button" className="btn btn-primary m-3">
            Switch to {!isLoggingIn ? "Login" : "Register"}
          </button> */}
          <div>
            <label>Username</label>
            <input className="form-control" type="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)}></input>
            <label>Password</label>
            <input className="form-control" type="password" value={userPassword} onChange={(e) => setUserPassword(e.target.value)}></input>
            <button onClick={() => handleLoginRegister()}>Login</button>
            {/* <button onClick={() => handleLoginRegister()}>{isLoggingIn ? "Login" : "Register"}</button> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
