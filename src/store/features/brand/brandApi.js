import { api } from '../../api/apiSlice';

const BRAND_URL = '/brand';

const brandApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all brands
    brands: build.query({
      query: (token) => ({
        url: BRAND_URL,
        headers: { authorization: token },
        method: 'GET',
      }),
      providesTags: ['brand'],
    }),

    // get single brand
    brand: build.query({
      query: (params) => ({
        url: `${BRAND_URL}/${params?.id}`,
        headers: { authorization: params?.token },
        method: 'GET',
      }),
      providesTags: ['brand'],
    }),

    // add brand
    addBrand: build.mutation({
      query: (params) => ({
        url: `${BRAND_URL}/create`,
        headers: { authorization: params?.token },
        method: 'POST',
        body: params?.data,
      }),
      invalidatesTags: ['brand'],
    }),

    // update brand
    updateBrand: build.mutation({
      query: (params) => ({
        url: `${BRAND_URL}/${params?.id}`,
        headers: { authorization: params?.token },
        method: 'PATCH',
        body: params?.data,
      }),
      invalidatesTags: ['brand'],
    }),

    // delete brand
    deleteBrand: build.mutation({
      query: (params) => ({
        url: `${BRAND_URL}/${params?.id}`,
        headers: { authorization: params?.token },
        method: 'DELETE',
      }),
      invalidatesTags: ['brand'],
    }),
  }),
});

export const {
  useBrandsQuery,
  useBrandQuery,
  useAddBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
} = brandApi;
