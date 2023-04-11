export const initialState = {
  status: "checking", // | 'not-auth' | 'auth'
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
};

export const authState = {
  status: "auth",
  uid: "1234abc",
  email: "demo@gmail.com",
  displayName: "Demo user",
  photoURL: "https://demo.jpg",
  errorMessage: null,
};

export const notAuthState = {
  status: "not-auth",
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
};

export const demoUser = {
    uid: "1234abc",
    email: "demo@gmail.com",
    displayName: "Demo user",
    photoURL: "httos://demo.jpg",
}