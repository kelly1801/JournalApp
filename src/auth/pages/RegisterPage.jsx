import AuthLayout from "../layout/AuthLayout";
import { Grid, TextField, Link, Button, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export const RegisterPage = () => {
  return (
    <AuthLayout title="Register">
      <form>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Name"
              placeholder="Jane doe"
              type="text"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField label="Email" placeholder="mail@example.com" fullWidth />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField label="Password" placeholder="******" fullWidth />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12}>
              <Button variant="contained" fullWidth>
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
