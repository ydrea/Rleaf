import {
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://starigrad.agr.unizg.hr/qgis',
  }),
  methods: builder => ({
    getCapabilities: builder.query({
      query: () => '/wfs?getCapabilities',
    }),
  }),
});

export const { useGetCapabilitiesQuery } = apiSlice;
