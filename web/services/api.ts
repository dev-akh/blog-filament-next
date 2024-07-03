import axios from 'axios';
import { API_BASE_URL } from '@/config';

interface ApiConfig {
    method: string;
    url: string;
    data: any;
    headers?: Record<string, any>;
}

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        common: {
            'Content-Type': 'application/json',
        },
    },
});

const createRequest = async (config: ApiConfig) => {
    const response = await api(config);
    return response.data;
};

export const get = (endpoint: string, data : any = {}) => {
    return createRequest({ method: 'get', url: endpoint, data });
};

export const post = (endpoint: string, data: any, headers = {}) => {
  return createRequest({
    method: 'post',
    url: endpoint,
    data,
    headers: {
      ...api.defaults.headers.common,
      ...headers,
    },
  });
};
