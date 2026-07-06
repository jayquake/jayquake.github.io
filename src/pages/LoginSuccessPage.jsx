import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { clearFakeLogin } from "../utils/fakeLoginAuth";
import { FAKE_LOGIN_IDS } from "../utils/fakeLoginIds";

export default function LoginSuccessPage() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    clearFakeLogin();
    navigate("/login", { replace: true });
  };

  return (
    <Box
      id={FAKE_LOGIN_IDS.successPage}
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
      <Card id={FAKE_LOGIN_IDS.successCard} sx={{ width: "100%", maxWidth: 440 }}>
        <CardContent sx={{ p: 3, textAlign: "center" }}>
          <CheckCircleOutlineIcon
            id={FAKE_LOGIN_IDS.successIcon}
            color="success"
            sx={{ fontSize: 56, mb: 2 }}
          />
          <Typography id={FAKE_LOGIN_IDS.successHeading} component="h1" variant="h5" gutterBottom>
            Login successful
          </Typography>
          <Typography
            id={FAKE_LOGIN_IDS.successMessage}
            variant="body2"
            color="text.secondary"
            sx={{ mb: 3 }}
          >
            You are signed in. This page is only available after entering valid credentials.
          </Typography>
          <Button id={FAKE_LOGIN_IDS.signOutButton} variant="outlined" onClick={handleSignOut}>
            Sign out
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
