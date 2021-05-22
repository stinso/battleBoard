import {
  BaseApiURLBS,
  BaseApiURLCS,
  CoinGeckoAPIURL,
  CookieName
} from './constants';
import ax from 'axios';
import Cookies from 'js-cookie';

export const nodeAxios = ax.create({
  baseURL: `${BaseApiURLBS}`,
  headers: {
    common: {
      'Content-Type': 'application/json'
    }
  },
  timeout: 50000
});

export const axiosCoinGecko = ax.create({
  baseURL: `${CoinGeckoAPIURL}`,
  timeout: 50000
});

export const nodeAxiosWithCredentials = ax.create({
  baseURL: `${BaseApiURLBS}`,
  headers: {
    common: {
      'Content-Type': 'application/json'
    }
  },
  withCredentials: true,
  timeout: 50000
});

export const nodeAxiosWithCredentialsCentralServer = ax.create({
  baseURL: `${BaseApiURLCS}`,
  headers: {
    common: {
      'Content-Type': 'application/json'
    }
  },
  withCredentials: true,
  timeout: 50000
});

export const nodeAxiosForXbox = ax.create({
  baseURL: `${BaseApiURLBS}`,
  headers: {
    common: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
      Host: 'login.live.com',
      verify: 'False',
      'Access-Control-Allow-Origin': '*'
    }
  }
});

export const nodeAxiosForXboxUserName = ax.create({
  baseURL: `${BaseApiURLBS}`,
  timeout: 50000
});

export const formDataAxiosService = ax.create({
  baseURL: `${BaseApiURLBS}`,
  headers: {
    'content-type': 'multipart/form-data'
  },
  withCredentials: true,
  timeout: 50000
});

export const formDataAxiosServiceCentralServer = ax.create({
  baseURL: `${BaseApiURLCS}`,
  headers: {
    'content-type': 'multipart/form-data'
  },
  withCredentials: true,
  timeout: 50000
});

//In case we get 401 from server logout the user and redirect to login middleware
nodeAxiosWithCredentials.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      console.log('config->err->here', err);
      logout();
    } else if (err?.response?.status === 500) {
      Sentry.captureException(err, {
        tags: {
          page: '500',
          occuredAt:
            'file: axios.js ~ line 87 ~ nodeAxiosWithCredentials interceptors'
        }
      });
    }
    throw err;
  }
);

formDataAxiosService.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      console.log('config->err->here', err);
      logout();
    } else if (err?.response?.status === 500) {
      Sentry.captureException(err, {
        tags: {
          page: '500',
          occuredAt:
            'file: axios.js ~ line 107 ~ formDataAxiosService interceptors'
        }
      });
    }
    throw err;
  }
);

formDataAxiosServiceCentralServer.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      console.log('config->err->here', err);
      logout();
    } else if (err?.response?.status === 500) {
      Sentry.captureException(err, {
        tags: {
          page: '500',
          occuredAt:
            'file: axios.js ~ line 126 ~ formDataAxiosServiceCentralServer interceptors'
        }
      });
    }
    throw err;
  }
);

nodeAxiosWithCredentialsCentralServer.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      console.log('config->err->here', err);
      logout();
    } else if (err?.response?.status === 500) {
      Sentry.captureException(err, {
        tags: {
          page: '500',
          occuredAt:
            'file: axios.js ~ line 144 ~ nodeAxiosWithCredentialsCentralServer interceptors'
        }
      });
    }
    throw err;
  }
);

const initialState = {
  user: {
    isLoggedIn: false
  }
};

const logout = () => {
  global.localStorage.setItem('user', JSON.stringify(initialState));
  Cookies.remove(CookieName);
};
