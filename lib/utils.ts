import axios from 'axios';
import { type ClassValue, clsx } from 'clsx';
import { format } from 'date-fns';
import countries from 'i18n-iso-countries';
import Cookie from 'js-cookie';
import { signOut } from 'next-auth/react';
import { twMerge } from 'tailwind-merge';

countries.registerLocale(require('i18n-iso-countries/langs/en.json'));

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL + 'api/';
axios.defaults.withCredentials = true;

async function handleTokenRefresh(originalRequest: any) {
  originalRequest._retry = true;

  try {
    const response = await axios.post(`/auth/refresh`);
    if (response.status === 201) {
      Cookie.set('access_token', response.data.access_token, {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      });

      originalRequest.headers['Authorization'] =
        `Bearer ${response.data.access_token}`;

      return axios(originalRequest);
    } else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    return Promise.reject(error);
  }
}

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.data.message ===
        'Your email address is already on our magic list' &&
      !originalRequest._retry
    ) {
      return;
    }

    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 403 &&
      error.response.data.message === 'jwt expired' &&
      !originalRequest._retry
    ) {
      return handleTokenRefresh(originalRequest);
    }

    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data.message === 'Invalid token' &&
      !originalRequest._retry
    ) {
      signOut({ callbackUrl: '/' });
      localStorage.removeItem('id');
      Cookie.remove('access_token');
      return;
    }

    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    window.dispatchEvent(new CustomEvent('errorHandler', { detail: error }));
    return error;
  },
);

export function getRequest(params: any) {
  return axios.get(params.url, { ...params }).then(function (response: any) {
    return response.data;
  });
}

export function putRequest(params: any) {
  return axios
    .put(params.url, params.data, {
      ...params,
    })
    .then(function (response: any) {
      return response.data;
    });
}

export function postRequest(params: any) {
  return axios
    .post(params.url, params.data, {
      ...params,
    })
    .then(function (response: any) {
      return response.data;
    });
}

export function patchRequest(params: any) {
  return axios.patch(params.url, params.data).then(function (response: any) {
    return response.data;
  });
}

export function deleteRequest(params: any) {
  return axios.delete(params.url, params.data).then(function (response: any) {
    return response.data;
  });
}

export const generateBlockId = (title?: string) =>
  title
    ?.replace(/ /g, '-')
    .replace(/[\s’?*()]/g, '')
    .toLowerCase() || '';

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export const removeEqualFields = <T extends Record<string, any>>(
  obj1: T,
  obj2: T,
): T => {
  const result = { ...obj2 };
  for (const key in result) {
    if (obj1[key] === result[key]) {
      delete result[key];
    }
  }
  return result;
};

export const isUserAdmin = (role: string) => role === 'admin';
export const isUser = (role: string) => role === 'user';
export const isUserProvider = (role: string) => role === 'provider';
export const isUserEditor = (role: string) => role === 'editor';

export const toNormalText = (input: string) => {
  const camelToSpace = input.replace(/([a-z])([A-Z])/g, '$1 $2');

  const snakeToSpace = camelToSpace.replace(/_/g, ' ');

  return snakeToSpace.charAt(0).toUpperCase() + snakeToSpace.slice(1);
};

export const countVolume = (width: number, length: number, height: number) => {
  return width * height * length;
};

export const filterByField = (arr: any[], field: string, value: string) => {
  if (!arr?.length) return arr;
  return arr.filter((item) =>
    item[field].toString().toLowerCase().includes(value.toLowerCase()),
  );
};

export const addToFileList = (fileList: FileList, newFile: File) => {
  const dataTransfer = new DataTransfer();

  for (let i = 0; i < fileList.length; i++) {
    dataTransfer.items.add(fileList[i]);
  }
  dataTransfer.items.add(newFile);

  return dataTransfer.files;
};

export const removeFileFromFileList = (index: number, fileList: FileList) => {
  const dt = new DataTransfer();

  for (let i = 0; i < fileList.length; i++) {
    const file = fileList[i];
    if (index !== i) {
      dt.items.add(file);
    }
  }

  return dt.files;
};

export const getRandomHexColor = () =>
  `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;

export const urlToFile = async (
  url: string,
  filename: string,
  mimeType: string,
) => {
  const response = await fetch(url);
  const blob = await response.blob();

  const file = new File([blob], filename, { type: mimeType });

  return file;
};

export const urlsToFileList = async (urls: string[]) => {
  const filesArray = await Promise.all(
    urls.map(async (url, index) => {
      const mimeType = `image/${url.split('.').at(-1)}`;
      return await urlToFile(
        url,
        `file${index + 1}.${mimeType.split('/')[1]}`,
        mimeType,
      );
    }),
  );

  const dataTransfer = new DataTransfer();
  filesArray.forEach((file) => dataTransfer.items.add(file));

  return dataTransfer.files;
};

export const formatDate = (dateString: string): string => {
  return format(new Date(dateString), 'dd MMM yyyy');
};

export const filterRoutes = (routes: string[]) =>
  routes.filter(
    (route) =>
      !route.includes('dashboard') && !route.includes('[') && route !== '/',
  );

export async function getAllRoutes() {
  try {
    const response = await fetch(`/sitemap.xml`);
    const xmlText = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'application/xml');

    const urlNodes = xmlDoc.getElementsByTagName('url');

    const routes = Array.from(urlNodes)
      .map((urlNode) => {
        const loc = urlNode.getElementsByTagName('loc')[0]?.textContent;
        if (loc) {
          const url = new URL(loc);
          return url.pathname;
        }
        return null;
      })
      .filter(Boolean) as string[];

    return filterRoutes(routes);
  } catch (error) {
    console.error('Error fetching sitemap:', error);
    return [];
  }
}
export function sortByRegion(countries: any) {
  return countries.reduce((acc: any, country: any) => {
    const region = country.subregion;
    if (!acc[region]) {
      acc[region] = [];
    }
    acc[region].push(country);
    return acc;
  }, {});
}

export function checkAdministrativeDivision(name: string) {
  const prefixes = [
    'state',
    'region',
    'county',
    'emirate',
    'canton',
    'kanton',
    'district', // используется во многих странах
    'province', // используется в разных странах (например, Канада, Китай)
    'provincia', // испаноязычные страны (например, Испания, Аргентина)
    'department',
    'région',
    'governorate',
    'muḩāfaz̧at',
    'territory',
    'prefecture',
    'oblast',
    'krai',
    'regionale',
    'voivodeship',
    'republic',
    'democratic republic',
    'autonomous region',
    'territorial unit',
    'municipality',
    'federation',
    'province',
    'zoned area',
    'municipal area',
    'division',
    'commune',
    'borough',
    'subregion',
    'municipio',
    'shire',
    'municipio',
    'regency',
    'clerkship',
    'province',
    'district',
    'capital territory',
  ];
  const nameLowerCase = name.toLowerCase();

  const containsPrefix = prefixes.some((prefix) =>
    nameLowerCase.includes(prefix),
  );

  if (!containsPrefix) {
    return `${name} Administrative division`;
  }
  return name;
}

export function getCountryIsoByName(countryName: string) {
  const isoCode = countries.getAlpha2Code(countryName, 'en');
  return isoCode || null;
}

export function slugify(str: string, toSlug: boolean = true) {
  if (toSlug) {
    str = str.replace(/^\s+|\s+$/g, '');
    str = str.toLowerCase();
    str = str
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
    return str;
  } else {
    return str
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }
}
