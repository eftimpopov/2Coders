import axiosClient from './axiosClient';
import apiConfig from './apiConfig';

export const category = {
  movie: 'movie',
  tv: 'tv',
};

export const movieType = {
  upcoming: 'upcoming',
  popular: 'popular',
  top_rated: 'top_rated',
};

export const tvType = {
  popular: 'popular',
  top_rated: 'top_rated',
  on_the_air: 'on_the_air',
};

const tmdbApi = {
  getMoviesList: (type, params) => {
    const url = 'movie/' + movieType[type];
    return axiosClient.get(url, params);
  },
  getTvList: (type, params) => {
    const url = 'tv/' + tvType[type];
    return axiosClient.get(url, params);
  },
  getVideos: (cate, id) => {
    const url = category[cate] + '/' + id + '/videos';
    return axiosClient.get(url, { params: {} });
  },
  search: (cate, params) => {
    const url = 'search/' + category[cate];
    return axiosClient.get(url, params);
  },
  detail: (cate, id, params) => {
    const url = category[cate] + '/' + id;
    return axiosClient.get(url, params);
  },
  credits: (cate, id) => {
    const url = category[cate] + '/' + id + '/credits';
    return axiosClient.get(url, { params: {} });
  },
  similar: (cate, id) => {
    const url = category[cate] + '/' + id + '/similar';
    return axiosClient.get(url, { params: {} });
  },
  getToken: () => {
    const url = '/authentication/token/new';
    return axiosClient.get(url, { params: {} });
  },
  loginWithUser: (params) => {
    const url =
      '/authentication/token/validate_with_login?api_key=f1a7cb9a9b05f295ebc827fd02a81aea';
    return axiosClient.post(url, params);
  },
  createSessionId: (params) => {
    const url =
      '/authentication/session/new?api_key=f1a7cb9a9b05f295ebc827fd02a81aea';
    return axiosClient.post(url, params);
  },
  rate: (cate, movie_id, session_id, params) => {
    const url = `/${category[cate]}/${movie_id}/rating?session_id=${session_id}&api_key=f1a7cb9a9b05f295ebc827fd02a81aea`;
    return axiosClient.post(url, params);
  },
};

export default tmdbApi;
