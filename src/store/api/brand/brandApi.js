import { api } from '../../api/apiSlice';

const BRAND_URL = '/brand';

const brandApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all brands
    brands: build.query({
      query: () => ({
        url: BRAND_URL,
        method: 'GET',
      }),
      providesTags: ['brand'],
    }),

    // get single brand
    brand: build.query({
      query: (id) => ({
        url: `${BRAND_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['brand'],
    }),

    // add brand
    addBrand: build.mutation({
      query: (data) => ({
        url: `${BRAND_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['brand'],
    }),

    // update brand
    updateBrand: build.mutation({
      query: (data) => ({
        url: `${BRAND_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['brand'],
    }),

    // delete brand
    deleteBrand: build.mutation({
      query: (id) => ({
        url: `${BRAND_URL}/${id}`,
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
