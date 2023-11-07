import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { setToast } from 'store/toastSlice';
import { useCreateTripExpenseMutation } from 'store/api/tripExpense/tripExpenseApi';
import ControlledAutoComplete from 'ui-component/form-components/ControlledAutoComplete';
import { useTripsQuery } from 'store/api/trip/tripApi';
import { useGetExpenseHeadsQuery } from 'store/api/expenseHead/expenseHeadApi';
import moment from 'moment';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: 300, sm: 350, md: 600 },
  maxHeight: '100vh',
  overflow: 'auto',
  boxShadow: 24,
  p: 2,
};

const AddTripExpense = ({ open, handleClose }) => {
  const [loading, setLoading] = useState(false);
  const [trip, setTrip] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  // library
  const { data: tripsData } = useTripsQuery(
    { limit: 100, costing: false },
    { refetchOnMountOrArgChange: true }
  );
  const allTrips = tripsData?.trips || [];

  const { data: headData } = useGetExpenseHeadsQuery(
    { limit: 10, type: 'trip', isActive: true, sortOrder: 'asc' },
    { refetchOnMountOrArgChange: true }
  );

  const allExpenseHeads = headData?.expenseHeads || [];
  // end library

  const dispatch = useDispatch();

  const [createTripExpense] = useCreateTripExpenseMutation();

  const onSubmit = async (data) => {
    const newData = {
      id: trip?.id,
      data: Object.entries(data).map(([key, value]) => ({
        expenseHeadId: key,
        amount: value || 0,
      })),
    };
    try {
      setLoading(true);
      const res = await createTripExpense({ ...newData }).unwrap();
      if (res.success) {
        handleClose();
        setLoading(false);
        setTrip(null);
        reset();
        dispatch(
          setToast({
            open: true,
            variant: 'success',
            message: res?.message,
          })
        );
      }
    } catch (err) {
      setLoading(false);
      dispatch(
        setToast({
          open: true,
          variant: 'error',
          message: err?.data?.message || 'Something Went Wrong',
        })
      );
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Paper sx={style}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography sx={{ fontSize: 16, color: '#878781' }}>
            Add Trip Expenses
          </Typography>
          <IconButton
            color="error"
            sx={{ width: 25, height: 25 }}
            onClick={handleClose}
          >
            <CloseIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Box
          component="form"
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ControlledAutoComplete
                label="Select Trip"
                required
                value={trip}
                options={allTrips}
                getOptionLabel={(option) =>
                  moment(option.startDate).format('DD/MM/YY') +
                  ', ' +
                  option.tripId +
                  ', ' +
                  option.from +
                  '-' +
                  option.to +
                  ', ' +
                  option.tripValue +
                  'TK'
                }
                isOptionEqualToValue={(item, value) => item.id === value.id}
                onChange={(e, newValue) => setTrip(newValue)}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography sx={{ pt: 1.5, fontWeight: 700 }}>
                Expense Details
              </Typography>
            </Grid>
            {allExpenseHeads
              ? allExpenseHeads?.map((el) => (
                  <Grid key={el.id} item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label={el.label}
                      size="small"
                      type="number"
                      {...register(`${el.id}`, {
                        valueAsNumber: true,
                      })}
                    />
                  </Grid>
                ))
              : null}
            <Grid item xs={12}>
              <LoadingButton
                fullWidth
                size="small"
                color="primary"
                loading={loading}
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="contained"
                type="submit"
              >
                Submit
              </LoadingButton>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Modal>
  );
};

export default AddTripExpense;
