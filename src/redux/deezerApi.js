// src/redux/services/deezerApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const deezerApi = createApi({
  reducerPath: "deezerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.deezer.com",
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({
      query: () => "/chart",
    }),
    getSongsByGenre: builder.query({
      query: (genre) => `/genre/${genre}/artists`,
    }),
    getSongDetails: builder.query({
      query: (songId) => `/track/${songId}`,
    }),
    getArtistDetails: builder.query({
      query: (artistId) => `/artist/${artistId}`,
    }),
    getSongsByCountry: builder.query({
      query: (countryCode) => `/chart/country?country_code=${countryCode}`,
    }),
    getSongsBySearch: builder.query({
      query: (searchTerm) => `/search?q=${searchTerm}`,
    }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetSongsByGenreQuery,
  useGetSongDetailsQuery,
  useGetArtistDetailsQuery,
  useGetSongsByCountryQuery,
  useGetSongsBySearchQuery,
} = deezerApi;
