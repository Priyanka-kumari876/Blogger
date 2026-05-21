import "./Login.css";
import "../../Admin/Heading.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBlog } from "react-icons/fa6";

const Login = () => {
  const [state, setState] = useState("Login");
  //to save input filled data
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Login function
  const login = async () => {
    console.log("login", formData);
    // let responseData;
    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (response.ok && responseData.success) {
        localStorage.setItem("auth-token", responseData.token);
        window.location.replace("/");
      } else {
        alert(responseData.errors || responseData.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  const signup = async () => {
    console.log("signup", formData);

    try {
      const response = await fetch("http://localhost:4000/signup", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (response.ok && responseData.success) {
        // localStorage.setItem("auth-token", responseData.activationToken);
        alert(responseData.message);
        window.location.replace("/");
      } else {
        alert(responseData.errors || responseData.message);
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <>
      <div className="header">
            <div className="header-logo" style={{listStyle: "none"}}>
          <Link to={'/'} style={{ textDecoration: "none", color: "inherit" }}>  <FaBlog size={50}/></Link><h1>blogger</h1>
        </div>
      
      </div>
      <div className="loginsignup">
        <div className="container" style={{ padding: "0px" }}>
          {" "}
          <div className="loginleft"></div>
          <div className="loginsignup-container">
            <h1>{state}</h1>
            <div className="signup-field">
              {state === "Sign Up" ? (
                <input
                  type="text"
                  placeholder="Enter your Name "
                  name="username"
                  value={formData.username}
                  onChange={changeHandler}
                  required
                />
              ) : (
                <></>
              )}
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                value={formData.email}
                onChange={changeHandler}
                required
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={changeHandler}
                required
              />
            </div>
            <button
              onClick={() => {
                state === "Login" ? login() : signup();
              }}
            >
              Continue
            </button>
            {state === "Sign Up" ? (
              <p className="login">
                Already have an Accont ?
                <span
                  onClick={() => {
                    setState("Login");
                  }}
                >
                  <b>Login here</b>
                </span>
              </p>
            ) : (
              <p className="login">
                Create an account ?
                <span
                  onClick={() => {
                    setState("Sign Up");
                  }}
                >
                  <b>Click here </b>
                </span>
              </p>
            )}

            {/* <div className="agree">
              <input type="checkbox" name="" id="" />
              <p style={{ marginTop: "14px" }}>
                By continuing ,i agree to terms of use & privacy policy.
              </p>
            </div> */}
          </div>
          <div className="loginright"></div>
        </div>
      </div>
    </>
  );
};
export default Login;
