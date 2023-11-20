import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUsername,
  setEditedUsername,
  setEditError,
  setOpenFormEdit,
} from "../../slices/profileSlice";

const EditUsername = () => {
  const dispatch = useDispatch();
  const profileData = useSelector((state) => state.profileSlice.profileData);
  const editedUsername = useSelector(
    (state) => state.profileSlice.editedUsername
  );
  const editError = useSelector((state) => state.profileSlice.editError);
  const token = useSelector((state) => state.loginSlice.token);

  useEffect(() => {
    if (profileData.userName) {
      dispatch(setEditedUsername(profileData.userName)); // Met le pseudo actuel de l'utilisateur comme valeur de editedUsername
    }
  }, [dispatch, profileData.userName]);

  const handleUsernameChange = (e) => {
    dispatch(setEditedUsername(e.target.value)); // Met à jour le nom d'utilisateur édité dans le store Redux comme valeur d'editedUsername
    dispatch(setEditError(""));
  };

  const formSubmit = async (e) => {
    e.preventDefault(); // evite le rechargement de la page
    if (!editedUsername) {
      dispatch(setEditError("Le champ ne peut pas être vide."));
      return;
    }
    try {
      await dispatch(updateUsername({ token, newUsername: editedUsername }));
      // envoi avec le fetch en put le nouveau nom entré par l'utilisateur à partir de la valeur editedUsername, token en argument pour l'authentification
      dispatch(setOpenFormEdit(false));
    } catch (error) {
      console.error(error);
    }
  };

  const cancelEdit = () => {
    dispatch(setOpenFormEdit(false)); // Pour refermer l'éditeur
  };

  return (
    <form onSubmit={formSubmit}>
      <div>
        <label>
          <p>Username:</p>
          <input
            type="text"
            name="username"
            onChange={handleUsernameChange}
            value={editedUsername || ""}
            required
          />
        </label>
        {editError && <div>{editError}</div>}
      </div>
      <div>
        <label>
          <p>First Name:</p>
          <input
            type="text"
            name="firstName"
            defaultValue={profileData?.firstName || ""}
            readOnly
            disabled
          />
        </label>
      </div>
      <div>
        <label>
          <p>Last Name:</p>
          <input
            type="text"
            name="lastName"
            defaultValue={profileData?.lastName || ""}
            readOnly
            disabled
          />
        </label>
      </div>
      <div>
        <button className="editUsernameButton" type="submit">
          Save
        </button>
        <button
          className="editUsernameButton"
          type="button"
          onClick={cancelEdit}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditUsername;
