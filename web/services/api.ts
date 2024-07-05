import axios from 'axios';
import Cookies from 'js-cookie';
import { API_BASE_URL } from '@/config';

interface ApiConfig {
    method: string;
    url: string;
    data: any;
    headers?: Record<string, any>;
    withCredentials?: boolean;
}

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        common: {
            'Content-Type': 'application/json',
            'Accept'      : 'application/json'
        },
    },
    withCredentials: true 
});

const createRequest = async (config: ApiConfig) => {
    const response = await api(config);
    return response.data;
};

export const get = (endpoint: string, data : any = {}, headers = {}) => {
    return createRequest({ 
      method: 'get',
      url: endpoint,
      data,
      headers: {
        ...api.defaults.headers.common,
        ...headers,
      },
    });
};

export const post = (endpoint: string, data: any, headers = {}) => {
  const csrfToken = Cookies.get('XSRF-TOKEN');
  return createRequest({
    method: 'post',
    url: endpoint,
    data,
    headers: {
      ...api.defaults.headers.common,
      ...headers,
      'X-CSRF-TOKEN': csrfToken
    },
  });
};
