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
import MainCard from 'ui-component/cards/MainCard';
import { useNavigate } from 'react-router-dom';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import { useGetExpenseHeadsQuery } from 'store/api/expenseHead/expenseHeadApi';
import { useGetAccountHeadsQuery } from 'store/api/accountHead/accountHeadApi';

const CreateTrip = () => {
  const navigate = useNavigate();
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

  // head library
  const { data: accountHeads } = useGetAccountHeadsQuery(
    { limit: 100 },
    { refetchOnMountOrArgChange: true }
  );

  const allAccountHeads = accountHeads?.accountHeads || [];
  const findHead =
    allAccountHeads?.find((el) => el.label === 'Trip Expense') || null;

  const { data: headData } = useGetExpenseHeadsQuery(
    { limit: 50, sortOrder: 'asc', accountHeadId: findHead?.id },
    { refetchOnMountOrArgChange: true }
  );

  const allExpenseHeads = headData?.expenseHeads || [];
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
    console.log(data);

    // try {
    //   setLoading(true);
    //   const res = await addTrip({ ...newData }).unwrap();
    //   if (res.success) {
    //     setLoading(false);
    //     reset();
    //     dispatch(
    //       setToast({
    //         open: true,
    //         variant: 'success',
    //         message: res?.message,
    //       })
    //     );
    //   }
    // } catch (err) {
    //   setLoading(false);
    //   dispatch(
    //     setToast({
    //       open: true,
    //       variant: 'error',
    //       message: err?.data?.message || 'Something Went Wrong',
    //     })
    //   );
    // }
  };
  return (
    <MainCard
      title="Create Trip"
      secondary={
        <Button
          variant="contained"
          size="small"
          startIcon={<ReplyAllIcon />}
          onClick={() => navigate('/pages/trip-management/all-trips')}
        >
          Back
        </Button>
      }
    >
      <Box
        component="form"
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography sx={{ fontWeight: 700, pb: 2 }}>
              Trip Details
            </Typography>
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
              <Grid item xs={12} md={6}>
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
              <Grid item xs={12} md={6}>
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
              <Grid item xs={12} md={6}>
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
              <Grid item xs={12} md={6}>
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
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ControlledAutoComplete
                    label="Select Party"
                    required
                    value={party}
                    options={allParties}
                    getOptionLabel={(option) =>
                      option.name +
                      ', ' +
                      option.address +
                      ' - ' +
                      option.mobile
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
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography sx={{ fontWeight: 700, pb: 2 }}>
              Trip Expenses
            </Typography>
            <Grid container spacing={2}>
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
            </Grid>
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
    </MainCard>
  );
};

export default CreateTrip;
