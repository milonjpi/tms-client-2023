import { api } from '../../api/apiSlice';

const INCOME_HEAD_URL = '/income-head';

const incomeHeadApi = api.injectEndpoints({
  endpoints: (build) => ({
    // create income head
    createIncomeHead: build.mutation({
      query: (data) => ({
        url: `${INCOME_HEAD_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['income-head'],
    }),

    // get income heads
    getIncomeHeads: build.query({
      query: (params) => ({
        url: INCOME_HEAD_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          incomeHeads: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['income-head'],
    }),

    // update income head
    updateIncomeHead: build.mutation({
      query: (data) => ({
        url: `${INCOME_HEAD_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['income-head'],
    }),
  }),
});

export const {
  useCreateIncomeHeadMutation,
  useGetIncomeHeadsQuery,
  useUpdateIncomeHeadMutation,
} = incomeHeadApi;
