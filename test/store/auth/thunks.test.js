import {
  checkingCredentials,
  login,
  logout,
} from "../../../src/store/auth/authSlice";
import {
  checkingAuth,
  startCreatingUser,
  startGoogleSignIn,
  startLoginWithEmailAndPassword,
  startLogout,
} from "./../../../src/store/auth/thunks";
import { demoUser } from "../../fixture/AuthFixtures";
import {
  loginWithWithEmailAndPassword,
  logoutFirebase,
  registerUserWithEmailAndPassword,
  signInWithGoogle,
} from "./../../../src/firebase/providers";
import { clearNotesOnLogout } from "../../../src/store/journal/journalSlice";
jest.mock("../../../src/firebase/providers");
describe("Test on authThunks", () => {
  dispatch = jest.fn();
  beforeEach(() => jest.clearAllMocks());

  test("should invoke checking credentials", async () => {
    await checkingAuth()(dispatch); //currying
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
  });

  test("startGoogleSignIn should call checking credential and login", async () => {
    const loginData = { ok: true, ...demoUser };
    await signInWithGoogle.mockResolvedValue(loginData);

    await startGoogleSignIn()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test("startGoogleSignIn should call checking credential and logour with error message", async () => {
    const loginData = { ok: false, errorMessage: "Unknown error" };
    await signInWithGoogle.mockResolvedValue(loginData);
    await startGoogleSignIn()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage));
  });

  test("startLoginWithEmailAndPassword should call checkingCredential and login", async () => {
    const loginData = { ok: true, ...demoUser };
    const formData = { email: demoUser.email, password: "123456" };
    await loginWithWithEmailAndPassword.mockResolvedValue(loginData);
    await startLoginWithEmailAndPassword(formData)(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(demoUser));
  });

  test("startCreatingUserWithEmailAndPassword should call checking credentials and login", async () => {
    const testUser = {
      email: demoUser.email,
      password: "123456",
      displayName: demoUser.displayName,
    };
    const respUser = {
      demoUser,
      ok: true,
      errorMessage: null,
    };

    await registerUserWithEmailAndPassword.mockResolvedValue(respUser);
    await startCreatingUser(testUser)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    //expect(dispatch).toHaveBeenCalledWith(login(testUser));
  });

  test("startLogout should call logoutFirebase, clearNotes and logout", async () => {
    await startLogout()(dispatch);
    expect(logoutFirebase).toHaveBeenCalled();

    expect(dispatch).toHaveBeenCalledWith(clearNotesOnLogout());
    expect(dispatch).toHaveBeenCalledWith(logout({ errorMessage: null }));
  });
});
