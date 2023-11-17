import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profileData: localStorage.getItem("profileData") || null,
    loading: false,
    error: null,
  },
  reducers: {
    clearProfileData: (state) => {
      state.profileData = null;
    },
  },
  extraReducers: (builder) => {
    builder
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
      });
  },
});

export const { clearProfileData } = profileSlice.actions;
export default profileSlice.reducer;
