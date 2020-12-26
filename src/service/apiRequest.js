import axios from 'axios';

const apiRequest = {
  // API_KEY: '9bc134247462ae6a5927de0341a3dea9',
  API_KEY: '132f2a543c82d69a556f0bb280a697a7',
  BASE_URL: 'https://api.themoviedb.org/3',
  page: 1,
  reviewPage: 1,

  defaultPage() {
    this.page = 1;
  },

  setPage(pageValue) {
    this.page = pageValue;
  },

  searchFilms(query) {
    return axios
      .get(
        `${this.BASE_URL}/search/movies?api_key=${this.API_KEY}&query=${query}`,
      )
      .then(({ data }) => {
        return data;
      })
      .catch(err => {
        throw err;
      });
  },

  getFilmById(id) {
    return axios
      .get(`${this.BASE_URL}/movie/${id}?api_key=${this.API_KEY}`)
      .then(({ data }) => {
        return data;
      })
      .catch(err => {
        throw err;
      });
  },

  getTrendFilms() {
    return axios
      .get(
        `${this.BASE_URL}/trending/movie/day?api_key=${this.API_KEY}&page=${this.page}`,
      )
      .then(({ data }) => {
        return data;
      })
      .catch(err => {
        throw err;
      });
  },

  getReview(id) {
    return axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${this.API_KEY}&language=en-US&page=${this.reviewPage}`,
      )
      .then(({ data }) => {
        return data;
      })
      .catch(err => {
        throw err;
      });
  },

  getImgURL(size = 'original', url) {
    return `https://image.tmdb.org/t/p/${size}${url}`;
  },

  getApiConfig() {
    return axios.get(
      `https://api.themoviedb.org/3/configuration?api_key=${this.API_KEY}`,
    );
  },

  getApiGenresList() {
    return axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${this.API_KEY}&language=en-US`,
    );
  },
};

export default apiRequest;
