import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Action asynchrone pour la connexion
export const signInUser = createAsyncThunk(
  "authentification/signInUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.status === 200) {
        return { token: data.body.token };
      } else {
        return rejectWithValue("Erreur d'identifiants");
      }
    } catch (error) {
      return rejectWithValue("Erreur lors de la connexion");
    }
  }
);

const loginSlice = createSlice({
  name: "authentification",
  initialState: {
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      state.token = null;
      state.loading = false;
      state.error = null;
      window.location.reload();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
        state.error = null;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Une erreur s'est produite";
      });
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
