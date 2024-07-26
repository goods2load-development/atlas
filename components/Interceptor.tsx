"use client";
import React, { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function ToasterWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { toast } = useToast();
  useEffect(() => {
    const handleErrorEvent = (event: any) => {
      const message = event?.detail?.response?.data?.message;
      if (typeof message === "string") {
        toast({
          title: "Error",
          description: message,
          variant: "destructive",
          className: "bg-red-500",
        });
      } else {
        event?.detail?.response?.data?.message.map((m: string) =>
          toast({
            title: "Error",
            description: m,
            variant: "destructive",
            className: "bg-red-500",
          })
        );
      }
    };

    window.addEventListener("errorHandler", handleErrorEvent);
    return () => {
      window.removeEventListener("errorHandler", handleErrorEvent);
    };
  }, []);

  return children;
}
