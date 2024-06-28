"use client";
import React, { useState } from "react";

import { Input } from "@/components/ui/input";

export default function InputPassword(props: any) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <span className="flex">
      <Input {...props} type={isVisible ? "text" : "password"} />
      <img
        src="/showpassword.svg"
        className="ml-[-30px] cursor-pointer"
        onClick={() => setIsVisible(!isVisible)}
      />
    </span>
  );
}
