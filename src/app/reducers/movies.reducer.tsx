import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface InterfaceMovies {
  popular: {
    totalPages: number | null;
    results: any[];
  };
  currentMovie: null;
  search: {
    searchTotalPages: number | null;
    searchResults: any;
    query: string;
  };
  favorites: any [];
}

const initialState = {
  popular: {
    totalPages: null,
    results: [],
  },
  currentMovie: null,
  search: {
    searchTotalPages: null,
    searchResults: null,
    query: '',
  },
  favorites: [],
} as InterfaceMovies;

// const baseURL = process.env.REEACT_APP_BASEURL;
// const userId = process.env.REACT_APP_USERID;

export const fetchMoviesList = createAsyncThunk(
  "movies/fetchMoviesList",
  async (page: number = 1) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=5fa779a4386ad0ced03640ef7a6a0b37&page=${page}`
      //   ${baseURL}/3/movie/popular?api_key=${userId}&page=${page}
    )
      .then((res) => res.json())
      .then((json) => json);

      return {
        totalPages: response.total_pages,
        results: response.results,
      };
  }
);

export const fetchMoviesDescription = createAsyncThunk(
  "movies/fetchMoviesDescription",
  async (id: number) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=5fa779a4386ad0ced03640ef7a6a0b37`
      //   ${baseURL}/3/movie/popular?api_key=${userId}&page=${page}
    )
      .then((res) => res.json())
      .then((json) => json);

    return response;
  }
);

export const fetchMoviesSearch = createAsyncThunk(
  "movies/fetchMoviesSearch",
  async ({ query, page }: any) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie/?api_key=5fa779a4386ad0ced03640ef7a6a0b37&page=${page}&query=${query}&include_adult=true`
      //   ${baseURL}/3/movie/popular?api_key=${userId}&page=${page}
    )
      .then((res) => res.json())
      .then((json) => json);

    return {
      totalPages: response.total_pages,
      results: response.results,
      query,
    };
  }
);

export const fetchMoviesReceive = createAsyncThunk(
  "movies/fetchMoviesRecive",
  async ({query, page = 2}: any) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie/?api_key=5fa779a4386ad0ced03640ef7a6a0b37&page=${page}&query=${query}&include_adult=true`
      //   ${baseURL}/3/movie/popular?api_key=${userId}&page=${page}
    )
      .then((res) => res.json())
      .then((json) => json);

    return {
      totalPages: response.total_pages,
      results: response.results,
    };
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    ChangeFavorites(state, action: any) {
      const filmExsist = state.favorites.find((film: any) => {
        return film.id === action.payload.id;
      })
      if (filmExsist) {
        state.favorites = state.favorites.filter((film: any) => {
          return film.id !== filmExsist.id
        })
        return;
      }
        state.favorites.push(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMoviesList.fulfilled, (state, action) => {
      state.popular.results.push(...action.payload.results);
      state.popular.totalPages = action.payload.totalPages;
    });
    builder.addCase(fetchMoviesDescription.fulfilled, (state, action) => {
      state.currentMovie = { ...action.payload };
    });
    builder.addCase(fetchMoviesSearch.fulfilled, (state, action) => {
      state.search.searchResults = [...action.payload.results];
      state.search.searchTotalPages = action.payload.totalPages;
      state.search.query = action.payload.query;
    });
    builder.addCase(fetchMoviesReceive.fulfilled, (state, action) => {
      state.search.searchResults.push(...action.payload.results);
      state.search.searchTotalPages = action.payload.totalPages;
    });
  },
});

export const { ChangeFavorites } = moviesSlice.actions;
export default moviesSlice.reducer;
