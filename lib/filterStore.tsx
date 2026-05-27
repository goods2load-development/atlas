import {
  deleteRequest,
  getCountryIsoByName,
  getRequest,
  patchRequest,
  postRequest,
} from './utils';
import portsData from '@/lib/data/ports_datalastic_full.json';

import { format } from 'date-fns';
import { create } from 'zustand';

export const LOCAL_STORAGE_SEARCH_FORM_KEY = 'search-from';

function buildSearchFormSnapshot(state: FilterStoreProps) {
  return {
    deliveryBy: state.deliveryBy,
    fromCountry: state.fromCountry,
    from: state.from,
    toCountry: state.toCountry,
    to: state.to,
    departure: state.departure,
    arrival: state.arrival,
    typeOfGoods: state.typeOfGoods,
    totalKg: state.totalKg,
    placementOfGoods: state.placementOfGoods,
    quantity: state.quantity,
    length: state.length,
    width: state.width,
    height: state.height,
    goodsValue: state.goodsValue,
    incoterms: state.incoterms,
  };
}

function persistSearchFormSnapshot(state: FilterStoreProps) {
  localStorage.setItem(
    LOCAL_STORAGE_SEARCH_FORM_KEY,
    JSON.stringify(buildSearchFormSnapshot(state)),
  );
}

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
  hasHydrated: boolean;
  hasLoadedPartners: boolean;
  skipNextPartnersFetch: boolean;
  partnersSelected: string[] | undefined;
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

  // FIX: partners is undefined until first fetch completes, allowing the UI
  // to distinguish "never loaded" (undefined) from "loaded but empty" ([]).
  // This prevents the empty-state flash before the first API response arrives.
  partners: any[] | undefined;
  filterPartners: any[];
  isPartnersLoading: boolean;
  portsDepartureSelected: string[];
  portsArrivalSelected: string[];
  pagination: any;
  setFilter: (data: FilterStoreProps) => void;
  hydrate: () => void;
  portsDeparture: { id: string; label: string }[];
  portsArrival: { id: string; label: string }[];
  getPortsList: (departure?: boolean) => void;
  clearPartners: () => void;
  getPartners: (page?: number) => Promise<void> | void;
  setPartnersFilters: (data: any) => Promise<void>;
  consumeSkipNextPartnersFetch: () => boolean;
  _fetchPartners: (page?: number) => Promise<void>;
  persistSearchForm: () => void;
}

// FIX 3: Module-level debounce timer so rapid consecutive getPartners() calls
// from the store itself (e.g. triggered by selectAllPartnerFilters looping
// over setFilter) are coalesced into a single API request. Using a module-level
// variable means the timer is shared across all callers regardless of how the
// action is invoked — from a useEffect, a button click, or another action.
let _getPartnersTimer: ReturnType<typeof setTimeout> | null = null;
let _latestPartnersRequestId = 0;

export const useFilterStore = create<FilterStoreProps>((set, get) => {
  return {
    // NOTE: localStorage is intentionally NOT read here to avoid SSR/client hydration mismatch.
    // The hydrate() action is called from a useEffect on the client to restore saved search state.
    valid: false,
    hasHydrated: false,
    hasLoadedPartners: false,
    skipNextPartnersFetch: false,
    deliveryBy: DeliveryBy.plane,
    fromCountry: '',
    from: '',
    toCountry: '',
    to: '',
    departure: '',
    arrival: '',
    typeOfGoods: '',
    totalKg: '',
    placementOfGoods: 'Pallets',
    quantity: '',
    length: '',
    width: '',
    height: '',
    goodsValue: '0',
    incoterms: 'Unknown',

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

    // FIX: Start as undefined, not [], so the UI knows "not yet fetched".
    // The Products component should check `partners === undefined` to avoid
    // showing an empty state before the first fetch completes.
    partners: undefined,

    isPartnersLoading: false, // FIX: was `true` — nothing is loading at store creation time.
    // Setting true caused an immediate loading flash before
    // getPartners() was ever called.
    partnersSelected: undefined,
    portsDeparture: [],
    portsDepartureSelected: [],
    portsArrival: [],
    portsArrivalSelected: [],
    filterPartners: [],

    sortBy: null,

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
    hydrate: () => {
      // Safe to call from useEffect only — reads localStorage client-side
      try {
        const raw = localStorage.getItem(LOCAL_STORAGE_SEARCH_FORM_KEY);
        if (!raw) {
          set({ hasHydrated: true });
          return;
        }
        const saved = JSON.parse(raw);
        set((state: FilterStoreProps) => ({
          ...state,
          deliveryBy: saved.deliveryBy ?? state.deliveryBy,
          fromCountry: saved.fromCountry ?? state.fromCountry,
          from: saved.from ?? state.from,
          toCountry: saved.toCountry ?? state.toCountry,
          to: saved.to ?? state.to,
          departure: saved.departure ?? state.departure,
          arrival: saved.arrival ?? state.arrival,
          typeOfGoods: saved.typeOfGoods ?? state.typeOfGoods,
          totalKg: saved.totalKg ?? state.totalKg,
          placementOfGoods: saved.placementOfGoods ?? state.placementOfGoods,
          quantity: saved.quantity ?? state.quantity,
          length: saved.length ?? state.length,
          width: saved.width ?? state.width,
          height: saved.height ?? state.height,
          goodsValue: saved.goodsValue ?? state.goodsValue,
          incoterms: saved.incoterms ?? state.incoterms,
          valid: validate(saved),
          hasHydrated: true,
        }));
      } catch {
        // Ignore parse errors — localStorage may have stale/invalid data
        set({ hasHydrated: true });
      }
    },
    persistSearchForm: () => {
      persistSearchFormSnapshot(get());
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
        const searchCountry = departure ? fromCountry : toCountry;
        const exactMatch = data.find(
          (c: any) =>
            c.name.common.toLowerCase() === searchCountry.toLowerCase() ||
            c.name.official.toLowerCase() === searchCountry.toLowerCase(),
        );
        iso2 = (exactMatch || data[0])?.cca2 || 'Country not found';
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
            const searchText = (departure ? from : to).toLowerCase();
            const matchedAirports = data.filter((item: any) => {
              const airportName = item.nameAirport?.toLowerCase?.() || '';
              const municipalityName = item.nameCountry?.toLowerCase?.() || '';
              const iataCode = item.codeIataAirport?.toLowerCase?.() || '';

              return (
                airportName.includes(searchText) ||
                municipalityName.includes(searchText) ||
                iataCode.includes(searchText)
              );
            });

            const filteredAirports = matchedAirports.length
              ? matchedAirports
              : data;

            const ports: any[] = filteredAirports.map((item: any) => ({
              id: item.codeIataAirport,
              label: `(${item.codeIataAirport}) ${
                item.nameAirport.includes(' Airport')
                  ? item.nameAirport
                  : item.nameAirport + ' Airport'
              }`,
            }));
            const selected: any[] = filteredAirports.map(
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
        const searchText = (departure ? from : to).toLowerCase();
        const countryPorts = (portsData as any[]).filter(
          (port) => port.country_iso === iso2,
        );
        const matchedPorts = countryPorts.filter((port) => {
          const portName = port.port_name?.toLowerCase?.() || '';
          const cityName = port.city?.toLowerCase?.() || '';
          const provinceName = port.province?.toLowerCase?.() || '';
          const unlocode = port.unlocode?.toLowerCase?.() || '';

          return (
            portName.includes(searchText) ||
            cityName.includes(searchText) ||
            provinceName.includes(searchText) ||
            unlocode.includes(searchText) ||
            (Array.isArray(port.alias) &&
              port.alias.some((a: string) =>
                a.toLowerCase().includes(searchText),
              ))
          );
        });
        const filteredPorts = (
          matchedPorts.length ? matchedPorts : countryPorts
        ).map((port) => ({
          unlocode: port.unlocode,
          port_name: port.port_name,
          country_code: port.country_iso,
        }));

        const ports = filteredPorts
          .filter((item: any) => item.unlocode)
          .map((item: any) => ({
            id: item.unlocode,
            label: `(${item.unlocode}) ${item.port_name}`,
          }));

        const selected: any[] = filteredPorts
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
      set({ partners: undefined });
    },
    consumeSkipNextPartnersFetch: () => {
      const { skipNextPartnersFetch } = get();
      if (skipNextPartnersFetch) {
        set({ skipNextPartnersFetch: false });
      }
      return skipNextPartnersFetch;
    },

    getPartners: async (page?: number) => {
      // Pagination requests fire immediately — no debounce needed.
      if (page !== undefined) {
        return get()._fetchPartners(page);
      }

      // Debounce non-pagination calls to coalesce rapid filter changes.
      if (_getPartnersTimer) clearTimeout(_getPartnersTimer);
      _getPartnersTimer = setTimeout(() => {
        _getPartnersTimer = null;
        get()._fetchPartners();
      }, 150);
    },

    _fetchPartners: async (page?: number) => {
      const requestId = ++_latestPartnersRequestId;

      // Read state first — before setting any loading flags.
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

      // FIX: If partnersSelected is explicitly [] (all checkboxes unchecked),
      // show empty results immediately — no API call needed, and NO loading
      // state set, so the UI won't flash a loading spinner before showing empty.
      // undefined means "no filter applied yet" (show all).
      if (Array.isArray(partnersSelected) && partnersSelected.length === 0) {
        if (requestId === _latestPartnersRequestId) {
          set({
            partners: [],
            pagination: {},
            isPartnersLoading: false,
            hasLoadedPartners: true,
          });
        }
        return;
      }

      // FIX: Only set isPartnersLoading:true AFTER the early-return check above.
      // This prevents a loading flash when we already know the result is empty.
      set({ isPartnersLoading: true });

      const routeFrom = `${fromCountry}, ${from}`;
      const routeTo = `${toCountry}, ${to}`;
      const routeFromLower = routeFrom.toLowerCase();
      const routeToLower = routeTo.toLowerCase();
      const isSeaSearch = deliveryBy === DeliveryBy.ferry;

      persistSearchFormSnapshot(get());

      try {
        const data = await postRequest({
          url: 'partners/search',
          params: { page, take: 10 },
          data: {
            transportation: deliveryBy,
            from: routeFrom,
            to: routeTo,
            departure,
            arrival,
            goods: typeOfGoods
              .split(' ')[0]
              .replace(/00$/, '')
              .replace(/\./g, ''),
            kilogram: parseInt(totalKg),
            placementOfGoods,
            quantity: parseInt(quantity),
            length: parseInt(length),
            width: parseInt(width),
            height: parseInt(height),
            incoterm: incoterms,
            keyword: '',
            logisticPartner:
              partnersSelected === undefined ? [''] : partnersSelected,
            portDeparture: isSeaSearch
              ? [routeFromLower]
              : portsDepartureSelected.length
                ? portsDepartureSelected
                : [routeFromLower],
            portArrival: isSeaSearch
              ? [routeToLower]
              : portsArrivalSelected.length
                ? portsArrivalSelected
                : [routeToLower],

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
        });
        if (requestId !== _latestPartnersRequestId) return;

        const partners = data?.partners?.data ?? [];

        set(() => ({
          partners,
          pagination: data?.partners?.meta ?? {},
          hasLoadedPartners: true,
        }));
      } finally {
        if (requestId === _latestPartnersRequestId) {
          set({ isPartnersLoading: false, hasLoadedPartners: true });
        }
      }
    },
    setPartnersFilters: async (data: any) => {
      set(() => ({
        filterPartners: data.map((item: any) => ({
          id: item.partner.id,
          label: item.companyName,
        })),
        partnersSelected: data.map((item: any) => item.partner.id),
        skipNextPartnersFetch: true,
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
    try {
      const exchangeRates = await getRequest({ url: '/currencies' });

      // If the exchange rates API failed or returned a non-object, bail out gracefully
      if (!exchangeRates || typeof exchangeRates !== 'object') return;

      const data = await getRequest({
        url: 'https://www.wixapis.com/currency_converter/v1/currencies',
        withCredentials: false,
      });

      if (!data?.currencies?.length) return;

      const currenciesSorted = [...data.currencies].sort((a: any, b: any) => {
        if (a.code < b.code) return -1;
        if (b.code > a.code) return 1;
        return 0;
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
                exchangeRates[i.code] != null,
            ),
          )
          .map((item: any) => ({
            ...item,
            rate: exchangeRates[item.code] ?? 1,
          })),
        selectedCurrency: {
          ...currenciesSorted.find((item: any) => item.code === 'USD'),
          rate: 1,
        },
      }));
    } catch (error) {
      console.error('Failed to load currencies:', error);
    }
  },
}));
