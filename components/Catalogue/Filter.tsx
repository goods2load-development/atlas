"use client";
import React, { useEffect } from "react";
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
import PriceAlerts from "@/components/PriceAlerts";

function GroupSelection({ selectAll, clearAll }: any) {
  return (
    <div className="mb-5 space-x-2">
      <span className="cursor-pointer hover:opacity-70" onClick={selectAll}>
        Select all
      </span>
      <span className="cursor-pointer hover:opacity-70" onClick={clearAll}>
        Clear all
      </span>
    </div>
  );
}
function FilterItem({ id, checked, onChange, label, price }: any) {
  return (
    <div className="flex items-top space-x-2 mb-3">
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={(e: boolean) => {
          onChange(id, e);
        }}
      />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor={id}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </label>
        <p className="text-sm text-muted-foreground">{price}</p>
      </div>
    </div>
  );
}
interface FilterItemsListProps {
  items: any[];
  checkedList: string[];
  onChange: (id: string, value: boolean, props: any) => void;
  label?: string;
  price?: string;
}
function FilterItemList({
  items,
  checkedList,
  onChange,
  label,
  price,
}: FilterItemsListProps) {
  return items.map((item: any) => {
    return (
      <div className="flex items-top space-x-2 mb-3" key={item.id}>
        <Checkbox
          id={item.id}
          checked={checkedList.includes(item.id)}
          onCheckedChange={(e: boolean) => {
            onChange(item.id, e, checkedList);
          }}
        />
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor={item.id}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {item.label || item[label as keyof object]}
          </label>
          <p className="text-sm text-muted-foreground">
            {item.priceFrom || item[price as keyof object]}
          </p>
        </div>
      </div>
    );
  });
}

const orderList: any[] = [
  { id: "cheapest", label: "Cheapest" },
  { id: "fastest", label: "Fastest" },
  { id: "goGreen", label: "GoGreen" },
];

export default function Filter() {
  const min = React.createRef<HTMLInputElement>();
  const max = React.createRef<HTMLInputElement>();

  const {
    deliveryBy,
    from,
    to,
    cheapest,
    fastest,
    goGreen,
    partners,
    partnersSelected,
    portsDeparture,
    portsDepartureSelected,
    portsArrival,
    portsArrivalSelected,
    setFilter,
    getPortsList,
    getPartners,
  } = useFilterStore((state: any) => state);
  useEffect(() => {
    getPartners();
  }, []);
  useEffect(() => {
    getPortsList(true);
  }, [from]);
  useEffect(() => {
    getPortsList();
  }, [to]);
  function onOrderChange(id: string, e: any, selectedArray: string[]) {
    setFilter({ [id]: e });
    return e;
  }
  function onCheckboxChange(id: string, e: any, selectedArray: string[]) {
    const tempArray: string[] = selectedArray;
    if (e) {
      tempArray.push(id);
    } else {
      tempArray.splice(selectedArray.indexOf(id), 1);
    }
    setFilter({ selectedArray: tempArray });
    return e;
  }
  function setMinMax() {
    setFilter({ priceMin: min.current?.value, priceMax: max.current?.value });
  }
  function selectAllPartners(arrayName: string) {
    const tempArray = [arrayName].map((item: any) => item.id);
    setFilter({ [arrayName]: tempArray });
  }
  function clearAllPartners(arrayName: string) {
    setFilter({ [arrayName]: [] });
  }
  return (
    <>
      <PriceAlerts />
      <Accordion type="multiple" className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Order</AccordionTrigger>
          <AccordionContent>
            <FilterItem
              id="cheapest"
              checked={cheapest}
              onChange={onOrderChange}
              label="Cheapest"
            />
            <FilterItem
              id="fastest"
              checked={fastest}
              onChange={onOrderChange}
              label="Fastest"
            />
            <FilterItem
              id="goGreen"
              checked={goGreen}
              onChange={onOrderChange}
              label="GoGreen"
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="price">
          <AccordionTrigger>Price</AccordionTrigger>
          <AccordionContent className="flex space-x-2">
            <Input ref={min} placeholder="min" />
            <Input ref={max} placeholder="max" />
            <Button onClick={setMinMax}>OK</Button>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="partners">
          <AccordionTrigger>Logistic partner</AccordionTrigger>
          <AccordionContent>
            <GroupSelection
              selectAll={selectAllPartners}
              clearAll={clearAllPartners}
            />
            <FilterItemList
              items={partners}
              checkedList={partnersSelected}
              onChange={onCheckboxChange}
              label="name"
            />
          </AccordionContent>
        </AccordionItem>
        {deliveryBy !== "truck" && (
          <>
            <AccordionItem value="portsDeparture">
              <AccordionTrigger>Port Departure</AccordionTrigger>
              <AccordionContent>
                <GroupSelection selectAll={() => {}} clearAll={() => {}} />
                <FilterItemList
                  items={portsDeparture}
                  checkedList={portsDepartureSelected}
                  onChange={onCheckboxChange}
                />
                {/* "portsDeparture" */}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="portsArrival">
              <AccordionTrigger>Port Arrival</AccordionTrigger>
              <AccordionContent>
                <GroupSelection selectAll={() => {}} clearAll={() => {}} />
                <FilterItemList
                  items={portsArrival}
                  checkedList={portsArrivalSelected}
                  onChange={onCheckboxChange}
                />
              </AccordionContent>
            </AccordionItem>
          </>
        )}
      </Accordion>
    </>
  );
}
