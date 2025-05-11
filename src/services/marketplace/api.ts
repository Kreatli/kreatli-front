import axios from 'axios';

import { Api } from '../../typings/marketplace/api';

const getHeaders = () => {
  const token = window.localStorage.getItem('token');

  return {
    Accept: 'application/json',
    ...(token && { Authorization: token }),
  };
};

const get = <T extends Api.Get>(path: T, params?: any) => {
  return axios.get<Api.GetResponse[T]>(`${process.env.MARKETPLACE_API_URL}${path}`, { params, headers: getHeaders() });
};

// @ts-ignore
const post = <T extends Api.Post>(path: T, data: Api.PostPayload[T], params?: any) => {
  // @ts-ignore
  return axios.post<Api.PostResponse[T]>(`${process.env.MARKETPLACE_API_URL}${path}`, data, {
    params,
    headers: getHeaders(),
  });
};

const put = <T extends Api.Put>(path: T, data: Api.PutPayload[T], params?: any) => {
  // @ts-ignore
  return axios.put<Api.PutResponse[T]>(`${process.env.MARKETPLACE_API_URL}${path}`, data, {
    params,
    headers: getHeaders(),
  });
};

const patch = <T extends Api.Put>(path: T, data: Api.PutPayload[T], params?: any) => {
  // @ts-ignore
  return axios.patch<Api.PutResponse[T]>(`${process.env.MARKETPLACE_API_URL}${path}`, data, {
    params,
    headers: getHeaders(),
  });
};

const axiosDelete = <T extends Api.Delete>(path: T, params?: any) => {
  return axios.delete<Api.DeleteResponse[T]>(`${process.env.MARKETPLACE_API_URL}${path}`, {
    params,
    headers: getHeaders(),
  });
};

export const api = {
  get,
  post,
  put,
  patch,
  delete: axiosDelete,
};
