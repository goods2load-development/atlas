"use client";
import React, { useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useFilterStore, useCurrenciesStore } from "@/lib/filterStore";

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

export default function Filter() {
  const {
    deliveryBy,
    cheapest,
    fastest,
    goGreen,
    priceMin,
    priceMax,
    partners,
    partnersSelected,
    portsDeparture,
    portsDepartureSelected,
    portsArrival,
    portsArrivalSelected,
    setFilter,
    getPortsList,
    getPartners,
    getProducts,
  } = useFilterStore((state: any) => state);
  const { selectedCurrency } = useCurrenciesStore((state: any) => state);
  useEffect(() => {
    getPartners();
    getPortsList(true);
    getPortsList();
  }, []);
  useEffect(() => {
    getProducts();
  }, [
    cheapest,
    fastest,
    goGreen,
    priceMin,
    priceMax,
    partnersSelected.length,
    portsDepartureSelected.length,
    portsArrivalSelected.length,
  ]);
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
  function selectAll(array: any[], arrayName: string, select?: boolean) {
    const tempArray = select ? array.map((item: any) => item.id) : [];
    setFilter({ [`${arrayName}Selected`]: tempArray });
  }
  return (
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
        <AccordionTrigger>Goods value</AccordionTrigger>
        <AccordionContent className="flex items-center">
          {selectedCurrency?.symbol}
          <Input
            className="m-1"
            placeholder="min"
            value={priceMin}
            onChange={(e) => setFilter({ priceMin: e.target.value })}
          />
          -
          <Input
            className="ml-1"
            placeholder="max"
            value={priceMax}
            onChange={(e) => setFilter({ priceMax: e.target.value })}
          />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="partners">
        <AccordionTrigger>Logistic partner</AccordionTrigger>
        <AccordionContent>
          <GroupSelection
            selectAll={() => selectAll(partners, "partners", true)}
            clearAll={() => selectAll(partners, "partners")}
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
            <AccordionTrigger>
              {deliveryBy === "plane" && "Air"}Port Departure
            </AccordionTrigger>
            <AccordionContent>
              <GroupSelection
                selectAll={() =>
                  selectAll(portsDeparture, "portsDeparture", true)
                }
                clearAll={() => selectAll(portsDeparture, "portsDeparture")}
              />
              <FilterItemList
                items={portsDeparture}
                checkedList={portsDepartureSelected}
                onChange={onCheckboxChange}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="portsArrival">
            <AccordionTrigger>
              {deliveryBy === "plane" && "Air"}Port Arrival
            </AccordionTrigger>
            <AccordionContent>
              <GroupSelection
                selectAll={() => selectAll(portsArrival, "portsArrival", true)}
                clearAll={() => selectAll(portsArrival, "portsArrival")}
              />
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
  );
}
