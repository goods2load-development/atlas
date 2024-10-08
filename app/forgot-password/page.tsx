import { Metadata } from "next";
import LoginWrapper from "@/components/LoginWrapper";
import ForgotPassword from "@/components/ForgotPassword/ForgotPassword";

export const metadata: Metadata = {
  title: "Forgot password",
};

export default function Login() {
  return (
    <LoginWrapper>
      <ForgotPassword />
    </LoginWrapper>
  );
}
