import {
  deleteRequest,
  getCountryIsoByName,
  getRequest,
  patchRequest,
  postRequest,
} from './utils';

import { format } from 'date-fns';
import { create } from 'zustand';

export const LOCAL_STORAGE_SEARCH_FORM_KEY = 'search-from';

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
  FCL = 'FCL',
  LCL = 'LCL',
}

export enum DeliveryBy {
  plane = 'plane',
  ferry = 'ferry',
  truck = 'truck',
}

interface FilterStoreProps {
  valid: boolean;
  partnersSelected: string[];
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

  // Services
  bestReviewed: boolean;
  carbonOffset: boolean;
  industryRecognition: boolean;

  // Industry Solutions
  pharmaceuticals: boolean;
  electronics: boolean;
  automotive: boolean;
  manufacturing_retail: boolean;
  exhibition_interior_design: boolean;
  apparel_fashion: boolean;
  ecommerce: boolean;
  food_beverage: boolean;
  energy: boolean;

  // Transport Solutions
  cold_chain: boolean;
  dangerous_goods: boolean;
  high_value_goods: false;
  last_mile_delivery: boolean;
  project_cargo: boolean;
  general_solutions: boolean;

  // Additional services
  white_gloves_services: boolean;
  ecommerce_fullfillment: boolean;
  heavy_equipment_logistics: boolean;
  cross_border_expansion: boolean;
  warehousing: boolean;
  custom_clearance: boolean;

  partners: any[];
  filterPartners: any[];
  isPartnersLoading: boolean;
  portsDepartureSelected: string[];
  portsArrivalSelected: string[];
  // products: any[];
  pagination: any;
  setFilter: (data: FilterStoreProps) => void;
  portsDeparture: string[];
  portsArrival: string[];
}
export const useFilterStore = create<FilterStoreProps>((set, get) => {
  let savedSeachForm: any =
    typeof window !== 'undefined'
      ? localStorage.getItem(LOCAL_STORAGE_SEARCH_FORM_KEY)
      : null;

  if (savedSeachForm) {
    savedSeachForm = JSON.parse(savedSeachForm);
  }

  return {
    valid: validate(savedSeachForm),
    deliveryBy: savedSeachForm?.deliveryBy || DeliveryBy.plane,
    fromCountry: savedSeachForm?.fromCountry || '',
    from: savedSeachForm?.from || '',
    toCountry: savedSeachForm?.toCountry || '',
    to: savedSeachForm?.to || '',
    departure: savedSeachForm?.departure || '',
    arrival: savedSeachForm?.arrival || '',
    typeOfGoods: savedSeachForm?.typeOfGoods || '',
    totalKg: savedSeachForm?.totalKg || '',
    placementOfGoods: savedSeachForm?.placementOfGoods || 'Pallets',
    quantity: savedSeachForm?.quantity || '',
    length: savedSeachForm?.length || '',
    width: savedSeachForm?.width || '',
    height: savedSeachForm?.height || '',
    goodsValue: savedSeachForm?.goodsValue || '0',
    incoterms: savedSeachForm?.incoterms || 'Unknown',

    // filter options

    // Services
    bestReviewed: false,
    carbonOffset: false,
    industryRecognition: false,

    // Industry solutions
    pharmaceuticals: false,
    electronics: false,
    automotive: false,
    manufacturing_retail: false,
    exhibition_interior_design: false,
    apparel_fashion: false,
    ecommerce: false,
    food_beverage: false,
    energy: false,

    // Transport solutions
    cold_chain: false,
    dangerous_goods: false,
    high_value_goods: false,
    last_mile_delivery: false,
    project_cargo: false,
    general_solutions: false,

    // Additional Services
    white_gloves_services: false,
    ecommerce_fullfillment: false,
    heavy_equipment_logistics: false,
    cross_border_expansion: false,
    warehousing: false,
    custom_clearance: false,

    partners: [],
    isPartnersLoading: true,
    partnersSelected: [],
    portsDeparture: [],
    portsDepartureSelected: [],
    portsArrival: [],
    portsArrivalSelected: [],
    filterPartners: [],

    sortBy: null,

    // products: [],
    pagination: {},
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
        newFilter,
      );
      set((state: FilterStoreProps) => ({
        ...state,
        ...newFilter,
        valid: validate(requiredFields),
      }));
    },
    getPortsList: async (departure: boolean = false) => {
      const { deliveryBy, fromCountry, from, toCountry, to } = get();
      const type = deliveryBy === 'plane' ? 'airport' : 'seaport';
      const city = `${departure ? fromCountry : toCountry} ${departure ? from : to}`;

      let iso2;

      try {
        const reponse_iso2 = await fetch(
          `https://restcountries.com/v3.1/name/${departure ? fromCountry : toCountry}`,
        );
        const data = await reponse_iso2.json();
        iso2 = data[0]?.cca2 || 'Country not found';
      } catch (error) {
        iso2 = null;
      }

      if (deliveryBy === 'truck') return;

      if (type === 'airport') {
        getRequest({
          url: `https://aviation-edge.com/v2/public/airportDatabase?key=${process.env.NEXT_PUBLIC_AVIATION_EDGE_API_KEY}&type=Cargo&codeIso2Country=${iso2}`,
          withCredentials: false,
        }).then((data: any) => {
          if (!!data.length) {
            const ports: any[] = data.map((item: any) => ({
              id: item.codeIataAirport,
              label: `(${item.codeIataAirport}) ${
                item.nameAirport.includes(' Airport')
                  ? item.nameAirport
                  : item.nameAirport + ' Airport'
              }`,
            }));
            const selected: any[] = data.map(
              (item: any) => item.codeIataAirport,
            );
            if (departure) {
              set(() => ({
                portsDeparture: ports,
                portsDepartureSelected: selected,
              }));
            } else {
              set(() => ({
                portsArrival: ports,
                portsArrivalSelected: selected,
              }));
            }
          }
        });
      }

      if (type === 'seaport') {
        const response = await fetch(
          `https://api.datalastic.com/api/v0/port_find?api-key=${process.env.NEXT_PUBLIC_DATALASTIC_API_KEY}&name=${encodeURIComponent(departure ? from : to)}&country_iso=${encodeURIComponent(iso2 as string)}&port_type=Port&fuzzy=1`,
        );
        const data = await response.json();

        const ports = data.data
          .filter((item: any) => item.unlocode)
          .map((item: any) => ({
            id: item.unlocode,
            label: `(${item.unlocode}) ${item.port_name}`,
          }));

        const selected: any[] = data.data
          .filter((item: any) => item.unlocode)
          .map((item: any) => item.unlocode);

        if (departure) {
          set(() => ({
            portsDeparture: ports,
            portsDepartureSelected: selected,
          }));
        } else {
          set(() => ({
            portsArrival: ports,
            portsArrivalSelected: selected,
          }));
        }
      }
    },
    clearPartners: () => {
      set({ partners: [] });
    },
    getPartners: async (page?: number) => {
      set({ isPartnersLoading: true });
      const {
        deliveryBy,
        fromCountry,
        from,
        toCountry,
        to,
        departure,
        arrival,
        typeOfGoods,
        bestReviewed,
        carbonOffset,
        industryRecognition,
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

        // Industry solutions
        pharmaceuticals,
        electronics,
        automotive,
        manufacturing_retail,
        exhibition_interior_design,
        apparel_fashion,
        ecommerce,
        food_beverage,
        energy,

        // Transport solutions
        cold_chain,
        dangerous_goods,
        high_value_goods,
        last_mile_delivery,
        project_cargo,
        general_solutions,

        // Additional Services
        white_gloves_services,
        ecommerce_fullfillment,
        heavy_equipment_logistics,
        cross_border_expansion,
        warehousing,
        custom_clearance,
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
        }),
      );

      postRequest({
        url: 'partners/search',
        params: { page, take: 10 },
        data: {
          transportation: deliveryBy,
          from: `${fromCountry}, ${from}`,
          to: `${toCountry}, ${to}`,
          departure,
          arrival,
          goods: typeOfGoods.split(' ')[0],
          kilogram: parseInt(totalKg),
          placementOfGoods,
          quantity: parseInt(quantity),
          length: parseInt(length),
          width: parseInt(width),
          height: parseInt(height),
          incoterm: incoterms,
          logisticPartner: partnersSelected.length
            ? partnersSelected
            : undefined,
          portDeparture: portsDepartureSelected.length
            ? portsDepartureSelected
            : undefined,
          portArrival: portsArrivalSelected.length
            ? portsArrivalSelected
            : undefined,

          goodsValue:
            parseInt(goodsValue) /
            useCurrenciesStore.getState().selectedCurrency.rate,

          provider: {},
          filters: {
            pharmaceuticals: pharmaceuticals,
            electronics: electronics,
            automotive: automotive,
            manufacturingRetail: manufacturing_retail,
            exhibitionInteriorDesign: exhibition_interior_design,
            apparelFashion: apparel_fashion,
            ecommerce: ecommerce,
            foodBeverage: food_beverage,
            energy: energy,
            coldChain: cold_chain,
            dangerousGoods: dangerous_goods,
            highValueGoods: high_value_goods,
            lastMileDelivery: last_mile_delivery,
            projectCargo: project_cargo,
            generalSolutions: general_solutions,
            whiteGlovesServices: white_gloves_services,
            ecommerceFullfillment: ecommerce_fullfillment,
            heavyEquipmentLogistics: heavy_equipment_logistics,
            crossBorderExpansion: cross_border_expansion,
            warehousing: warehousing,
            customClearance: custom_clearance,

            carbonOffset,
            industryRecognition,
            bestReviewed,
          },
        },
      })
        .then((data: any) => {
          let partners = data?.partners?.data;

          set(() => ({ partners, pagination: data?.partners?.meta }));
        })
        .finally(() => {
          set({ isPartnersLoading: false });
        });
    },
    setPartnersFilters: async (data: any) => {
      set(() => ({
        filterPartners: data.map((item: any) => ({
          id: item.partner.id,
          label: item.companyName,
        })),
        partnersSelected: data.map((item: any) => item.partner.id),
      }));
    },
  };
});

interface CurrenciesStoreProps {
  selectedCurrency: SelectedCurrencyProps;
  currencies: any[];
  getCurrencies: () => void;
}

interface SelectedCurrencyProps {
  symbol: string;
  code: string;
  rate: number;
}

export const useCurrenciesStore = create<CurrenciesStoreProps>((set, get) => ({
  selectedCurrency: {
    symbol: '$',
    code: 'USD',
    rate: 1,
  },
  currencies: [],
  setCurrency: (selectedCurrency: SelectedCurrencyProps) =>
    set(() => ({
      selectedCurrency,
    })),
  getCurrencies: async () => {
    const exchangeRates = await getRequest({
      url: '/currencies',
    });
    getRequest({
      url: 'https://www.wixapis.com/currency_converter/v1/currencies',
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
      const majorCurrencies = currenciesSorted.filter(
        (i: any) => i.code === 'USD' || i.code === 'EUR' || i.code === 'GBP',
      );
      set(() => ({
        currencies: majorCurrencies
          .concat(
            currenciesSorted.filter(
              (i: any) =>
                !(i.code === 'USD' || i.code === 'EUR' || i.code === 'GBP') &&
                exchangeRates[i.code],
            ),
          )
          .map((item: any) => ({ ...item, rate: exchangeRates[item.code] })),
        selectedCurrency: {
          ...currenciesSorted.find((item: any) => item.code === 'USD'),
          rate: 1,
        },
      }));
    });
  },
}));
