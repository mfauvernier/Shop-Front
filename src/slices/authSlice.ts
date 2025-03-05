export interface AuthState {
  user: { username: string; email: string; password: string } | null;
  token: string | null;
  admin: boolean;
  login: (
    user: { username: string; email: string; password: string },
    token: string,
  ) => void;
  logout: () => void;
}

export const authSlice = (
  set: (fn: (state: AuthState) => void) => void,
): AuthState => ({
  user: null,
  admin: false,
  token: localStorage.getItem("token"),
  login: (user, token) => {
    localStorage.setItem("token", token);
    set((state) => {
      state.user = user;
      state.token = token;
      state.admin = !state.admin;
    });
  },
  logout: () => {
    localStorage.removeItem("token");
    set((state) => {
      state.user = null;
      state.token = null;
    });
  },
});
