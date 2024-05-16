"use client";
import React, { PropsWithChildren, useCallback, useEffect } from "react";
import { useRouter, redirect, useSearchParams, usePathname } from "next/navigation";
import Image, { StaticImageData } from "next/image";

import { useUserStore } from "@/lib/store";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { useFilterStore } from "@/lib/filterStore";

const partners = [
  {
    name: "Some",
    priceFrom: "40$",
    id: "1",
    selected: false,
  },
  {
    name: "Some",
    priceFrom: "40$",
    id: "2",
    selected: false,
  },
  {
    name: "Some",
    priceFrom: "40$",
    id: "3",
    selected: false,
  },
  {
    name: "Some",
    priceFrom: "40$",
    id: "4",
    selected: false,
  }
];
let partnersMap = {};
partners.forEach((item: any) => {
  partnersMap = {
    ...partnersMap,
    [item.id]: item,
  }
})

// for main
// router.push(pathname + '?' + createQueryString('sort', 'asc'))

export default function Filter() {
  const router = useRouter()
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
 
      return params.toString()
    },
    [searchParams]
  )

  const min = React.createRef<HTMLInputElement>();
  const max = React.createRef<HTMLInputElement>();

  const { filter, setFilter, portsDeparture, portsArrival, getPortsList } = useFilterStore((state: any) => state);
  useEffect(() => {
    getPortsList("airport", "genoa italy", true);
  }, [filter.from]);
  function onCheckboxChange(id: string, e: any, type?: string) {
    console.log("e", id, e);
    if (type === "partners") {
      const partnersSelected = filter.partnersSelected;
      if (e) {
        partnersSelected.push(id);
      } else {
        partnersSelected.splice(partnersSelected.indexOf(id), 1);
      }
      setFilter({ partnersSelected });
    }
    return e;
  }
  function setMinMax() {
    setFilter({ priceMin: min.current?.value , priceMax: max.current?.value });
  }
  function selectAllPartners() {
    const partnersSelected = partners.map((item: any) => item.id);
    setFilter({ partnersSelected });
  };
  function clearAllPartners() {
    setFilter({ partnersSelected: [] });
  };
  console.log("search", filter, portsDeparture);
  return (
    <>
      {/* TODO change to alerts component */}
      <Button>Get price alerts</Button>
      <Accordion type="multiple" className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Order</AccordionTrigger>
          <AccordionContent>
            <div className="flex items-top space-x-2 mb-3">
              <Checkbox id="cheapest" onChange={(e) => {
                onCheckboxChange("cheapest", e);
              }} />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="cheapest"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Cheapest
                </label>
                <p className="text-sm text-muted-foreground">(from $ 680)</p>
              </div>
            </div>
            <div className="flex items-top space-x-2 mb-3">
              <Checkbox id="fastest" onCheckedChange={(e) => {
                onCheckboxChange("fastest", e);
              }} />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="fastest"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Fastest
                </label>
                <p className="text-sm text-muted-foreground">(from $ 1080)</p>
              </div>
            </div>
            <div className="flex items-top space-x-2 mb-3">
              <Checkbox id="goGreen" onCheckedChange={(e) => {
                onCheckboxChange("goGreen", e);
              }} />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="goGreen"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  GoGreen
                </label>
                <p className="text-sm text-muted-foreground">(from $ 2080)</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="price">
          <AccordionTrigger>Price</AccordionTrigger>
          <AccordionContent className="flex">
            <Input ref={min} placeholder="min" />
            <Input ref={max} placeholder="max" />
            <Button onClick={setMinMax}>OK</Button>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="partners">
          <AccordionTrigger>Logistic partner</AccordionTrigger>
          <AccordionContent>
            <div className="mb-3">
              <span onClick={selectAllPartners}>Select all</span>
              <span onClick={clearAllPartners}>Clear all</span>
            </div>
            {partners.map((item: any) => {
              return (
                <div className="flex items-top space-x-2 mb-3" key={item.id}>
                  <Checkbox id={item.id} onCheckedChange={(e) => {
                    onCheckboxChange(item.id, e, "partners");
                  }} />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor={item.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {item.name}
                    </label>
                    <p className="text-sm text-muted-foreground">{item.priceFrom}</p>
                  </div>
                </div>
              );
            })}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="portsDeparture">
          <AccordionTrigger>Port Departure</AccordionTrigger>
          <AccordionContent>
            <div className="mb-3">
              <span onClick={selectAllPartners}>Select all</span>
              <span onClick={clearAllPartners}>Clear all</span>
            </div>
            {portsDeparture.map((item: any) => {
              return (
                <div className="flex items-top space-x-2 mb-3" key={item}>
                  <Checkbox id={item} onCheckedChange={(e) => {
                    onCheckboxChange(item, e, "portsDeparture");
                  }} />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor={item}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {item}
                    </label>
                    <p className="text-sm text-muted-foreground">from 500$</p>
                  </div>
                </div>
              );
            })}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="portsArrival">
          <AccordionTrigger>Port Arrival</AccordionTrigger>
          <AccordionContent>
            <div className="mb-3">
              <span onClick={selectAllPartners}>Select all</span>
              <span onClick={clearAllPartners}>Clear all</span>
            </div>
            {portsArrival.map((item: any) => {
              return (
                <div className="flex items-top space-x-2 mb-3" key={item}>
                  <Checkbox id={item} onCheckedChange={(e) => {
                    onCheckboxChange(item, e, "portsDeparture");
                  }} />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor={item}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {item}
                    </label>
                    <p className="text-sm text-muted-foreground">from 500$</p>
                  </div>
                </div>
              );
            })}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}
