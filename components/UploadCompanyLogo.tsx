"use client";
import React from "react";

import { Input } from "@/components/ui/input";
import { useUserStore } from "@/lib/store";

export default function UploadCompanyLogo() {
  const { user, uploadLogo } = useUserStore((state: any) => state);
  return (
    <label className="cursor-pointer rounded-full">
      <Input
        className="hidden"
        name="companyLogo"
        type="file"
        accept="image/png, image/gif, image/jpeg"
        onChange={(e) => {
          if (e.target?.files?.length) uploadLogo(e.target.files[0]);
        }}
      />
      {user?.companyPhoto ? (
        <div
          className="w-[68px] h-[68px] rounded-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_URL}${user.companyPhoto})`,
          }}
        />
      ) : (
        <img src="/defaultlogo.png" />
      )}
    </label>
  );
}
