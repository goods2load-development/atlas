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
    // TODO add error handling
    return error;
  }
);

export function get(params: any) {
  return axios
    .get(params.url, { ...params })
    .then(function (response: any) {
      console.log("response", response);
      return response.data;
    })
    .catch(function (error: any) {
      console.log(error);
      // TODO add toast messages
    });
}

export function post(params: any) {
  return axios
    .post(params.url, params.data, {
      ...params,
    })
    .then(function (response: any) {
      console.log("response", response);
      return response.data;
    })
    .catch(function (error: any) {
      console.log(error);
      // TODO add toast messages
    });
}

export function patch(params: any) {
  return axios
    .patch(params.url, params.data)
    .then(function (response: any) {
      console.log("response", response);
      return response.data;
    })
    .catch(function (error: any) {
      console.log(error);
      // TODO add toast messages
    });
}

export function deleteRequest(params: any) {
  return axios
    .delete(params.url, params.data)
    .then(function (response: any) {
      return response.data;
    })
    .catch(function (error: any) {
      console.log(error);
      // TODO add toast messages
    });
}
