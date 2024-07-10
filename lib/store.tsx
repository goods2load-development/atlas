import { create } from "zustand";
import { getRequest, postRequest, patchRequest, deleteRequest } from "./utils";
import { ILang, LOCAL_STORAGE_KEY_LANG, langs } from "@/components/LangSwicher";

export const useCountriesStore = create((set) => ({
  countriesList: [],
  countriesListLoading: false,
  citiesList: [],
  citiesListLoading: false,
  citiesListTo: [],
  citiesListToLoading: false,
  getCountriesList: async () => {
    // set(() => ({ countriesListLoading: true }));
    const data = await getRequest({
      url: "https://countriesnow.space/api/v0.1/countries",
      withCredentials: false,
    });
    const countriesList: any[] = [];
    const citiesList: any[] = [];
    data.data.forEach((country: any) => {
      countriesList.push({ label: country.country, value: country.country });
    });
    set(() => ({ countriesList, citiesList, countriesListLoading: false }));
  },
  getCitiesList: async (country: string, to?: boolean) => {
    if (to) {
      set(() => ({ citiesListToLoading: true }));
    } else {
      set(() => ({ citiesListLoading: true }));
    }
    set(() => ({ citiesListLoading: true }));
    const data = await postRequest({
      url: "https://countriesnow.space/api/v0.1/countries/cities",
      data: { country },
      withCredentials: false,
    });
    const citiesList: any[] = [];
    data.data.forEach((city: any) => {
      citiesList.push({ label: city, value: city });
    });
    if (to) {
      set(() => ({ citiesListTo: citiesList, citiesListToLoading: false }));
    } else {
      set(() => ({ citiesList, citiesListLoading: false }));
    }
  },
}));

export const useGoodsStore = create((set) => ({
  goodsList: [],
  goodsListLoading: false,
  getGoodsList: async (term: string) => {
    set(() => ({ goodsListLoading: true }));
    // console.log("term", term);
    const base = "https://hs-code-harmonized-system.p.rapidapi.com/";
    const byCode = !!parseInt(term);
    const url = base + (byCode ? "code" : "search");
    getRequest({
      url,
      params: { term },
      withCredentials: false,
      headers: {
        "X-RapidAPI-Key": "02c03ec749msh5ca6829a28a3028p1e6f11jsn835391f49eab",
        "X-RapidAPI-Host": "hs-code-harmonized-system.p.rapidapi.com",
      },
    })
      .then((data) => {
        const goodsList: any[] = [];
        if (byCode) {
          goodsList.push({
            label: `${data.result?.code} ${data.result?.description}`,
            value: data.result?.code,
          });
        } else {
          data.result?.forEach((item: any) => {
            goodsList.push({
              label: `${item.code} ${item.description}`,
              value: item.code,
            });
          });
        }

        set(() => ({ goodsList }));
      })
      .finally(() => set(() => ({ goodsListLoading: false })));
  },
}));

export const useRegistrationStore = create((set) => ({
  registered: false,
  postUserRegistrationData: async (data: any) => {
    const isProvider = data.provider;
    const formData = new FormData();
    formData.append("insuranceStatement", data.insuranceStatement);
    formData.append("issuingAuthority", data.issuingAuthority);
    formData.append("tradeLicenseNumber", data.tradeLicenseNumber);
    formData.append("ferry", `${!!data.ferry}`);
    formData.append("truck", `${!!data.truck}`);
    formData.append("plane", `${!!data.plane}`);
    delete data.confirmPassword;
    delete data.privacy;

    delete data.insuranceStatement;
    delete data.issuingAuthority;
    delete data.tradeLicenseNumber;

    delete data.ferry;
    delete data.plane;
    delete data.truck;
    delete data.license;
    postRequest({
      url: "auth/register",
      data,
    }).then((response) => {
      if (isProvider) {
        postRequest({
          url: `providers/upload/users/${response.data.id}`,
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        }).then(() => {
          // TODO add redirect
          // registered true
        });
      } else {
        // registered true
      }
    });
    set((state: any) => ({ registered: true }));
  },
}));

interface LoginProps {
  email: string;
  password: string;
}

export const useUserStore = create((set) => ({
  user: {},
  postLoginData: async (data: LoginProps) => {
    postRequest({
      url: "auth/login",
      data,
    }).then((userData: any) => {
      // TODO add redirect
      localStorage.setItem("id", userData.data.id);
      set(() => ({ user: userData?.data }));
    });
  },
  getUser: async () => {
    const id = localStorage.getItem("id");
    await getRequest({
      url: `/users/${id}`,
    }).then((userData: any) => {
      set(() => ({ user: userData?.data }));
    });
  },
  authenticateUser: async (data: any) => {
    await postRequest({
      url: `/oauth/authenticate`,
      params: { access_token: data },
    }).then((userData: any) => {
      localStorage.setItem("id", userData.data.id);
      set(() => ({ user: userData?.data }));
    });
  },
  updateUser: async (data: any) => {
    const id = localStorage.getItem("id");
    await patchRequest({
      url: `/users/${id}`,
      data: data,
    }).then((userData: any) => {
      set((state: any) => ({ user: { ...state.user, ...userData?.data } }));
    });
  },
  uploadLogo: async (data: any) => {
    const id = localStorage.getItem("id");
    const formData = new FormData();
    formData.append("file", data);
    await postRequest({
      url: `/users/${id}/upload/file`,
      data: formData,
    }).then((userData: any) => {
      set((state: any) => ({ user: { ...state.user, ...userData?.data } }));
    });
  },
  deleteUser: async (callback: () => void) => {
    const id = localStorage.getItem("id");
    await deleteRequest({
      url: `/users/${id}`,
    }).then(() => {
      set(() => ({ user: {} }));
      localStorage.removeItem("id");
      callback();
    });
  },
}));

export const useForgotPasswordStore = create((set) => ({
  user: {},
  postForgotPasswordData: async (data: any) => {
    postRequest({
      url: "auth/forgot-password",
      data,
    }).then((userData: any) => {
      // TODO add redirect or pop-up
    });
  },
  postResetPasswordData: async (data: any) => {
    postRequest({
      url: "auth/reset-password",
      data,
    }).then((userData: any) => {
      // TODO add redirect
    });
  },
}));

interface ILangStore {
  lang: ILang;
  setLang: (lang: ILang) => void;
  initializeLang: () => void;
}

export const useLangStore = create<ILangStore>((set) => ({
  lang: langs[0],
  setLang: (lang: ILang) => {
    set({ lang });
    localStorage.setItem(LOCAL_STORAGE_KEY_LANG, lang.label);
  },
  initializeLang: () => {
    const savedLang = localStorage.getItem(LOCAL_STORAGE_KEY_LANG) || langs[0];

    const lang = langs.find((elem) => elem.label === savedLang);

    if (lang) set({ lang });
  },
}));
