import { api } from '../../api/apiSlice';

const EXPENSE_URL = '/expense';

const expenseApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all expenses
    getExpenses: build.query({
      query: (params) => ({
        url: EXPENSE_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          expenses: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['expense'],
    }),

    // add expense
    addExpense: build.mutation({
      query: (data) => ({
        url: `${EXPENSE_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['expense'],
    }),

    // update expense
    updateExpense: build.mutation({
      query: (data) => ({
        url: `${EXPENSE_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['expense'],
    }),

    // delete expense
    deleteExpense: build.mutation({
      query: (id) => ({
        url: `${EXPENSE_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['expense'],
    }),
  }),
});

export const {
  useGetExpensesQuery,
  useAddExpenseMutation,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
} = expenseApi;
