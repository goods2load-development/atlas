import { create } from "zustand";
import {
  getRequest,
  postRequest,
  patchRequest,
  deleteRequest,
  putRequest,
} from "./utils";
import { ILang, LOCAL_STORAGE_KEY_LANG, langs } from "@/components/LangSwicher";
import Cookie from "js-cookie";
import {
  PartnerPageResponse,
  ResponsePartner,
} from "@/components/Dashboard/PartnersMain/types";
import { Blog, BlogComment } from "@/components/Dashboard/BlogMain/types";
import {
  FooterItem,
  HeaderFooterData,
} from "@/components/Dashboard/HeaderFooterMain/types";

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
      data: {
        ...restData,
      },
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
    formData.append("smallBanner", data.smallBanner);
    formData.append("bigBanner", data.bigBanner);

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

export const usePriceAlertsStore = create((set) => ({
  priceAlerts: [],
  isPriceAlertLoading: false,

  getPriceAlerts: ({ page = 1, take = 5 }) => {
    set({ isPriceAlertLoading: true });
    return getRequest({
      url: "alerts",
      params: {
        page,
        take,
      },
    })
      .then((priceAlerts) => {
        console.log(priceAlerts);
        set({ priceAlerts });
      })
      .finally(() => set({ isPriceAlertLoading: false }));
  },

  replyPriceAlerts: (id: string, message: string) => {
    set({ isPriceAlertLoading: true });
    return postRequest({
      url: `alerts/${id}/reply`,
      data: { message },
    }).finally(() => set({ isPriceAlertLoading: false }));
  },

  sendPriceAlert: (id: string) => {
    set({ isPriceAlertLoading: true });
    return postRequest({ url: `alerts/${id}/send` }).finally(() =>
      set({ isPriceAlertLoading: false })
    );
  },
  deletePriceAlert: (id: string) => {
    set({ isPriceAlertLoading: true });
    return deleteRequest({ url: `alerts/${id}` }).finally(() =>
      set({ isPriceAlertLoading: false })
    );
  },
}));

interface PartnersStoreState {
  partners: ResponsePartner[];
  partnerPage: PartnerPageResponse | null;
  isPartnersLoading: boolean;
  getPartnersApproved: () => Promise<void>;
  getPartnersInReview: () => Promise<void>;
  getPartnersNew: () => Promise<void>;
  approvePartner: (id: string) => Promise<void>;
  rejectPartner: (id: string) => Promise<void>;
  replyPartner: (id: string, message: string) => Promise<void>;
  createPartnerPage: (data: any, id: string) => Promise<void>;
  getPartnersPage: (id: string) => Promise<void>;
}

export const usePartnersStore = create<PartnersStoreState>((set) => ({
  partners: [],
  partnerPage: null,
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
  createPartnerPage: (data: any, id: string) => {
    set({ isPartnersLoading: true });
    return postRequest({
      url: `partners/${id}/information`,
      data,
      headers: { "Content-Type": "multipart/form-data" },
    }).finally(() => set({ isPartnersLoading: false }));
  },
  getPartnersPage: (id: string) => {
    set({ isPartnersLoading: true });
    return getRequest({
      url: `partners/${id}/information`,
    })
      .then((data) => set({ partnerPage: data }))
      .finally(() => set({ isPartnersLoading: false }));
  },
}));

interface BlogAdminStoreState {
  blogs: {
    data: Blog[];
    meta: any;
  } | null;
  foundBlogs: {
    data: Blog[];
    meta: any;
  } | null;
  blog: Blog | null;
  categories: any[];
  comments: BlogComment[];
  unapprovedComments: BlogComment[];
  isBlogLoading: boolean;
  createBlog: (data: any) => Promise<void>;
  updateBlog: (data: any, id: string) => Promise<void>;
  getBlogCategories: () => Promise<void>;
  getBlogs: ({ page, take }: { page?: number; take?: number }) => Promise<void>;
  getBlog: (id: string) => Promise<void>;
  deleteBlog: (id: string) => Promise<void>;
  getCommentsById: (id: string) => Promise<void>;
  getUnapprovedComments: () => Promise<void>;
  deleteCommentById: (id: string) => Promise<void>;
  approveComment: (id: string) => Promise<void>;
  createBlogCategory: (data: {
    name: string;
    description: string;
  }) => Promise<void>;
  updateBlogCategory: (
    data: {
      name: string;
      description: string;
    },
    id: string
  ) => Promise<void>;
  deleteBlogCategory: (id: string) => Promise<void>;
  searchBlogs: (data: {
    searchTerm: string;
    page?: number;
    take?: number;
  }) => Promise<void>;
}

export const useBlogAdminStore = create<BlogAdminStoreState>((set) => ({
  blogs: null,
  blog: null,
  foundBlogs: null,
  categories: [],
  comments: [],
  unapprovedComments: [],
  isBlogLoading: true,
  createBlog: (data: any) => {
    set({ isBlogLoading: true });
    const formData = new FormData();

    formData.append("authorName", data.authorName);
    formData.append("blogTypeId", data.blogTypeId);
    formData.append("content", data.content);
    formData.append("description", data.description);
    formData.append("slug", data.slug);
    formData.append("title", data.title);
    formData.append("mainImg", data.mainImg[0]);

    return postRequest({
      url: "blogs",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((blogs) => {
        set({ blogs });
      })
      .finally(() => set({ isBlogLoading: false }));
  },
  updateBlog: (data: any, id: string) => {
    const formData = new FormData();

    formData.append("authorName", data.authorName);
    formData.append("blogTypeId", data.blogTypeId);
    formData.append("content", data.content);
    formData.append("description", data.description);
    formData.append("slug", data.slug);
    formData.append("title", data.title);
    if (typeof data.mainImg !== "string")
      formData.append("mainImg", data.mainImg[0]);

    set({ isBlogLoading: true });
    return patchRequest({
      url: `blogs/${id}`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    }).finally(() => set({ isBlogLoading: false }));
  },
  getBlogs: ({ page = 1, take = 5 }) => {
    set({ isBlogLoading: true });
    return getRequest({
      url: "blogs?filter=Newest",
      params: {
        page,
        take,
      },
    })
      .then((blogs) => {
        set({ blogs });
      })
      .finally(() => set({ isBlogLoading: false }));
  },
  getBlog: (slug: string) => {
    set({ isBlogLoading: true });
    return getRequest({
      url: `blogs/${slug}`,
    })
      .then((blog) => {
        set({ blog });
      })
      .finally(() => set({ isBlogLoading: false }));
  },
  deleteBlog: (id: string) => {
    set({ isBlogLoading: true });
    return deleteRequest({
      url: `blogs/${id}`,
    }).finally(() => set({ isBlogLoading: false }));
  },
  getCommentsById: (id: string) => {
    set({ isBlogLoading: true });
    return getRequest({
      url: `blog-comments/${id}/approved`,
    })
      .then((comments) => {
        set({ comments });
      })
      .finally(() => set({ isBlogLoading: false }));
  },
  deleteCommentById: (id: string) => {
    set({ isBlogLoading: true });
    return deleteRequest({
      url: `blog-comments/${id}`,
    }).finally(() => set({ isBlogLoading: false }));
  },
  getUnapprovedComments: () => {
    set({ isBlogLoading: true });
    return getRequest({
      url: `blog-comments/unapproved`,
    })
      .then((unapprovedComments) => {
        set({ unapprovedComments });
      })
      .finally(() => set({ isBlogLoading: false }));
  },
  approveComment: (id: string) => {
    set({ isBlogLoading: true });
    return patchRequest({
      url: `blog-comments/${id}/approve`,
      data: {
        approved: true,
      },
    }).finally(() => set({ isBlogLoading: false }));
  },
  getBlogCategories: () => {
    set({ isBlogLoading: true });
    return getRequest({
      url: "blog-types",
    })
      .then((categories) => {
        set({ categories });
      })
      .finally(() => set({ isBlogLoading: false }));
  },
  createBlogCategory: (data) => {
    set({ isBlogLoading: true });
    return postRequest({
      url: "blog-types",
      data,
    }).finally(() => set({ isBlogLoading: false }));
  },
  updateBlogCategory: (data, id) => {
    set({ isBlogLoading: true });
    return patchRequest({
      url: `blog-types/${id}`,
      data,
    }).finally(() => set({ isBlogLoading: false }));
  },
  deleteBlogCategory: (id: string) => {
    set({ isBlogLoading: true });
    return deleteRequest({
      url: `blog-types/${id}`,
    }).finally(() => set({ isBlogLoading: false }));
  },
  searchBlogs: ({ page = 1, take = 5, searchTerm }) => {
    set({ isBlogLoading: true });
    return getRequest({
      url: `blogs`,
      params: {
        searchTerm,
        page,
        take,
      },
    })
      .then((foundBlogs) => {
        set({ foundBlogs });
      })
      .finally(() => set({ isBlogLoading: false }));
  },
}));

interface FooterStoreState {
  footerData: HeaderFooterData | null;
  headerData: HeaderFooterData | null;
  isFooterLoading: boolean;
  isHeaderLoading: boolean;
  getFooterData: () => Promise<void>;
  getHeaderData: () => Promise<void>;
  updateHeaderFooterData: (id: string, data: FooterItem[]) => Promise<void>;
}

export const useFooterHeaderStore = create<FooterStoreState>((set) => ({
  footerData: null,
  headerData: null,
  isFooterLoading: true,
  isHeaderLoading: true,
  getFooterData: () => {
    set({ isFooterLoading: true });
    return getRequest({
      url: "dynamic-menu/footer",
    })
      .then((footerData) => {
        set({ footerData });
      })
      .finally(() => set({ isFooterLoading: false }));
  },
  getHeaderData: () => {
    set({ isHeaderLoading: true });
    return getRequest({
      url: "dynamic-menu/header",
    })
      .then((headerData) => {
        set({ headerData });
      })
      .finally(() => set({ isHeaderLoading: false }));
  },
  updateHeaderFooterData: (id, data) => {
    set({ isHeaderLoading: true, isFooterLoading: true });
    return putRequest({
      url: `dynamic-menu/${id}`,
      data,
    })
      .then((headerData) => {
        set({ headerData });
      })
      .finally(() => set({ isHeaderLoading: false, isFooterLoading: false }));
  },
}));

export const useTemplatesStore = create((set) => ({
  templatesData: null,
  isTemplatesLoading: false,
  getTemplates: (page = 1, take = 5, searchTerm = "") => {
    set({ isTemplatesLoading: true });
    return getRequest({
      url: "seo-pages",
      params: {
        page,
        take,
        searchTerm: searchTerm ? searchTerm : null,
      },
    })
      .then((templatesData) => {
        set({ templatesData });
      })
      .finally(() => {
        set({ isTemplatesLoading: false });
      });
  },

  onCreateTemplatePage: (data: any) => {
    return postRequest({
      url: "seo-pages",
      data,
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  onDeleteTemplatePage: (id: string) => {
    return deleteRequest({
      url: `seo-pages/${id}`,
    });
  },
}));
