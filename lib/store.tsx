import { create } from "zustand";
import { getRequest, postRequest, patchRequest, deleteRequest } from "./utils";
import { ILang, LOCAL_STORAGE_KEY_LANG, langs } from "@/components/LangSwicher";
import Cookie from "js-cookie";
import {
  Partner,
  ResponsePartner,
} from "@/components/Dashboard/PartnersMain/types";

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
  provider: false,
  postUserRegistrationData: async (data: any) => {
    const isProvider = data.provider;
    const formData = new FormData();
    formData.append("insuranceStatement", data.insuranceStatement);
    formData.append("issuingAuthority", data.issuingAuthority);
    formData.append("tradeLicenseNumber", data.tradeLicenseNumber);
    formData.append("companyPhoto", data.companyPhoto);

    delete data.confirmPassword;
    delete data.privacy;

    delete data.insuranceStatement;
    delete data.issuingAuthority;
    delete data.tradeLicenseNumber;
    delete data.companyPhoto;

    delete data.license;
    postRequest({
      url: "auth/register",
      data,
    }).then((response) => {
      if (isProvider) {
        postRequest({
          url: `users/${response.data.id}/upload/file`,
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        }).then(() => {
          set(() => ({ registered: true, provider: true }));
        });
      } else {
        set(() => ({ registered: true }));
      }
    });
  },
  setRegistrationDefaults: () => set({ registered: false, provider: false }),
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
      Cookie.set("access_token", userData.data.access_token, {
        expires: new Date(Date.now() + 60 * 60 * 1000),
      });
      set(() => ({ user: userData?.data }));
    });
  },
  getUser: async () => {
    const id = localStorage.getItem("id");
    if (id)
      await getRequest({
        url: `/users/${id}`,
      }).then((userData: any) => {
        if (!userData) localStorage.removeItem("id");
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
    const { savedPartners, ...restData } = data;
    await patchRequest({
      url: `/users/${id}`,
      data: restData,
    }).then((userData: any) => {
      set((state: any) => ({ user: { ...state.user, ...userData?.data } }));
    });
  },
  uploadLogo: async (data: any) => {
    const id = localStorage.getItem("id");
    const formData = new FormData();
    formData.append("file", data);
    await postRequest({
      url: `/users/${id}/upload/logo`,
      data: formData,
    }).then((userData: any) => {
      set((state: any) => ({
        user: { ...state.user, companyPhoto: userData.data },
      }));
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
  logoutUser: async () => {
    await postRequest({
      url: "/auth/logout",
    }).then(() => {
      localStorage.removeItem("id");
      Cookie.remove("access_token");
      set(() => ({
        user: {},
      }));
    });
  },
  onSaveUserPartner: async (name: string) => {
    postRequest({
      url: `partners/${name}/save`,
    }).then((data) => {
      if (!data) return;

      set(({ user }: any) => {
        return {
          user: {
            ...user,
            savedPartners: [...user.savedPartners, data],
          },
        };
      });
    });
  },
  onDeleteSavedPartner: async (id: string) => {
    await deleteRequest({ url: `/partners/${id}/delete` }).then(
      ({ partnerId }) => {
        set(({ user }: any) => ({
          user: {
            ...user,
            savedPartners: user.savedPartners.filter(
              ({ id }: { id: string }) => id !== partnerId
            ),
          },
        }));
      }
    );
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

export const useReferralsStore = create((set) => ({
  referrals: {},
  isReferralsLoading: true,
  getAllReferrals: () => {
    set({ isReferralsLoading: true });
    return getRequest({
      url: "referals",
    })
      .then((referrals) => {
        set({ referrals });
      })
      .finally(() => set({ isReferralsLoading: false }));
  },
  postNewReferral: (data: any) => {
    set({ isReferralsLoading: true });

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("url", data.url);
    formData.append("file", data.picture);

    return postRequest({
      url: "referals",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((referrals) => {
        set({ referrals });
      })
      .finally(() => set({ isReferralsLoading: false }));
  },
  updateReferral: (data: any, id: string) => {
    set({ isReferralsLoading: true });

    const formData = new FormData();
    if (data.title) formData.append("title", data.title);
    if (data.url) formData.append("url", data.url);
    if (data.file) formData.append("file", data.file);

    return patchRequest({
      url: `referals/${id}`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    }).finally(() => set({ isReferralsLoading: false }));
  },
  updateAllReferrals: (data: any) => {
    set({ isReferralsLoading: true });

    return patchRequest({
      url: "referals/change-order",
      data,
    }).finally(() => set({ isReferralsLoading: false }));
  },
  updateReferralsViewCount: ({ value }: any) => {
    set({ isReferralsLoading: true });

    return patchRequest({
      url: `referals/view-count?value=${value}`,
    }).finally(() => set({ isReferralsLoading: false }));
  },
  updateReferralsIsRefInCatalog: (value: boolean) => {
    set({ isReferralsLoading: true });

    return patchRequest({
      url: `referals/is-in-catalog?value=${value}`,
    }).finally(() => set({ isReferralsLoading: false }));
  },
  deleteReferral: (id: string) => {
    set({ isReferralsLoading: true });

    return deleteRequest({
      url: `referals/${id}`,
    }).finally(() => set({ isReferralsLoading: false }));
  },
}));

export const useRoutesStore = create((set) => ({
  routes: [],
  isRoutesLoading: true,
  getRoutes: ({ page = 1, take = 5 }) => {
    set({ isRoutesLoading: true });
    return getRequest({
      url: "selected-orders",
      params: {
        page,
        take,
      },
    })
      .then((routes) => {
        set({ routes });
      })
      .finally(() => set({ isRoutesLoading: false }));
  },
  replyRoute: (id: string, data: any) => {
    set({ isRoutesLoading: true });

    const formData = {
      message: data.message,
      ...(data.reasons.length && {
        reasons: data.reasons,
      }),
    };

    return postRequest({
      url: `selected-orders/${id}/reply`,
      data: formData,
    }).finally(() => set({ isRoutesLoading: false }));
  },
  applyRoute: (id: string) => {
    set({ isRoutesLoading: true });

    return postRequest({
      url: `selected-orders/${id}/apply`,
    }).finally(() => set({ isRoutesLoading: false }));
  },
  deleteRoute: (id: string) => {
    set({ isRoutesLoading: true });

    return deleteRequest({
      url: `selected-orders/${id}`,
    }).finally(() => set({ isRoutesLoading: false }));
  },
}));

interface PartnersStoreState {
  partners: ResponsePartner[];
  isPartnersLoading: boolean;
  getPartnersApproved: () => Promise<void>;
  getPartnersInReview: () => Promise<void>;
  getPartnersNew: () => Promise<void>;
  approvePartner: (id: string) => Promise<void>;
  rejectPartner: (id: string) => Promise<void>;
  replyPartner: (id: string, message: string) => Promise<void>;
}

export const usePartnersStore = create<PartnersStoreState>((set) => ({
  partners: [],
  isPartnersLoading: true,
  getPartnersApproved: () => {
    set({ isPartnersLoading: true });
    return getRequest({
      url: "partners/approved",
    })
      .then((partners) => {
        set({ partners });
      })
      .finally(() => set({ isPartnersLoading: false }));
  },
  getPartnersInReview: () => {
    set({ isPartnersLoading: true });
    return getRequest({
      url: "partners/review",
    })
      .then((partners) => {
        set({ partners });
      })
      .finally(() => set({ isPartnersLoading: false }));
  },
  getPartnersNew: () => {
    set({ isPartnersLoading: true });
    return getRequest({
      url: "partners/new",
    })
      .then((partners) => {
        set({ partners });
      })
      .finally(() => set({ isPartnersLoading: false }));
  },
  approvePartner: (id: string) => {
    set({ isPartnersLoading: true });
    return postRequest({
      url: `partners/${id}/approve`,
    }).finally(() => set({ isPartnersLoading: false }));
  },
  rejectPartner: (id: string) => {
    set({ isPartnersLoading: true });
    return deleteRequest({
      url: `partners/${id}/reject`,
    }).finally(() => set({ isPartnersLoading: false }));
  },
  replyPartner: (id: string, message: string) => {
    set({ isPartnersLoading: true });
    return postRequest({
      url: `partners/${id}/review`,
      body: {
        message,
      },
    }).finally(() => set({ isPartnersLoading: false }));
  },
}));
