import React, { useState } from "react";
import "./loginStyles.css";
import axios from "axios";

export default function Login() {
  const [userEmail, setUserEmail] = useState();
  const [UserPassword, setUserPassword] = useState();

  const onSubmit = () => {
    const userObject = {
      email: userEmail,
      password: UserPassword,
    };

    if (userEmail == "admin@gmail.com" && UserPassword) {
      axios
        .post(
          "https://travel-buddy-research.herokuapp.com/user/login",
          userObject
        )
        .then((response) => {
          console.log(response.data);

          if (
            userEmail === "admin@gmail.com" &&
            response.data.message === "Login Successful"
          ) {
            sessionStorage.setItem("userActiveStatus", "active");
            window.location = "/admin-landing";
          } else {
            alert("Invalid User !");
          }
        })
        .catch((err) => console.log("Login error - " + err));
    } else {
      alert("Invaild email or Password !");
    }
  };

  return (
    <div className="Auth-form-container container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Admin Login</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              onChange={(e) => {
                setUserEmail(e.target.value);
              }}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              onChange={(e) => {
                setUserPassword(e.target.value);
              }}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => onSubmit()}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
