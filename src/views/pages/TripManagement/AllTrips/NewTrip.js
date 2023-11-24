import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import LoadingButton from '@mui/lab/LoadingButton';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { setToast } from 'store/toastSlice';
import ControlledAutoComplete from 'ui-component/form-components/ControlledAutoComplete';
import moment from 'moment';
import { useDriversQuery } from 'store/api/driver/driverApi';
import { useVehiclesQuery } from 'store/api/vehicle/vehicleApi';
import { usePartiesQuery } from 'store/api/party/partyApi';
import { useAddTripMutation } from 'store/api/trip/tripApi';
import AddParty from 'views/Libraries/TheParty/ActiveParty/AddParty';

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

const NewTrip = ({ open, handleClose }) => {
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment());
  const [vehicle, setVehicle] = useState(null);
  const [driver, setDriver] = useState(null);
  const [party, setParty] = useState(null);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const [partyOpen, setPartyOpen] = useState(false);

  // library
  const { data: vehicleData } = useVehiclesQuery(
    { limit: 100, isActive: true },
    { refetchOnMountOrArgChange: true }
  );
  const allVehicles = vehicleData?.vehicles || [];

  const { data: driverData } = useDriversQuery(
    { limit: 100, isActive: true },
    { refetchOnMountOrArgChange: true }
  );
  const allDrivers = driverData?.drivers || [];

  const { data: partyData } = usePartiesQuery(
    { limit: 100, isActive: true },
    { refetchOnMountOrArgChange: true }
  );
  const allParties = partyData?.parties || [];
  // end library

  const dispatch = useDispatch();

  const [addTrip] = useAddTripMutation();

  const onSubmit = async (data) => {
    const newData = {
      ...data,
      startDate,
      endDate,
      distance: data.distance || 0,
      vehicleId: vehicle?.id,
      driverId: driver?.id,
      partyId: party?.id,
    };

    try {
      setLoading(true);
      const res = await addTrip({ ...newData }).unwrap();
      if (res.success) {
        handleClose();
        setLoading(false);
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
            Add Trip
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
        {/* popup items */}
        <AddParty open={partyOpen} handleClose={() => setPartyOpen(false)} />
        {/* end popup items */}
        <Box
          component="form"
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  label="Start Date"
                  views={['year', 'month', 'day']}
                  inputFormat="DD/MM/YYYY"
                  value={startDate}
                  onChange={(newValue) => {
                    setStartDate(newValue);
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
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  label="End Date"
                  views={['year', 'month', 'day']}
                  minDate={startDate}
                  inputFormat="DD/MM/YYYY"
                  value={endDate}
                  onChange={(newValue) => {
                    setEndDate(newValue);
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
            <Grid item xs={12} md={6}>
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
            <Grid item xs={12} md={6}>
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
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="From"
                size="small"
                required
                {...register('from', {
                  required: true,
                })}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="To"
                size="small"
                required
                {...register('to', {
                  required: true,
                })}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Distance"
                size="small"
                type="number"
                {...register('distance', {
                  valueAsNumber: true,
                })}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ControlledAutoComplete
                  label="Select Party"
                  required
                  value={party}
                  options={allParties}
                  getOptionLabel={(option) =>
                    option.name + ', ' + option.address + ' - ' + option.mobile
                  }
                  isOptionEqualToValue={(item, value) => item.id === value.id}
                  onChange={(e, newValue) => setParty(newValue)}
                />
                <Tooltip title="Add Party">
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    sx={{ minWidth: 0, height: 32, width: 38, ml: 1, p: 0 }}
                    onClick={() => setPartyOpen(true)}
                  >
                    <AddIcon fontSize="small" />
                  </Button>
                </Tooltip>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Trip Value"
                size="small"
                type="number"
                required
                {...register('tripValue', {
                  required: true,
                  valueAsNumber: true,
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

export default NewTrip;
