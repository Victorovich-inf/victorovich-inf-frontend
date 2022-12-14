import {  $host } from './';
import $authHost from '../utils/axios';

export const defaultConfig = {
  headers: { 'Content-Type': 'application/json' },
};

export function CRUD(baseUrl) {
  const API = '';

  return {
    search: function(params = {}) {
      return parseResponse(
        $authHost.post(`${API}/${baseUrl}/query`, params, defaultConfig),
      );
    },
    get: function(id) {
      return parseResponse($authHost.get(`${API}/${baseUrl}/${id}`));
    },
    create: async function(data) {
      const result = await parseResponse(
        $authHost.post(`${API}/${baseUrl}`, data, defaultConfig),
      );
      return result;
    },
    edit: function(data) {
      return parseResponse(
        $authHost.put(`${API}/${baseUrl}`, data, defaultConfig),
      );
    },
    delete: function(id) {
      return parseResponse(
        $authHost.delete(`${API}/${baseUrl}`, { data: { id } }, defaultConfig),
      );
    },
    post: function(url, params = {}) {
      return parseResponse(
        $authHost.post(`${API}/${baseUrl}/${url}`, params, defaultConfig),
      );
    },
  };
}

export function parseResponse(promise) {
  return new Promise((resolve, reject) => {
    promise
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(parseError(error));
      });
  });
}

function parseError(error) {
  return (
    error.response?.data?.message ||
    (error.response?.data?.errors && error.response?.data?.errors?.length
      ? error.response.data.errors.join(', ')
      : error.message)
  );
}
