import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Alert } from "../components/ui/alert";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  isFakeLoginAuthenticated,
  setFakeLoginAuthenticated,
  validateFakeLoginCredentials,
} from "../utils/fakeLoginAuth";
import { FAKE_LOGIN_IDS } from "../utils/fakeLoginIds";

const INPUT_CLASS =
  "border border-border-strong bg-shell-input px-3 text-sm focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/15";

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
    <main
      id={FAKE_LOGIN_IDS.page}
      className="flex min-h-screen items-center justify-center bg-shell-main px-4"
    >
      <Card id={FAKE_LOGIN_IDS.card} className="w-full max-w-[400px] p-6">
        <h1 id={FAKE_LOGIN_IDS.heading} className="m-0 mb-2 text-2xl font-semibold text-foreground">
          Sign in
        </h1>
        <p id={FAKE_LOGIN_IDS.description} className="m-0 mb-6 text-sm text-foreground-secondary">
          Enter your credentials to continue.
        </p>

        <form id={FAKE_LOGIN_IDS.form} onSubmit={handleSubmit} noValidate>
          <div className="mb-2 mt-4 flex flex-col gap-1.5">
            <Label htmlFor={FAKE_LOGIN_IDS.usernameInput}>
              Username <span aria-hidden="true">*</span>
            </Label>
            <Input
              id={FAKE_LOGIN_IDS.usernameInput}
              name="username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className={INPUT_CLASS}
            />
          </div>
          <div className="mb-2 mt-4 flex flex-col gap-1.5">
            <Label htmlFor={FAKE_LOGIN_IDS.passwordInput}>
              Password <span aria-hidden="true">*</span>
            </Label>
            <Input
              id={FAKE_LOGIN_IDS.passwordInput}
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={INPUT_CLASS}
            />
          </div>

          {error && (
            <Alert id={FAKE_LOGIN_IDS.errorMessage} variant="error" className="mt-4">
              {error}
            </Alert>
          )}

          <Button id={FAKE_LOGIN_IDS.submitButton} type="submit" variant="default" className="mt-6 w-full">
            Sign in
          </Button>
        </form>
      </Card>
    </main>
  );
}
