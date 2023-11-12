import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, loginFailure } from "../../slices/loginSlice";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const dispatch = useDispatch();
  const isConnected = useSelector((state) => state.loginSlice.isConnected);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async (e) => {
    e.preventDefault();

    try {
      console.log("Request Data:", JSON.stringify({ email, password }));
      const response = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      console.log("Server Response:", response);
      const data = await response.json();

      if (response.status === 200) {
        dispatch(loginSuccess({ token: data.body.token }));
        navigate("/user");
      } else {
        dispatch(loginFailure());
      }
    } catch (error) {
      console.error("Error during login:", error);
      dispatch(loginFailure());
    }
  };

  return (
    <div className="Signin">
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form onSubmit={signIn}>
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <button type="submit" className="sign-in-button">
              Sign In
            </button>
            {isConnected === false ? <p>Erreur d'identifiants</p> : null}
          </form>
        </section>
      </main>
    </div>
  );
}

export default SignIn;
