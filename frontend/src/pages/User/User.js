import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile, setOpenFormEdit } from "../../slices/profileSlice";
import { Navigate } from "react-router-dom";
import EditUsername from "../../components/EditUsername/EditUsername";

function User() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.loginSlice.token);
  const profileData = useSelector((state) => state.profileSlice.profileData);
  const openFormEdit = useSelector((state) => state.profileSlice.openFormEdit);

  useEffect(() => {
    if (token) {
      dispatch(fetchUserProfile(token)); // si token alors enclenche action récup data user
    }
  }, [dispatch, token]); // dépendance pour retrigger l'effect en cas de changement du token

  if (!token) {
    return <Navigate to="/signin" />;
  }

  let displayName = "Chargement...";

  if (profileData && profileData.firstName && profileData.lastName) {
    displayName = profileData.firstName + " " + profileData.lastName;
  }

  const handleEditClick = () => {
    dispatch(setOpenFormEdit(true));
  };

  return (
    <div className="User">
      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back
            <br />
            {displayName}
          </h1>
          {!openFormEdit && (
            <button className="edit-button" onClick={handleEditClick}>
              Edit Name
            </button>
          )}
        </div>
        {openFormEdit && <EditUsername setOpenFormEdit={setOpenFormEdit} />}
        <h2 className="sr-only">Accounts</h2>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default User;
