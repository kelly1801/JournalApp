import { Google } from "@mui/icons-material";
import { Grid, TextField, Typography, Button, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";
import { checkingAuth, startGoogleSignIn, startLoginWithEmailAndPassword } from "../../store/auth/thunks";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";

export const LoginPage = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.auth);
  const { email, password, onInputChange, formState, onResetForm } = useForm({
    email: "",
    password: "",
  });

  const isAuthing = useMemo(() => status === "checking", [status]);
  const onSubmit = (event) => {
    event.preventDefault();

    dispatch(startLoginWithEmailAndPassword({email, password}));
  };

  const onGoogleSignIn = () => {
    console.log("google sign in");
    dispatch(startGoogleSignIn());
  };
  return (
    <AuthLayout title="Login">
      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Email"
              placeholder="mail@example.com"
              name="email"
              type="email"
              value={email}
              onChange={onInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Password"
              placeholder="******"
              name="password"
              type="password"
              value={password}
              onChange={onInputChange}
              fullWidth
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <Button
                type="submit"
                variant="contained"
                disabled={isAuthing}
                fullWidth
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                fullWidth
                disabled={isAuthing}
                onClick={onGoogleSignIn}
              >
                <Google /> <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>

            <Grid container direction="row" justifyContent="end">
              <Link
                component={RouterLink}
                sx={{ mt: 1 }}
                color="inherit"
                to="/auth/register"
              >
                Crear una cuenta
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
