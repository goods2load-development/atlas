"use client";
import Image from "next/image";
import CompanyLeader from "./_components/Company/CompanyLeadership/CompanyLeader";
import CompanyContainer from "./_components/Company/CompanyContainer/CompanyContainer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <CompanyContainer />
    </main>
  );
}
