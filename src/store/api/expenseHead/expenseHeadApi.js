import { api } from '../../api/apiSlice';

const EXPENSE_HEAD_URL = '/expense-head';

const expenseHeadApi = api.injectEndpoints({
  endpoints: (build) => ({
    // create expense head
    createExpenseHead: build.mutation({
      query: (data) => ({
        url: `${EXPENSE_HEAD_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['expense-head'],
    }),

    // get expense heads
    getExpenseHeads: build.query({
      query: (params) => ({
        url: EXPENSE_HEAD_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          expenseHeads: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['expense-head'],
    }),

    // update expense head
    updateExpenseHead: build.mutation({
      query: (data) => ({
        url: `${EXPENSE_HEAD_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['expense-head'],
    }),
  }),
});

export const {
  useCreateExpenseHeadMutation,
  useGetExpenseHeadsQuery,
  useUpdateExpenseHeadMutation,
} = expenseHeadApi;
