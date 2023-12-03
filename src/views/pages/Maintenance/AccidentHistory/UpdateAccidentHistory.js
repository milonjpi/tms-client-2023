import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { setToast } from 'store/toastSlice';
import { useVehiclesQuery } from 'store/api/vehicle/vehicleApi';
import ControlledAutoComplete from 'ui-component/form-components/ControlledAutoComplete';
import { useDriversQuery } from 'store/api/driver/driverApi';
import { useUpdateAccidentHistoryMutation } from 'store/api/accidentHistory/accidentHistoryApi';

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

const UpdateAccidentHistory = ({ open, handleClose, preData }) => {
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(preData?.date);
  const [vehicle, setVehicle] = useState(preData?.vehicle || null);
  const [driver, setDriver] = useState(preData?.driver || null);

  const [amountStatus, setAmountStatus] = useState(preData?.amountStatus);

  const { register, handleSubmit } = useForm({ defaultValues: preData });

  // library
  const { data: vehicleData } = useVehiclesQuery(
    { limit: 100, isActive: true, sortBy: 'vehicleId', sortOrder: 'asc' },
    { refetchOnMountOrArgChange: true }
  );
  const allVehicles = vehicleData?.vehicles || [];

  const { data: driverData } = useDriversQuery(
    { limit: 100, isActive: true },
    { refetchOnMountOrArgChange: true }
  );
  const allDrivers = driverData?.drivers || [];

  // end library

  const dispatch = useDispatch();

  const [updateAccidentHistory] = useUpdateAccidentHistoryMutation();

  const onSubmit = async (data) => {
    const newData = {
      date,
      vehicleId: vehicle?.id,
      driverId: driver?.id,
      details: data?.details,
      location: data?.location,
      amountStatus: amountStatus,
      totalAmount: data?.totalAmount || 0,
      odoMeter: data?.odoMeter,
      remarks: data?.remarks,
    };
    try {
      setLoading(true);
      const res = await updateAccidentHistory({
        id: preData?.id,
        body: newData,
      }).unwrap();
      if (res.success) {
        handleClose();
        setLoading(false);
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
            Edit Accident History
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
            <Grid item xs={12} md={4}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  disableFuture
                  label="Accident Date"
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
            <Grid item xs={12} md={5}>
              <ControlledAutoComplete
                label="Select Driver"
                required
                value={driver}
                options={allDrivers}
                getOptionLabel={(option) =>
                  option.driverId + ', ' + option.name
                }
                isOptionEqualToValue={(item, value) => item.id === value.id}
                onChange={(e, newValue) => setDriver(newValue)}
              />
            </Grid>
            <Grid item xs={12} md={7}>
              <TextField
                fullWidth
                required
                label="Location"
                size="small"
                {...register('location', { required: true })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Accident Details"
                size="small"
                {...register('details', { required: true })}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                required
                label="Odo Meter"
                size="small"
                type="number"
                {...register('odoMeter', {
                  valueAsNumber: true,
                  required: true,
                })}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth size="small" required>
                <InputLabel id="amount-status-id">Amount Status</InputLabel>
                <Select
                  labelId="amount-status-id"
                  value={amountStatus}
                  label="Amount Status"
                  onChange={(e) => setAmountStatus(e.target.value)}
                >
                  <MenuItem value="Nothing">Nothing</MenuItem>
                  <MenuItem value="Paid">Paid</MenuItem>
                  <MenuItem value="Received">Received</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              {['Paid', 'Received'].includes(amountStatus) ? (
                <TextField
                  fullWidth
                  label="Paid/Received Amount"
                  size="small"
                  type="number"
                  {...register('totalAmount', { valueAsNumber: true })}
                />
              ) : null}
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
                Update
              </LoadingButton>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Modal>
  );
};

export default UpdateAccidentHistory;
