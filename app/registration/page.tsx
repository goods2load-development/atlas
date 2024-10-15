import { Suspense } from "react";
import Registration from "@/components/Registration/Registration";
import HeaderClient from "@/components/Header/HeaderClient";
import DynamicMenu from "@/components/Header/DynamicMenu";

export default function RegistrationPage() {
  return (
    <>
      <HeaderClient />
      <DynamicMenu />
      <Suspense>
        <Registration />
      </Suspense>
    </>
  );
}
