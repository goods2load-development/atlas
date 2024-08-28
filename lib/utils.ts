import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL + "api/";
axios.defaults.withCredentials = true;

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    window.dispatchEvent(new CustomEvent("errorHandler", { detail: error }));
    return error;
  }
);

export function getRequest(params: any) {
  return axios.get(params.url, { ...params }).then(function (response: any) {
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
    ?.replace(/ /g, "-")
    .replace(/[\s’?*()]/g, "")
    .toLowerCase() || "";

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
  obj2: T
): T => {
  const result = { ...obj2 };
  for (const key in result) {
    if (obj1[key] === result[key]) {
      delete result[key];
    }
  }
  return result;
};

export const isUserAdmin = (role: string) => role === "admin";
export const isUser = (role: string) => role === "user";
export const isUserProvider = (role: string) => role === "provider";

export const toNormalText = (input: string) => {
  const camelToSpace = input.replace(/([a-z])([A-Z])/g, "$1 $2");

  const snakeToSpace = camelToSpace.replace(/_/g, " ");

  return snakeToSpace.charAt(0).toUpperCase() + snakeToSpace.slice(1);
};

export const countVolume = (width: number, length: number, height: number) => {
  return width * height * length;
};

export const filterByField = (arr: any[], field: string, value: string) => {
  if (!arr?.length) return arr;
  return arr.filter((item) =>
    item[field].toString().toLowerCase().includes(value.toLowerCase())
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
    .padStart(6, "0")}`;
