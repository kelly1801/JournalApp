import {
  authSlice,
  checkingCredentials,
  login,
  logout,
} from "../../../src/store/auth/authSlice";
import {
  authState,
  demoUser,
  initialState,
  notAuthState,
} from "../../fixture/AuthFixtures";

describe("Test on AuthSlice", () => {
  test("should return initial state and call auth", () => {
    expect(authSlice.name).toBe("auth");
    const state = authSlice.reducer(initialState, {});
    expect(state).toEqual(initialState);
  });

  test("should auth the user", () => {
    const state = authSlice.reducer(initialState, login(demoUser));
    expect(state).toEqual({
      status: "auth",
      uid: demoUser.uid,
      email: demoUser.email,
      displayName: demoUser.displayName,
      photoURL: demoUser.photoURL,
    });
  });

  test("should logout user without errorMessage", () => {
    const state = authSlice.reducer(authState, logout());
    expect(state).toEqual({
      status: "not-auth",
      uid: notAuthState.uid,
      email: notAuthState.email,
      displayName: notAuthState.displayName,
      photoURL: notAuthState.photoURL,
    });
  });
  test("should logout user with errorMessage", () => {
    const errorMessage = "invalid email or password";
    const state = authSlice.reducer(initialState, logout({ errorMessage }));
    expect(state.errorMessage).toBe(errorMessage);
  });

  test("should change status to checking", () => {
    const state = authSlice.reducer(authState, checkingCredentials());
    expect(state.status).toBe("checking");
  });
});
