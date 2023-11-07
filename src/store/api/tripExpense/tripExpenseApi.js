import { api } from '../../api/apiSlice';

const TRIP_EXPENSE_URL = '/trip-expense';

const tripExpenseApi = api.injectEndpoints({
  endpoints: (build) => ({
    // create trip expense
    createTripExpense: build.query({
      query: (data) => ({
        url: `${TRIP_EXPENSE_URL}/create`,
        method: 'POST',
        data: data,
      }),
      providesTags: ['trip-expense'],
    }),

    // get trip expenses
    getTripExpenses: build.query({
      query: (arg) => ({
        url: TRIP_EXPENSE_URL,
        method: 'GET',
        params: arg,
      }),
      transformResponse: (response) => {
        return {
          tripExpenses: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['trip-expense'],
    }),

    // update trip expense
    updateTripExpense: build.mutation({
      query: (data) => ({
        url: `${TRIP_EXPENSE_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['trip-expense'],
    }),

    // delete expenses
    deleteTripExpense: build.mutation({
      query: (id) => ({
        url: `${TRIP_EXPENSE_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['trip-expense'],
    }),
  }),
});

export const {
  useCreateTripExpenseQuery,
  useGetTripExpensesQuery,
  useUpdateTripExpenseMutation,
  useDeleteTripExpenseMutation,
} = tripExpenseApi;
