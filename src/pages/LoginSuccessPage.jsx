import { CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { clearFakeLogin } from "../utils/fakeLoginAuth";
import { FAKE_LOGIN_IDS } from "../utils/fakeLoginIds";

export default function LoginSuccessPage() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    clearFakeLogin();
    navigate("/login", { replace: true });
  };

  return (
    <main
      id={FAKE_LOGIN_IDS.successPage}
      className="flex min-h-screen items-center justify-center bg-shell-main px-4"
    >
      <Card id={FAKE_LOGIN_IDS.successCard} className="w-full max-w-[440px] items-center p-6 text-center">
        <CheckCircle2
          id={FAKE_LOGIN_IDS.successIcon}
          aria-hidden="true"
          className="mb-4 size-14 text-status-pass"
        />
        <h1 id={FAKE_LOGIN_IDS.successHeading} className="m-0 mb-2 text-2xl font-semibold text-foreground">
          Login successful
        </h1>
        <p id={FAKE_LOGIN_IDS.successMessage} className="m-0 mb-6 text-sm text-foreground-secondary">
          You are signed in. This page is only available after entering valid credentials.
        </p>
        <Button id={FAKE_LOGIN_IDS.signOutButton} variant="outline" onClick={handleSignOut}>
          Sign out
        </Button>
      </Card>
    </main>
  );
}
