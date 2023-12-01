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

// Slice Redux pour gérer l'état du profil utilisateur
const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profileData: localStorage.getItem("profileData") || null,
    loading: false,
    error: null,
  },
  reducers: {
    // si besoin de gérer d'autres actions
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
        localStorage.setItem("profileData", JSON.stringify(action.payload));
      })
      .addCase(updateUsername.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Une erreur s'est produite";
      });
  },
});

export default profileSlice.reducer;
