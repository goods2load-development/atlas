import { create } from "zustand";
import { get, post } from "./utils";

export const useCountriesStore = create((set) => ({
  countriesList: [],
  getCountriesList: async () => {
    const list = await get({
      url: "https://countriesnow.space/api/v0.1/countries",
    });
    set(() => ({ countriesList: list.data.data }));
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
    post({
      url: "auth/register",
      data: { ...data, postalCode: parseInt(data.postalCode) },
    }).then((response) => {
      if (isProvider) {
        post({
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
    post({
      url: "auth/login",
      data,
    }).then((userData: any) => {
      console.log("user data", userData);
      localStorage.setItem("id", userData.data.id);
      set(() => ({ user: userData.data }));
    });
  },
  getUser: async () => {
    const id = localStorage.getItem("id");
    await get({
      url: `/users/${id}`,
    }).then((userData: any) => {
      console.log("user data", userData);
      set(() => ({ user: userData.data }));
    });
  },
}));
