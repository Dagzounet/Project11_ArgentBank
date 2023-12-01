import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInUser } from "../../slices/loginSlice";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.loginSlice); // selector récupère l'état global des valeurs du store
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async (e) => {
    e.preventDefault();

    try {
      await dispatch(signInUser({ email, password }));
      navigate("/user");
    } catch (error) {
      console.error("Error during login:", error);
      // signInUser gère les erreurs
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
            {loading && <p>Chargement...</p>}
            {error && <p>{error}</p>}
          </form>
        </section>
      </main>
    </div>
  );
};

export default SignIn;
