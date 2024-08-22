"use client";
import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UIButton from "@/components/common/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUserStore } from "@/lib/store";
import DeleteAccount from "@/components/DeleteAccount";
import PersonalInformationForm from "@/components/PersonalInformationForm";
import AddressForm from "@/components/AddressForm";
import UploadCompanyLogo from "@/components/UploadCompanyLogo";
import RegionalSettingsForm from "@/components/RegionalSettingsForm";
import PriceAlerts from "@/components/PriceAlerts";
import Image from "next/image";
import { Bookmark } from "lucide-react";
import { CircleX } from "lucide-react";

function RenderUserData({ data }: any) {
  return (
    <>
      {data.map((item: any, index: number) => (
        <div key={index} className="mb-5">
          <p className="font-normal text-[16px]/[24px] text-[#A8A8A8]">
            {item.title}
          </p>
          {item.value}
        </div>
      ))}
    </>
  );
}

export default function Account() {
  const { user, onDeleteSavedPartner } = useUserStore((state: any) => state);
  const [edit, setEdit] = useState<
    "info" | "address" | "regional" | "partners" | null
  >(null);

  const onDeletePartner = (id: string) => {
    onDeleteSavedPartner(id);
  };

  const info = [
    {
      title: "",
      value: `User ${user?.id}`,
    },
    {
      title: "Email address",
      value: user?.email,
    },
    {
      title: "Phone",
      value: user?.phoneNumber,
    },
  ];
  const address = [
    {
      title: "Country",
      value: user?.country,
    },
    {
      title: "City",
      value: user?.city,
    },
    {
      title: "Company name",
      value: user?.companyName,
    },
    {
      title: "Postal / ZIP Code",
      value: user?.postalCode,
    },
    {
      title: "Street Address / Number",
      value: user?.address,
    },
  ];
  const region = [
    {
      title: "Language",
      value: user?.language,
    },
    {
      title: "Currency",
      value: user?.currency,
    },
    {
      title: "Country / Region",
      value: user?.country,
    },
  ];
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col py-5 sm:py-16 justify-between colored-main px-[16px] max-w-[1328px] mx-auto">
        <div className="sm:flex justify-between mb-10 items-center">
          <i className="flex text-[28px]/[40px] sm:text-[48px]/[52px]">
            <img src="/user.svg" className="mr-3" />
            Account
          </i>
          <div className="mt-5 sm:mt-0 gap-4 flex items-center">
            {user?.role === "admin" || user?.role === "provider" ? (
              <Link
                href={`${user?.role === "admin" ? "/dashboard/referral" : "/dashboard/performance"}`}
              >
                <UIButton secondary className="w-full sm:w-[224px]">
                  <img src="/analytics.svg" className="pr-1" /> Dashboard
                </UIButton>
              </Link>
            ) : (
              <div className="w-full sm:w-[224px]">
                <PriceAlerts />
              </div>
            )}
            <DeleteAccount />
          </div>
        </div>
        <Card className="mb-10">
          <CardHeader>
            <CardTitle className="font-medium text-[18px]/[22px]">
              User {user?.id}
            </CardTitle>
            <CardDescription>{user?.companyName}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{user?.country}</p>
          </CardContent>
        </Card>
        <Card className="mb-10">
          <CardHeader>
            <CardTitle className="font-medium text-[18px]/[22px] flex justify-between">
              <span>Business information</span>
              <UIButton
                onClick={() => setEdit("info")}
                secondary
                className={`${edit === "info" && "hidden"} rounded-full`}
              >
                Edit
                <img src="/edit.svg" />
              </UIButton>
            </CardTitle>
          </CardHeader>
          <CardContent className="sm:flex justify-between">
            {edit === "info" ? (
              <PersonalInformationForm
                {...user}
                onCancel={() => setEdit(null)}
              />
            ) : (
              <RenderUserData data={info} />
            )}
          </CardContent>
        </Card>
        <Card className="mb-10">
          <CardHeader>
            <CardTitle className="font-medium text-[18px]/[22px] flex justify-between">
              <span>Address</span>
              <UIButton
                onClick={() => setEdit("address")}
                secondary
                className={`${edit === "address" && "hidden"} rounded-full`}
              >
                Edit
                <img src="/edit.svg" />
              </UIButton>
            </CardTitle>
          </CardHeader>
          <CardContent className="sm:flex justify-between">
            {edit === "address" ? (
              <AddressForm {...user} onCancel={() => setEdit(null)} />
            ) : (
              <RenderUserData data={address} />
            )}
          </CardContent>
        </Card>
        <div className="flex justify-between mb-10">
          <span className="flex text-[28px]/[40px] sm:text-[48px]/[52px]">
            <img src="/settings.svg" />
            Regional settings
          </span>
        </div>
        <Card className="mb-10">
          <CardHeader>
            <CardTitle className="flex justify-between">
              <div className="flex justify-center content-center">
                <UploadCompanyLogo />
                <span className="pl-5 text-[26px]/[68px] font-normal">
                  {user?.companyName}
                </span>
              </div>
              <UIButton
                onClick={() => setEdit("regional")}
                secondary
                className={`${edit === "regional" && "hidden"} rounded-full`}
              >
                Edit
                <img src="/edit.svg" />
              </UIButton>
            </CardTitle>
          </CardHeader>
          <CardContent className="sm:flex justify-between">
            {edit === "regional" ? (
              <RegionalSettingsForm {...user} onCancel={() => setEdit(null)} />
            ) : (
              <RenderUserData data={region} />
            )}
          </CardContent>
        </Card>
        <div className="flex justify-between mb-10">
          <span className="flex items-center text-[28px]/[40px] sm:text-[48px]/[52px]">
            <Bookmark className="w-10 h-10 text-primaryOrange mr-2" />
            <span className="font-medium">Logistics&nbsp;</span>partners saved
          </span>
        </div>
        <Card className="">
          <CardContent className="sm:flex justify-between">
            <div className="flex gap-1">
              {user?.savedPartners?.map(({ id, photo }: any) => {
                return (
                  <Link
                    key={id}
                    href={`/partner/${id}`}
                    className="block w-[140px] h-12 bg-gray-200 p-2 hover:bg-slate-300 transition-all cursor-pointer relative"
                  >
                    <div
                      className="h-full"
                      style={{
                        backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_URL}${photo})`,

                        backgroundSize: "contain",
                        backgroundPositionX: "center",
                        backgroundRepeat: "no-repeat",
                      }}
                    />
                    {edit === "partners" && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          onDeletePartner(id);
                        }}
                        className="absolute -right-2 -top-2 z-10"
                      >
                        <CircleX />
                      </button>
                    )}
                  </Link>
                );
              })}
            </div>
            {edit !== "partners" ? (
              <UIButton
                onClick={() => setEdit("partners")}
                secondary
                className={`rounded-full`}
              >
                Edit
                <img src="/edit.svg" />
              </UIButton>
            ) : (
              <UIButton
                onClick={() => setEdit(null)}
                secondary
                className={`rounded-full bg-primaryOrange text-white`}
              >
                Save
              </UIButton>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </>
  );
}
