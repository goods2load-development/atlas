import { create } from "zustand";
import { format } from "date-fns";
import { getRequest, postRequest, patchRequest, deleteRequest } from "./utils";

interface FilterStoreProps {
  partnersSelected: string[];
  priceMin: string | null;
  priceMax: string | null;
  deliveryBy: "plane" | "ship" | "truck";
  fromCountry: string;
  from: string;
  toCountry: string;
  to: string;
  departure: string | null;
  arrival: string | null;
  typeOfGoods: string;
  totalKg: string | null;
  pallets: string | null;
  sortBy: null | any;
  cheapest: boolean;
  fastest: boolean;
  goGreen: boolean;
  partners: any[];
  portsDepartureSelected: string[];
  portsArrivalSelected: string[];
  products: any[];
  setFilter: (data: FilterStoreProps) => void;
  portsDeparture: string[];
  portsArrival: string[];
}
export const useFilterStore = create<FilterStoreProps>((set, get) => ({
  // search options
  deliveryBy: "plane",
  fromCountry: "",
  from: "",
  toCountry: "",
  to: "",
  departure: null,
  arrival: null,
  typeOfGoods: "",
  totalKg: null,
  pallets: null,
  // filter options
  cheapest: false,
  fastest: false,
  goGreen: false,
  priceMin: null,
  priceMax: null,
  partners: [],
  partnersSelected: [],
  portsDeparture: [],
  portsDepartureSelected: [],
  portsArrival: [],
  portsArrivalSelected: [],

  sortBy: null,

  products: [],
  setFilter: (newFilter: FilterStoreProps) =>
    set((state: FilterStoreProps) => ({
      ...state,
      ...newFilter,
    })),
  getPartners: async () => {
    const data = await getRequest({
      url: "orders/partners",
    });
    set(() => ({
      partners: data.data,
    }));
  },
  getPortsList: async (departure: boolean = false) => {
    const { deliveryBy, fromCountry, from, toCountry, to } = get();
    const type = deliveryBy === "plane" ? "airport" : "seaport";
    const city = `${departure ? fromCountry : toCountry} ${departure ? from : to}`;
    const data = await getRequest({
      url: `https://port-api.com/${type}/search/${city}`,
      withCredentials: false,
    });
    if (departure) {
      set(() => ({
        portsDeparture: data.features.map((item: any) => ({
          id: item.properties.name,
          label: item.properties.name,
        })),
      }));
    } else {
      set(() => ({
        portsArrival: data.features.map((item: any) => ({
          id: item.properties.name,
          label: item.properties.name,
        })),
      }));
    }
  },
  getProducts: async () => {
    const {
      deliveryBy,
      fromCountry,
      from,
      toCountry,
      to,
      departure,
      arrival,
      cheapest,
      fastest,
      goGreen,
      priceMin,
      priceMax,
      partnersSelected,
      portsDepartureSelected,
      portsArrivalSelected,
      totalKg,
      pallets,
    } = get();

    postRequest({
      url: "orders/search",
      data: {
        transportation: deliveryBy,
        from: from ? `${fromCountry} ${from}` : undefined,
        to: to ? `${toCountry} ${to}` : undefined,

        departure: departure ? departure : undefined,
        arrival: arrival ? arrival : undefined,

        logisticPartner: partnersSelected.length ? partnersSelected : undefined,
        portDeparture: portsDepartureSelected.length
          ? portsDepartureSelected
          : undefined,
        portArrival: portsArrivalSelected.length
          ? portsArrivalSelected
          : undefined,

        // goods: "",

        kilogram: totalKg ? totalKg : undefined,
        pallets: pallets ? pallets : undefined,
        order: {
          cheapest: cheapest,
          fastest: fastest,
          goGreen: goGreen,
        },
        provider: {},
        price: {
          min: priceMin ? parseInt(priceMin) : undefined,
          max: priceMax ? parseInt(priceMax) : undefined,
        },
        // size: "",
      },
    }).then((data: any) => {
      const products = data.data.map((item: any) => ({
        estimatedTransit: "",
        company: {
          name: item.companyName,
        },
        // withdrow: format(item.withdrow, "mm/dd/yyyy"),
        withdrow: item.withdrow,
        delivery: item.delivery,
        orderCost: item.price,
      }));
      console.log("products", products);
      set(() => ({ products }));
    });
  },
}));
