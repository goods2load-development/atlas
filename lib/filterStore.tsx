import { create } from "zustand";
import { format } from "date-fns";
import { getRequest, postRequest, patchRequest, deleteRequest } from "./utils";

export const LOCAL_STORAGE_SEARCH_FORM_KEY = "search-from";

function validate(requiredFields: any) {
  let isValid = true;

  if (!requiredFields) {
    return false;
  }

  Object.keys(requiredFields).map((key: any) => {
    if (!requiredFields[key].toString().length) isValid = false;
  });

  return isValid;
}

export enum ContainerLoad {
  FCL = "FCL",
  LCL = "LCL",
}

export enum DeliveryBy {
  plane = "plane",
  ferry = "ferry",
  truck = "truck",
}

interface FilterStoreProps {
  valid: boolean;
  partnersSelected: string[];
  priceMin: string | null;
  priceMax: string | null;
  deliveryBy: DeliveryBy;
  fromCountry: string;
  from: string;
  toCountry: string;
  to: string;
  departure: string;
  arrival: string;
  typeOfGoods: string;
  totalKg: string;
  placementOfGoods: string;
  quantity: string;
  length: string;
  width: string;
  height: string;
  goodsValue: string;
  incoterms: string;
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
export const useFilterStore = create<FilterStoreProps>((set, get) => {
  let savedSeachForm: any =
    typeof window !== "undefined"
      ? localStorage.getItem(LOCAL_STORAGE_SEARCH_FORM_KEY)
      : null;

  if (savedSeachForm) {
    savedSeachForm = JSON.parse(savedSeachForm);
  }

  return {
    valid: validate(savedSeachForm),
    deliveryBy: savedSeachForm?.deliveryBy || DeliveryBy.plane,
    fromCountry: savedSeachForm?.fromCountry || "",
    from: savedSeachForm?.from || "",
    toCountry: savedSeachForm?.toCountry || "",
    to: savedSeachForm?.to || "",
    departure: savedSeachForm?.departure || "",
    arrival: savedSeachForm?.arrival || "",
    typeOfGoods: savedSeachForm?.typeOfGoods || "",
    totalKg: savedSeachForm?.totalKg || "",
    placementOfGoods: savedSeachForm?.placementOfGoods || "Pallets",
    quantity: savedSeachForm?.quantity || "",
    length: savedSeachForm?.length || "",
    width: savedSeachForm?.width || "",
    height: savedSeachForm?.height || "",
    goodsValue: savedSeachForm?.goodsValue || "0",
    incoterms: savedSeachForm?.incoterms || "DDP",

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
    setFilter: (newFilter: FilterStoreProps) => {
      const {
        fromCountry,
        from,
        toCountry,
        to,
        departure,
        arrival,
        typeOfGoods,
        totalKg,
        quantity,
        length,
        width,
        height,
        goodsValue,
      } = get();
      const requiredFields: any = Object.assign(
        {
          fromCountry,
          from,
          toCountry,
          to,
          departure,
          arrival,
          typeOfGoods,
          totalKg,
          quantity,
          length,
          width,
          height,
          goodsValue,
        },
        newFilter
      );
      set((state: FilterStoreProps) => ({
        ...state,
        ...newFilter,
        valid: validate(requiredFields),
      }));
    },
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
        typeOfGoods,
        cheapest,
        fastest,
        goGreen,
        priceMin,
        priceMax,
        partnersSelected,
        portsDepartureSelected,
        portsArrivalSelected,
        totalKg,
        placementOfGoods,
        quantity,
        length,
        width,
        height,
        goodsValue,
        incoterms,
      } = get();

      localStorage.setItem(
        LOCAL_STORAGE_SEARCH_FORM_KEY,
        JSON.stringify({
          deliveryBy,
          fromCountry,
          from,
          toCountry,
          to,
          departure,
          arrival,
          typeOfGoods,
          totalKg,
          placementOfGoods,
          quantity,
          length,
          width,
          height,
          goodsValue,
          incoterms,
        })
      );

      postRequest({
        url: "orders/search",
        data: {
          transportation: deliveryBy,
          from: `${fromCountry}, ${from}`,
          to: `${toCountry}, ${to}`,
          departure,
          arrival,
          goods: typeOfGoods.split(" ")[0],
          kilogram: parseInt(totalKg),
          placementOfGoods,
          quantity: parseInt(quantity),
          length: parseInt(length),
          width: parseInt(width),
          height: parseInt(height),

          [`incoterms${deliveryBy.charAt(0).toUpperCase() + deliveryBy.slice(1)}`]:
            incoterms,

          logisticPartner: partnersSelected.length
            ? partnersSelected
            : undefined,
          portDeparture: portsDepartureSelected.length
            ? portsDepartureSelected
            : undefined,
          portArrival: portsArrivalSelected.length
            ? portsArrivalSelected
            : undefined,

          goodsValue: parseInt(goodsValue),
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
        },
      }).then((data: any) => {
        const products = data.partners.data.map((item: any) => ({
          estimatedTransit: item.transit,
          company: {
            name: item.companyName,
          },
          withdraw: format(
            new Date(item.withdraw).toDateString(),
            "MM/dd/yyyy"
          ),
          delivery: format(
            new Date(item.delivery).toDateString(),
            "MM/dd/yyyy"
          ),
          orderCost: item.price,
        }));
        console.log("products", products);
        set(() => ({ products }));
      });
    },
  };
});

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
      const currenciesSorted = data.currencies.sort((a: any, b: any) => {
        if (a.code < b.code) {
          return -1;
        } else if (b.code > a.code) {
          return 1;
        } else {
          return 0;
        }
      });
      const currencies = currenciesSorted.filter(
        (i: any) => i.code === "USD" || i.code === "EUR" || i.code === "GBP"
      );
      set(() => ({
        currencies: currencies.concat(
          currenciesSorted.filter(
            (i: any) =>
              !(i.code === "USD" || i.code === "EUR" || i.code === "GBP")
          )
        ),
        selectedCurrency: currenciesSorted.find(
          (item: any) => item.code === "USD"
        ),
      }));
    });
  },
}));
