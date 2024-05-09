import { create } from "zustand";
import { get, post, patch } from "./utils";

export const useCountriesStore = create((set) => ({
  countriesList: [],
  getCountriesList: async () => {
    const countriesList = await get({
      url: "https://restcountries.com/v3.1/all",
    });
    set(() => ({ countriesList }));
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
      data,
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
      // TODO add redirect
      localStorage.setItem("id", userData.data.id);
      set(() => ({ user: userData?.data }));
    });
  },
  getUser: async () => {
    const id = localStorage.getItem("id");
    await get({
      url: `/users/${id}`,
    }).then((userData: any) => {
      set(() => ({ user: userData?.data }));
    });
  },
  updateUser: async (data: any) => {
    const id = localStorage.getItem("id");
    await patch({
      url: `/users/${id}`,
      data: data,
    }).then((userData: any) => {
      set((state: any) => ({ user: {...state.user, ...userData?.data} }));
    });
  },
  uploadLogo: async (data: any) => {
    const id = localStorage.getItem("id");
    const formData = new FormData();
    formData.append("file", data);
    await post({
      url: `/users/${id}/upload/file`,
      data: formData,
    }).then((userData: any) => {
      set((state: any) => ({ user: {...state.user, ...userData?.data} }));
    });
  },
}));

export const useForgotPasswordStore = create((set) => ({
  user: {},
  postForgotPasswordData: async (data: any) => {
    post({
      url: "auth/forgot-password",
      data,
    }).then((userData: any) => {
      // TODO add redirect or pop-up
    });
  },
  postResetPasswordData: async (data: any) => {
    post({
      url: "auth/reset-password",
      data,
    }).then((userData: any) => {
      // TODO add redirect
    });
  },
}));
