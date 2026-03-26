export const initialStore = () => {
  return {
    message: null,
    token: localStorage.getItem("token") || null,
    user: null,
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_token":
      return {
        ...store,
        token: action.payload,
      };

    case "set_user":
      return {
        ...store,
        user: action.payload,
      };

    case "set_message":
      return {
        ...store,
        message: action.payload,
      };

    case "set_hello":
      return {
        ...store,
        message: action.payload,
      };

    default:
      throw Error("Unknown action.");
  }
}

export const actions = (dispatch, getStore) => ({
  signup: async (email, password) => {
    try {
      const resp = await fetch(
        import.meta.env.VITE_BACKEND_URL + "/api/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        },
      );

      if (!resp.ok) throw new Error("Signup failed");

      return true;
    } catch (error) {
      console.error("Signup error:", error);
      return false;
    }
  },

  login: async (email, password) => {
    try {
      const resp = await fetch(
        import.meta.env.VITE_BACKEND_URL + "/api/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        },
      );

      if (!resp.ok) throw new Error("Invalid credentials");

      const data = await resp.json();

      localStorage.setItem("token", data.token);
      dispatch({ type: "set_token", payload: data.token });

      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    dispatch({ type: "set_token", payload: null });
    dispatch({ type: "set_user", payload: null });
  },

  getPrivateData: async () => {
    try {
      const store = getStore();

      const resp = await fetch(
        import.meta.env.VITE_BACKEND_URL + "/api/private",
        {
          headers: {
            Authorization: "Bearer " + store.token,
          },
        },
      );

      if (!resp.ok) throw new Error("Unauthorized");

      const data = await resp.json();
      dispatch({ type: "set_user", payload: data.user });

      return data;
    } catch (error) {
      console.error("Private route error:", error);
      return null;
    }
  },
});
