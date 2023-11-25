import { api } from '../../api/apiSlice';

const ACCOUNT_HEAD_URL = '/account-head';

const accountHeadApi = api.injectEndpoints({
  endpoints: (build) => ({
    // create account head
    createAccountHead: build.mutation({
      query: (data) => ({
        url: `${ACCOUNT_HEAD_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['account-head'],
    }),

    // get account heads
    getAccountHeads: build.query({
      query: (params) => ({
        url: ACCOUNT_HEAD_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          accountHeads: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['account-head'],
    }),

    // update account head
    updateAccountHead: build.mutation({
      query: (data) => ({
        url: `${ACCOUNT_HEAD_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['account-head'],
    }),
  }),
});

export const {
  useCreateAccountHeadMutation,
  useGetAccountHeadsQuery,
  useUpdateAccountHeadMutation,
} = accountHeadApi;
