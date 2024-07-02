import { create } from "zustand";
import { format } from "date-fns";
import { getRequest, postRequest, patchRequest, deleteRequest } from "./utils";

export enum ContainerLoad {
  FCL = "FCL",
  LCL = "LCL",
}

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
  placementOfGoods: string | null;
  pallets: string | null;
  length: string | null;
  width: string | null;
  height: string | null;
  goodsValue: string | null;
  containerLoad: ContainerLoad;
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
  deliveryBy: "plane",
  fromCountry: "",
  from: "",
  toCountry: "",
  to: "",
  departure: null,
  arrival: null,
  typeOfGoods: "",
  totalKg: null,
  placementOfGoods: null,
  pallets: null,
  length: null,
  width: null,
  height: null,
  goodsValue: null,
  containerLoad: ContainerLoad.FCL,
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
      placementOfGoods,
      length,
      width,
      height,
      goodsValue,
      containerLoad,
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

        kilogram: totalKg ? totalKg : undefined,
        pallets: pallets ? pallets : undefined,
        placementOfGoods: placementOfGoods ? placementOfGoods : undefined,
        // size: { length: length ? length : undefined, width, height },

        // goodsValue,
        containerLoad,
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
      const products = data.partners.data.map((item: any) => ({
        estimatedTransit: item.transit,
        company: {
          name: item.companyName,
        },
        // withdrow: format(item.withdrow, "mm/dd/yyyy"),
        withdrow: format(new Date(item.withdraw).toDateString(), "MM/dd/yyyy"),
        delivery: format(new Date(item.delivery).toDateString(), "MM/dd/yyyy"),
        orderCost: item.price,
      }));
      console.log("products", products);
      set(() => ({ products }));
    });
  },
}));

interface CurrenciesStoreProps {
  selectedCurrency: Object;
  currencies: any[];
  getCurrencies: () => void;
}

export const useCurrenciesStore = create<CurrenciesStoreProps>((set, get) => ({
  selectedCurrency: {},
  currencies: [],
  setCurrency: (selectedCurrency: string) =>
    set(() => ({
      selectedCurrency,
    })),
  getCurrencies: async () => {
    await getRequest({
      url: "https://www.wixapis.com/currency_converter/v1/currencies",
      withCredentials: false,
    }).then((data) => {
      console.log("data", data);
      set(() => ({
        currencies: data.currencies,
        selectedCurrency: data.currencies.find(
          (item: any) => item.code === "USD"
        ),
      }));
    });
  },
}));
