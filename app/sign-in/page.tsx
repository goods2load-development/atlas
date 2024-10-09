import { Suspense } from "react";
import LoginWrapper from "@/components/LoginWrapper";
import SignIn from "@/components/SignIn/SignIn";

export default function Login() {
  return (
    <Suspense>
      <LoginWrapper>
        <SignIn />
      </LoginWrapper>
    </Suspense>
  );
}
