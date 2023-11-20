import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Action asynchrone pour récupérer le profil utilisateur depuis API
export const fetchUserProfile = createAsyncThunk(
  "profile/fetchUserProfile",
  async (token, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/user/profile",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();

      if (response.status === 200) {
        return data.body;
      } else {
        return rejectWithValue("Erreur lors de la récupération du profil");
      }
    } catch (error) {
      return rejectWithValue("Erreur lors de la récupération du profil");
    }
  }
);

// Action pour charger le profil utilisateur lors du chargement de la page (username Header)
export const loadUserProfileOnPageLoad = (token) => async (dispatch) => {
  try {
    if (token) {
      // Dispatch de l'action fetchUserProfile pour charger les données du profil utilisateur
      await dispatch(fetchUserProfile(token));
    }
  } catch (error) {
    console.error("Erreur lors du chargement du profil:", error);
  }
};

// Action asynchrone pour mettre à jour le nom d'utilisateur
export const updateUsername = createAsyncThunk(
  "profile/updateUsername",
  async ({ token, newUsername }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/user/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userName: newUsername }),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour du nom d'utilisateur");
      }

      return data.body;
    } catch (error) {
      return rejectWithValue(
        "Erreur lors de la mise à jour du nom d'utilisateur"
      );
    }
  }
);

// Slice Redux pour gérer l'état du profil utilisateur (+ form utilisateur + modif username)
const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profileData: localStorage.getItem("profileData") || null,
    loading: false,
    error: null,
    openFormEdit: false,
    editedUsername: "", // Pour gérer le nouvel username
    editError: "", // Pour gérer erreur champ vide
  },
  reducers: {
    // Reducers pour mettre à jour les différents state
    setOpenFormEdit(state, action) {
      state.openFormEdit = action.payload;
    },
    setEditedUsername(state, action) {
      state.editedUsername = action.payload;
    },
    setEditError(state, action) {
      state.editError = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Reducers supplémentaires spécifiques aux actions asynchrones
    builder
      //partie fetchUserProfile
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profileData = action.payload;
        state.error = null;
        localStorage.setItem("profileData", JSON.stringify(action.payload));
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Une erreur s'est produite";
      })
      // partie updateUsername
      .addCase(updateUsername.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUsername.fulfilled, (state, action) => {
        state.loading = false;
        state.profileData = action.payload;
        state.error = null;
        state.editedUsername = ""; // Réinitialise le username après validation
        state.editError = ""; // Réinitialise l'erreur de champ vide du username après validation
        localStorage.setItem("profileData", JSON.stringify(action.payload));
      })
      .addCase(updateUsername.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Une erreur s'est produite";
      });
  },
});

export const { setOpenFormEdit, setEditedUsername, setEditError } =
  profileSlice.actions;
export default profileSlice.reducer;
