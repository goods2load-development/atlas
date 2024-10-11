"use client";
import React, { useEffect, useState } from "react";
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
function FilterItem({ id, checked, onChange, label, price, fromValue }: any) {
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
          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </label>
        {fromValue && (
          <div className="text-[#636363]">
            <>&#40;</>From ${fromValue}
            <>&#41;</>
          </div>
        )}
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
            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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

    bestReviewed,
    carbonOffset,
    industryRecognition,

    pharmaceuticals,
    electronics,
    automotive,
    manufacturing_retail,
    exhibition_interior_design,
    apparel_fashion,
    ecommerce,
    food_beverage,
    energy,

    cold_chain,
    dangerous_goods,
    high_value_goods,
    last_mile_delivery,
    project_cargo,
    general_solutions,

    white_gloves_services,
    ecommerce_fullfillment,
    heavy_equipment_logistics,
    cross_border_expansio,
  } = useFilterStore((state: any) => state);

  useEffect(() => {
    getPartners();
    getPortsList(true);
    getPortsList();
  }, []);

  useEffect(() => {
    getProducts();
  }, [
    partnersSelected.length,
    portsDepartureSelected.length,
    portsArrivalSelected.length,
    getProducts,
    bestReviewed,
    carbonOffset,
    industryRecognition,
  ]);

  const onValueChange = (id: string, value: boolean) => {
    setFilter({ [id]: value });
    return value;
  };

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
        <AccordionTrigger>Services</AccordionTrigger>
        <AccordionContent>
          <FilterItem
            onChange={onValueChange}
            checked={bestReviewed}
            id="bestReviewed"
            label="Best Reviewed"
          />
          <FilterItem
            onChange={onValueChange}
            checked={carbonOffset}
            id="carbonOffset"
            label="Carbon Offset"
          />
          <FilterItem
            onChange={onValueChange}
            checked={industryRecognition}
            id="industryRecognition"
            label="Industry Recognition"
          />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="industry-solutions">
        <AccordionTrigger>Industry Solutions</AccordionTrigger>
        <AccordionContent>
          <GroupSelection
          // selectAll={() => selectAll(partners, "partners", true)}
          // clearAll={() => selectAll(partners, "partners")}
          />
          <FilterItem
            onChange={onValueChange}
            checked={pharmaceuticals}
            id="pharmaceuticals"
            label="Pharmaceuticals"
          />
          <FilterItem
            onChange={onValueChange}
            checked={electronics}
            id="electronics"
            label="Electronics"
          />
          <FilterItem
            onChange={onValueChange}
            checked={automotive}
            id="automotive"
            label="Automotive"
          />
          <FilterItem
            onChange={onValueChange}
            checked={manufacturing_retail}
            id="manufacturing_retail"
            label="Manufacturing & Retail"
          />
          <FilterItem
            onChange={onValueChange}
            checked={exhibition_interior_design}
            id="exhibition_interior_design"
            label="Exhibition & Interior Design"
          />
          <FilterItem
            onChange={onValueChange}
            checked={apparel_fashion}
            id="apparel_fashion"
            label="Apparel Fashion"
          />
          <FilterItem
            onChange={onValueChange}
            checked={ecommerce}
            id="ecommerce"
            label="E-commerce"
          />
          <FilterItem
            onChange={onValueChange}
            checked={food_beverage}
            id="food_beverage"
            label="Food & Beverage"
          />
          <FilterItem
            onChange={onValueChange}
            checked={energy}
            id="energy"
            label="Energy"
          />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="transport-solutions">
        <AccordionTrigger>Transport solutions</AccordionTrigger>
        <AccordionContent>
          <GroupSelection
          // selectAll={() => selectAll(partners, "partners", true)}
          // clearAll={() => selectAll(partners, "partners")}
          />
          <FilterItem
            onChange={onValueChange}
            checked={cold_chain}
            id="cold_chain"
            label="Cold Chain"
          />
          <FilterItem
            onChange={onValueChange}
            checked={dangerous_goods}
            id="dangerous_goods"
            label="Dangerous Goods"
          />
          <FilterItem
            onChange={onValueChange}
            checked={high_value_goods}
            id="high_value_goods"
            label="High-Value Goods"
          />
          <FilterItem
            onChange={onValueChange}
            checked={last_mile_delivery}
            id="last_mile_delivery"
            label="Last Mile Delivery"
          />
          <FilterItem
            onChange={onValueChange}
            checked={project_cargo}
            id="project_cargo"
            label="Project Cargo"
          />
          <FilterItem
            onChange={onValueChange}
            checked={general_solutions}
            id="general_solutions"
            label="General Solutions"
          />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="additional-services">
        <AccordionTrigger>Additional Services</AccordionTrigger>
        <AccordionContent>
          <GroupSelection
          // selectAll={() => selectAll(partners, "partners", true)}
          // clearAll={() => selectAll(partners, "partners")}
          />
          <FilterItem
            onChange={onValueChange}
            checked={white_gloves_services}
            id="white_gloves_services"
            label="White Gloves Services"
          />
          <FilterItem
            onChange={onValueChange}
            checked={ecommerce_fullfillment}
            id="ecommerce_fullfillment"
            label="E-commerce Fullfillment"
          />
          <FilterItem
            onChange={onValueChange}
            checked={cross_border_expansio}
            id="cross_border_expansio"
            label="Cross-Border Expansio"
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
