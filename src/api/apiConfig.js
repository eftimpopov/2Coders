const apiConfig = {
  baseURL: 'https://api.themoviedb.org/3/',
  API: 'f1a7cb9a9b05f295ebc827fd02a81aea',
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/{imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/{imgPath}`,
};

export default apiConfig;
