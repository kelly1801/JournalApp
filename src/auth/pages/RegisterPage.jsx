import { useState, useMemo } from "react";
import {
  Grid,
  TextField,
  Link,
  Button,
  Typography,
  Alert,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { isValidEmail, isValidLength } from "../../helpers/validationHelpers";
import AuthLayout from "../layout/AuthLayout";
import { useDispatch, useSelector } from "react-redux";
import { startCreatingUser } from "../../store/auth/thunks";
const formData = {
  email: "",
  password: "",
  displayName: "",
};

const formValidations = {
  email: [(email) => isValidEmail(email), "has to be a valid email"],
  password: [
    (password) => isValidLength(password, 6),
    "Password must be at least 6 chars long",
  ],
  displayName: [
    (displayName) => isValidLength(displayName, 1),
    "Name is required",
  ],
};

export const RegisterPage = () => {
  const [isSubmited, setIsSubmited] = useState(false);
  const dispatch = useDispatch();
  const { status, errorMessage } = useSelector((state) => state.auth);
  const isCheckingAuth = useMemo(() => status === "checking", [status]);
  const {
    displayName,
    password,
    email,
    onInputChange,
    displayNameValid,
    emailValid,
    passwordValid,
    isValidForm,
    formState,
  } = useForm(formData, formValidations);

  const submitHandler = (event) => {
    event.preventDefault();
    setIsSubmited(true);
    if (!isValidForm) return;
    dispatch(startCreatingUser(formState));
  };

  return (
    <AuthLayout title="Register">
      <form
        className="animate__animated animate__fadeIn animate__faster"
        onSubmit={submitHandler}
      >
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Name"
              placeholder="Jane doe"
              type="text"
              name="displayName"
              value={displayName}
              onChange={onInputChange}
              error={!!displayNameValid && isSubmited}
              helperText={displayNameValid}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Email"
              placeholder="mail@example.com"
              type="email"
              name="email"
              value={email}
              onChange={onInputChange}
              error={!!emailValid && isSubmited}
              helperText={emailValid}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Password"
              placeholder="******"
              name="password"
              value={password}
              type="password"
              onChange={onInputChange}
              error={!!passwordValid && isSubmited}
              helperText={passwordValid}
              fullWidth
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} display={!!errorMessage ? "" : "none"}>
              <Alert severity="error"> {errorMessage}</Alert>
            </Grid>
            <Grid item xs={12}>
              <Button
                disabled={isCheckingAuth}
                type="submit"
                variant="contained"
                fullWidth
              >
                Sign Up
              </Button>
            </Grid>

            <Grid container direction="row" justifyContent="end" sx={{ mt: 1 }}>
              <Typography sx={{ mr: 1 }}>Already have an account?</Typography>
              <Link component={RouterLink} color="inherit" to="/auth/login">
                Login
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
