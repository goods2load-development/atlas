import { Suspense } from "react";
import LoginWrapper from "@/components/LoginWrapper";
import SignIn from "@/components/SignIn/SignIn";
import HeaderClient from "@/components/Header/HeaderClient";
import DynamicMenu from "@/components/Header/DynamicMenu";

export default function Login() {
  return (
    <>
      <HeaderClient />
      <DynamicMenu />
      <Suspense>
        <LoginWrapper>
          <SignIn />
        </LoginWrapper>
      </Suspense>
    </>
  );
}
