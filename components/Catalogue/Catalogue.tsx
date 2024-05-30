"use client";
import SearchMain from "../SearchMain";
import Filter from "./Filter";
import Products from "./Products";
import { products } from "./MOCK";

export default function Catalogue() {
  return (
    <div className="grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] p-[40px_72px] gap-8">
      <div className="p-4 col-span-2 bg-[#FFEDE4] rounded-2xl">
        <SearchMain />
      </div>
      <div className="p-4 bg-[#F9F9F9] rounded-2xl w-[280px]">
        <Filter />
      </div>
      <Products />
    </div>
  );
}
