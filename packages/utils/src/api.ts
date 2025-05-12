import axios from 'axios';

const API = axios.create({
  // eslint-disable-next-line turbo/no-undeclared-env-vars
  baseURL: process.env.DEV_API,
  // baseURL: process.env.PRODUCTION_API, //production api
  withCredentials: true,
});

export default API;