import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  isFakeLoginAuthenticated,
  setFakeLoginAuthenticated,
  validateFakeLoginCredentials,
} from "../utils/fakeLoginAuth";
import { FAKE_LOGIN_IDS } from "../utils/fakeLoginIds";

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (isFakeLoginAuthenticated()) {
    return <Navigate to="/login/success" replace />;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (validateFakeLoginCredentials(username, password)) {
      setFakeLoginAuthenticated();
      navigate("/login/success", { replace: true });
      return;
    }

    setError("Invalid username or password.");
  };

  return (
    <Box
      id={FAKE_LOGIN_IDS.page}
      component="main"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        px: 2,
      }}
    >
      <Card id={FAKE_LOGIN_IDS.card} sx={{ width: "100%", maxWidth: 400 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography id={FAKE_LOGIN_IDS.heading} component="h1" variant="h5" gutterBottom>
            Sign in
          </Typography>
          <Typography
            id={FAKE_LOGIN_IDS.description}
            variant="body2"
            color="text.secondary"
            sx={{ mb: 3 }}
          >
            Enter your credentials to continue.
          </Typography>

          <Box id={FAKE_LOGIN_IDS.form} component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              id={FAKE_LOGIN_IDS.usernameInput}
              name="username"
              label="Username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              id={FAKE_LOGIN_IDS.passwordInput}
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
              margin="normal"
            />

            {error && (
              <Alert id={FAKE_LOGIN_IDS.errorMessage} severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}

            <Button
              id={FAKE_LOGIN_IDS.submitButton}
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 3 }}
            >
              Sign in
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
