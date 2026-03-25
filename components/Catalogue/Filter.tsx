'use client';

import { useCurrenciesStore, useFilterStore } from '@/lib/filterStore';

import React, { useEffect, useState } from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';

const partnerFilters = {
  industrySolutions: {
    name: 'Industry Solutions',
    items: [
      { id: 'pharmaceuticals', label: 'Pharmaceuticals' },
      { id: 'electronics', label: 'Electronics' },
      { id: 'automotive', label: 'Automotive' },
      { id: 'manufacturing_retail', label: 'Manufacturing & Retail' },
      {
        id: 'exhibition_interior_design',
        label: 'Exhibition & Interior Design',
      },
      { id: 'apparel_fashion', label: 'Apparel Fashion' },
      { id: 'ecommerce', label: 'E-commerce' },
      { id: 'food_beverage', label: 'Food & Beverage' },
      { id: 'energy', label: 'Energy' },
    ],
  },
  transportSolutions: {
    name: 'Transport Solutions',
    items: [
      { id: 'cold_chain', label: 'Cold Chain' },
      { id: 'dangerous_goods', label: 'Dangerous Goods' },
      { id: 'high_value_goods', label: 'High-Value Goods' },
      { id: 'last_mile_delivery', label: 'Last Mile Delivery' },
      { id: 'project_cargo', label: 'Project Cargo' },
      { id: 'general_solutions', label: 'General Solutions' },
    ],
  },
  additionalServices: {
    name: 'Additional Services',
    items: [
      { id: 'white_gloves_services', label: 'White Gloves Services' },
      { id: 'ecommerce_fullfillment', label: 'E-commerce Fullfillment' },
      { id: 'heavy_equipment_logistics', label: 'Heavy Equipment Logistics' },
      { id: 'cross_border_expansion', label: 'Cross-Border Expansion' },
      { id: 'warehousing', label: 'Warehousing' },
      { id: 'custom_clearance', label: 'Custom Clearance' },
    ],
  },
};

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
  onChange: (
    id: string,
    value: boolean,
    selectedArray: string[],
    selectedKey: string,
  ) => void;
  selectedKey: string;
  label?: string;
  price?: string;
}
function FilterItemList({
  items,
  checkedList,
  onChange,
  selectedKey,
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
            onChange(item.id, e, checkedList, selectedKey);
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
    fromCountry,
    from,
    toCountry,
    to,

    filterPartners,
    partnersSelected,
    portsDeparture,
    portsDepartureSelected,
    portsArrival,
    portsArrivalSelected,
    getPartnersFilters,
    setFilter,
    getPortsList,
    getPartners,

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
    cross_border_expansion,
    warehousing,
    custom_clearance,
  } = useFilterStore((state: any) => state);

  useEffect(() => {
    getPortsList(true);
    getPortsList();
  }, [deliveryBy, fromCountry, from, toCountry, to, getPortsList]);

  useEffect(() => {
    getPartners();
  }, [
    partnersSelected?.length,
    portsDepartureSelected.length,
    portsArrivalSelected.length,

    getPartners,
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
    cross_border_expansion,
    warehousing,
    custom_clearance,
  ]);

  const onValueChange = (id: string, value: boolean) => {
    setFilter({ [id]: value });
    return value;
  };

  function onCheckboxChange(
    id: string,
    e: any,
    selectedArray: string[],
    selectedKey: string,
  ) {
    const tempArray = [...selectedArray];
    if (e) {
      if (!tempArray.includes(id)) tempArray.push(id);
    } else {
      const index = tempArray.indexOf(id);
      if (index !== -1) tempArray.splice(index, 1);
    }
    setFilter({ [selectedKey]: tempArray });
    return e;
  }
  function selectAll(array: any[], arrayName: string, select?: boolean) {
    const tempArray = select ? array.map((item: any) => item.id) : [];
    setFilter({ [`${arrayName}Selected`]: tempArray });
  }

  function selectAllPartnerFilters(catalog: keyof typeof partnerFilters) {
    partnerFilters[catalog].items.map((item) => {
      onValueChange(item.id, true);
    });
  }
  function clearAllPartnerFilters(catalog: keyof typeof partnerFilters) {
    partnerFilters[catalog].items.map((item) => {
      onValueChange(item.id, false);
    });
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
            selectAll={() => selectAllPartnerFilters('industrySolutions')}
            clearAll={() => clearAllPartnerFilters('industrySolutions')}
          />
          {partnerFilters.industrySolutions.items.map((item) => {
            return (
              <FilterItem
                key={item.label}
                onChange={onValueChange}
                checked={eval(item.id)}
                id={item.id}
                label={item.label}
              />
            );
          })}
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="transport-solutions">
        <AccordionTrigger>Transport solutions</AccordionTrigger>
        <AccordionContent>
          <GroupSelection
            selectAll={() => selectAllPartnerFilters('transportSolutions')}
            clearAll={() => clearAllPartnerFilters('transportSolutions')}
          />
          {partnerFilters.transportSolutions.items.map((item) => {
            return (
              <FilterItem
                key={item.label}
                onChange={onValueChange}
                checked={eval(item.id)}
                id={item.id}
                label={item.label}
              />
            );
          })}
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="additional-services">
        <AccordionTrigger>Additional Services</AccordionTrigger>
        <AccordionContent>
          <GroupSelection
            selectAll={() => selectAllPartnerFilters('additionalServices')}
            clearAll={() => clearAllPartnerFilters('additionalServices')}
          />
          {partnerFilters.additionalServices.items.map((item) => {
            return (
              <FilterItem
                key={item.label}
                onChange={onValueChange}
                checked={eval(item.id)}
                id={item.id}
                label={item.label}
              />
            );
          })}
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="partners">
        <AccordionTrigger>Logistic partner</AccordionTrigger>
        <AccordionContent>
          <GroupSelection
            selectAll={() => selectAll(filterPartners, 'partners', true)}
            clearAll={() => selectAll(filterPartners, 'partners')}
          />
          <FilterItemList
            items={filterPartners}
            checkedList={partnersSelected}
            onChange={onCheckboxChange}
            selectedKey="partnersSelected"
            label="name"
          />
        </AccordionContent>
      </AccordionItem>
      {deliveryBy !== 'truck' && (
        <>
          <AccordionItem value="portsDeparture">
            <AccordionTrigger>
              {deliveryBy === 'plane' && 'Air'}Port Departure
            </AccordionTrigger>
            <AccordionContent>
              <GroupSelection
                selectAll={() =>
                  selectAll(portsDeparture, 'portsDeparture', true)
                }
                clearAll={() => selectAll(portsDeparture, 'portsDeparture')}
              />
              <FilterItemList
                items={portsDeparture}
                checkedList={portsDepartureSelected}
                onChange={onCheckboxChange}
                selectedKey="portsDepartureSelected"
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="portsArrival">
            <AccordionTrigger>
              {deliveryBy === 'plane' && 'Air'}Port Arrival
            </AccordionTrigger>
            <AccordionContent>
              <GroupSelection
                selectAll={() => selectAll(portsArrival, 'portsArrival', true)}
                clearAll={() => selectAll(portsArrival, 'portsArrival')}
              />
              <FilterItemList
                items={portsArrival}
                checkedList={portsArrivalSelected}
                onChange={onCheckboxChange}
                selectedKey="portsArrivalSelected"
              />
            </AccordionContent>
          </AccordionItem>
        </>
      )}
    </Accordion>
  );
}
