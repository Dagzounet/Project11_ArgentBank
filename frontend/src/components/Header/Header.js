import React from "react";
import { Link } from "react-router-dom";
import ArgentBankLogo from "../../assets/argentBankLogo.png";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../slices/loginSlice";

function Header() {
  const token = useSelector((state) => state.loginSlice.token);
  const dispatch = useDispatch();

  const handleSignOut = () => {
    // Dispatch de l'action logout pour déconnecter l'utilisateur
    dispatch(logout());
  };

  return (
    <nav className="main-nav">
      <Link to="./" className="main-nav-logo">
        <img
          className="main-nav-logo-image"
          src={ArgentBankLogo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {token ? (
          // Si un token est présent, affiche le lien "Sign Out"
          <Link onClick={handleSignOut} className="main-nav-item">
            <i className="fa fa-user-circle"></i>
            Sign Out
          </Link>
        ) : (
          // Sinon, affiche le lien "Sign In"
          <Link to="./signin" className="main-nav-item">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Header;
