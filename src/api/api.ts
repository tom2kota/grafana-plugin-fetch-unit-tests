import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://api.giphy.com/v1/'
});

instance.interceptors.request.use(config => {
  config.params = {
    api_key: 'GgaqOqSSgLYh784IbcmI9dJXqMKdUUUa',
    ...config.params
  }
  return config
});
