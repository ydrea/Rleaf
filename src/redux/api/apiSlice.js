import {
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://starigrad.agr.unizg.hr/geoserver',
  }),
  // tagTypes: ['Data'],
  endpoints: builder => ({
    getCapabilities: builder.query({
      query: () =>
        '/wfs?SERVICE=WFS&VERSION=1.0.0&REQUEST=GetFeature&TYPENAME=qgis2webtest:kopnena_stanista_2016&SRSNAME=EPSG:4326&outputFormat=application/JSON',
      // &outputFormat=text%2Fjavascript&format_options=callback%3Agetkopnena_stanista_2016_0Json',
      // '/wfs?SERVICE=WFS&VERSION=2.0.0&REQUEST=GetFeature&TYPENAME=qgis2webtest:kopnena_stanista_2016&outputFormat=application/json&srsName=epsg:4326',
      // providesTags: ['Data'],
    }),
  }),
});

export const { useGetCapabilitiesQuery } = apiSlice;
