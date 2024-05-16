import { create } from "zustand";
import { get, post, patch, deleteRequest } from "./utils";
interface FilterProps {
  partnersSelected: string[];
  priceMin: string;
  priceMax: string;
}
interface FilterStoreProps {
  filter: FilterProps;
  setFilter: (data: FilterProps) => void;
}
export const useFilterStore = create((set) => ({
  filter: {
    from: "",
    to: "",
    departure: "",
    arrival: "",
    typeOfGoods: "",
    totalKg: "",
    pallets: "",
    partnersSelected: [],
    priceMin: null,
    priceMax: null,
    sortBy: null,
  },
  setFilter: (newFilter: FilterProps) => set((state: FilterStoreProps) => ({ filter: {...state.filter, ...newFilter} })),
  portsDeparture: [],
  portsArrival: [],
  getPortsList: async (type: string, city: string, departure: boolean) => {
    const data = await get({
      url: `https://port-api.com/${type}/search/${city}`,
      withCredentials: false,
    });
    console.log("ports", data);
    const portsList = { [departure ? "portsDeparture" : "portsArrival"]: data.features.map((item: any) => (item.properties.name))};
    set(() => (portsList));
  },
  
}));
