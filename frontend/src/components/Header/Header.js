import { useEffect } from "react";
import { Link } from "react-router-dom";
import ArgentBankLogo from "../../assets/argentBankLogo.webp";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../slices/loginSlice";
import { fetchUserProfile } from "../../slices/profileSlice";

function Header() {
  const token = useSelector((state) => state.loginSlice.token);
  const profileData = useSelector((state) => state.profileSlice.profileData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      // Charger le profil utilisateur au chargement initial de la page
      dispatch(fetchUserProfile(token));
    }
  }, [dispatch, token]);

  const handleSignOut = () => {
    // Dispatch de l'action logout pour déconnecter l'utilisateur
    dispatch(logout());
  };

  let displayUserName = "Chargement...";

  if (profileData && profileData.userName) {
    displayUserName = profileData.userName;
  }

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
          // Si un token est présent, affiche le nom d'utilisateur en tant que lien vers la page "/user"
          <Link to="/user" className="main-nav-item">
            {displayUserName + " "}
            <i className="fa fa-user-circle"></i>
          </Link>
        ) : (
          <Link to="./signin" className="main-nav-item">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        )}
        {token && (
          <Link onClick={handleSignOut} className="main-nav-item">
            Sign Out
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Header;
