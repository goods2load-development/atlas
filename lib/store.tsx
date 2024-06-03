import { create } from "zustand";
import { getRequest, postRequest, patchRequest, deleteRequest } from "./utils";
import path from "path";

export const useCountriesStore = create((set) => ({
  countriesList: [],
  citiesList: [],
  citiesListTo: [],
  getCountriesList: async () => {
    const data = await getRequest({
      url: "https://countriesnow.space/api/v0.1/countries",
      withCredentials: false,
    });
    const countriesList: any[] = [];
    const citiesList: any[] = [];
    data.data.forEach((country: any) => {
      countriesList.push({ label: country.country, value: country.country });
    });
    set(() => ({ countriesList, citiesList }));
  },
  getCitiesList: async (country: string, to?: boolean) => {
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
      set(() => ({ citiesListTo: citiesList }));
    } else {
      set(() => ({ citiesList }));
    }
  },
}));

export const useGoodsStore = create((set) => ({
  goodsList: [],
  getGoodsList: async (term: string) => {
    console.log("term", term);
    const base = "https://hs-code-harmonized-system.p.rapidapi.com/";
    const byCode = !!parseInt(term);
    const url = base + (byCode ? "code" : "search");
    const data = await getRequest({
      url,
      params: { term },
      withCredentials: false,
      headers: {
        "X-RapidAPI-Key": "02c03ec749msh5ca6829a28a3028p1e6f11jsn835391f49eab",
        "X-RapidAPI-Host": "hs-code-harmonized-system.p.rapidapi.com",
      },
    });
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
  },
}));

export const useRegistrationStore = create((set) => ({
  firstStep: true,
  setFirstStep: (value: boolean) => set(() => ({ firstStep: value })),
  registered: false,
  postUserRegistrationData: async (data: any, license: File) => {
    const isProvider = data.provider;
    const formData = new FormData();
    formData.append("file", license);
    formData.append("ferry", `${!!data.ferry}`);
    formData.append("truck", `${!!data.truck}`);
    formData.append("plane", `${!!data.plane}`);
    delete data.confirmPassword;
    delete data.privacy;

    delete data.ferry;
    delete data.plane;
    delete data.truck;
    delete data.license;
    delete data.provider;
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
