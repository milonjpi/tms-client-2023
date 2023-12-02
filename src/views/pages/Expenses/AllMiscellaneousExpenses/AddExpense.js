import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { setToast } from 'store/toastSlice';
import { useVehiclesQuery } from 'store/api/vehicle/vehicleApi';
import moment from 'moment';
import ControlledAutoComplete from 'ui-component/form-components/ControlledAutoComplete';
import { useGetExpenseHeadsQuery } from 'store/api/expenseHead/expenseHeadApi';
import { useAddExpenseMutation } from 'store/api/expense/expenseApi';
import { useGetAccountHeadsQuery } from 'store/api/accountHead/accountHeadApi';
import AddExpenseHead from '../ExpenseHeads/AddExpenseHead';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: 300, sm: 500, md: 700 },
  maxHeight: '100vh',
  overflow: 'auto',
  boxShadow: 24,
  p: 2,
};

const AddExpense = ({ open, handleClose }) => {
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(moment());
  const [vehicle, setVehicle] = useState(null);
  const [expense, setExpense] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  const [headOpen, setHeadOpen] = useState(false);

  // library
  const { data: vehicleData } = useVehiclesQuery(
    { limit: 100, isActive: true },
    { refetchOnMountOrArgChange: true }
  );
  const allVehicles = vehicleData?.vehicles || [];

  // account heads
  const { data: accountHeads } = useGetAccountHeadsQuery(
    { limit: 100 },
    { refetchOnMountOrArgChange: true }
  );
  const allAccountHeads = accountHeads?.accountHeads || [];

  // expense head library
  const findMiscellaneousHead =
    allAccountHeads?.find((el) => el.label === 'Miscellaneous Expense') || null;

  const { data: expenseHeadData } = useGetExpenseHeadsQuery(
    { limit: 200, sortOrder: 'asc', accountHeadId: findMiscellaneousHead?.id },
    { refetchOnMountOrArgChange: true }
  );

  const allExpenseHeads = expenseHeadData?.expenseHeads || [];

  // end library

  const dispatch = useDispatch();

  const [addExpense] = useAddExpenseMutation();
  const onSubmit = async (data) => {
    const newData = {
      date,
      vehicleId: vehicle?.id,
      expenseHeadId: expense?.id,
      remarks: data?.remarks,
      amount: data?.amount,
      miscellaneous: true,
    };
    try {
      setLoading(true);
      const res = await addExpense({ ...newData }).unwrap();
      if (res.success) {
        handleClose();
        setLoading(false);
        reset();
        setDate(moment());
        setVehicle(null);
        setExpense(null);
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
            Add Miscellaneous Expense
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
        {/* pop up items */}
        <AddExpenseHead
          open={headOpen}
          handleClose={() => setHeadOpen(false)}
          accountHeadId={findMiscellaneousHead?.id}
        />
        {/* end pop up items */}
        <Box
          component="form"
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  disableFuture
                  label="Select Date"
                  views={['year', 'month', 'day']}
                  inputFormat="DD/MM/YYYY"
                  value={date}
                  onChange={(newValue) => {
                    setDate(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      required
                      size="small"
                      autoComplete="off"
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={8}>
              <ControlledAutoComplete
                label="Select Vehicle"
                required
                value={vehicle}
                options={allVehicles}
                getOptionLabel={(option) =>
                  option.vehicleId + ' - ' + option.regNo
                }
                isOptionEqualToValue={(item, value) => item.id === value.id}
                onChange={(e, newValue) => setVehicle(newValue)}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ControlledAutoComplete
                  label="Select Expense Head"
                  required
                  value={expense}
                  options={allExpenseHeads}
                  getOptionLabel={(option) => option.label}
                  isOptionEqualToValue={(item, value) => item.id === value.id}
                  onChange={(e, newValue) => setExpense(newValue)}
                />
                <Tooltip title="Add Head">
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    sx={{ minWidth: 0, height: 32, width: 38, ml: 1, p: 0 }}
                    onClick={() => setHeadOpen(true)}
                  >
                    <AddIcon fontSize="small" />
                  </Button>
                </Tooltip>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                required
                label="Amount (TK)"
                size="small"
                type="number"
                {...register('amount', {
                  required: true,
                  valueAsNumber: true,
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Description"
                size="small"
                {...register('remarks', {
                  required: true,
                })}
              />
            </Grid>

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

export default AddExpense;
