import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import LoadingButton from '@mui/lab/LoadingButton';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { setToast } from 'store/toastSlice';
import ControlledAutoComplete from 'ui-component/form-components/ControlledAutoComplete';
import { useDriversQuery } from 'store/api/driver/driverApi';
import { useVehiclesQuery } from 'store/api/vehicle/vehicleApi';
import { usePartiesQuery } from 'store/api/party/partyApi';
import { useTripQuery, useUpdateTripMutation } from 'store/api/trip/tripApi';
import MainCard from 'ui-component/cards/MainCard';
import { useNavigate, useParams } from 'react-router-dom';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import { useGetExpenseHeadsQuery } from 'store/api/expenseHead/expenseHeadApi';
import { useGetAccountHeadsQuery } from 'store/api/accountHead/accountHeadApi';
import { useGetIncomeHeadsQuery } from 'store/api/incomeHead/incomeHeadApi';
import { inputStyles } from 'ui-component/cutomStyles';
import AddParty from '../Parties/AddParty';
import LoadingPage from 'ui-component/LoadingPage';
import Error404 from 'views/Error404';
import { useEffect } from 'react';

const UpdateTrip = () => {
  const { id } = useParams();
  const { data: getTripData, isLoading } = useTripQuery(id);
  const tripData = getTripData?.data;

  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(tripData?.startDate);
  const [endDate, setEndDate] = useState(tripData?.endDate);
  const [vehicle, setVehicle] = useState(tripData?.vehicle || null);
  const [driver, setDriver] = useState(tripData?.driver || null);
  const [party, setParty] = useState(tripData?.party || null);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { ...tripData, remarks: tripData?.incomes[0]?.remarks },
  });

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

  // account heads
  const { data: accountHeads } = useGetAccountHeadsQuery(
    { limit: 100 },
    { refetchOnMountOrArgChange: true }
  );
  const allAccountHeads = accountHeads?.accountHeads || [];

  // income head library
  const findTripIncomeHead =
    allAccountHeads?.find((el) => el.label === 'Trip Income') || null;

  const { data: incomeHeadData } = useGetIncomeHeadsQuery(
    { limit: 50, sortOrder: 'asc', accountHeadId: findTripIncomeHead?.id },
    { refetchOnMountOrArgChange: true }
  );

  const allIncomeHeads = incomeHeadData?.incomeHeads || [];
  const findTripFare = allIncomeHeads?.find((el) => el.label === 'Trip Fare');

  // expense head library
  const findTripExpenseHead =
    allAccountHeads?.find((el) => el.label === 'Trip Expense') || null;

  const { data: expenseHeadData } = useGetExpenseHeadsQuery(
    { limit: 50, sortOrder: 'asc', accountHeadId: findTripExpenseHead?.id },
    { refetchOnMountOrArgChange: true }
  );

  const allExpenseHeads = expenseHeadData?.expenseHeads || [];
  // end library

  const dispatch = useDispatch();

  const [updateTrip] = useUpdateTripMutation();

  const onSubmit = async (data) => {
    const newData = {
      data: {
        startDate,
        endDate,
        from: data?.from,
        to: data?.to,
        distance: data.distance || 0,
        tripValue: data?.tripValue,
        vehicleId: vehicle?.id,
        driverId: driver?.id,
        partyId: party?.id,
      },
      incomes: [
        {
          date: startDate,
          vehicleId: vehicle?.id,
          incomeHeadId: findTripFare?.id,
          amount: data?.tripValue,
          remarks: data?.remarks,
        },
      ],
      expenses: data.expenses?.map((el) => ({
        date: startDate,
        vehicleId: vehicle?.id,
        expenseHeadId: el.expenseHeadId,
        unit: el.unit || 0,
        amount: el.amount || 0,
        remarks: el.remarks,
      })),
    };

    try {
      setLoading(true);
      const res = await updateTrip({
        id: tripData?.id,
        body: newData,
      }).unwrap();
      if (res.success) {
        setLoading(false);
        dispatch(
          setToast({
            open: true,
            variant: 'success',
            message: res?.message,
          })
        );
        navigate('/pages/trip-management/all-trips');
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
  useEffect(() => {
    reset({ ...tripData, remarks: tripData?.incomes[0]?.remarks });
    setStartDate(tripData?.startDate);
    setEndDate(tripData?.endDate || null);
    setVehicle(tripData?.vehicle || null);
    setDriver(tripData?.driver || null);
    setParty(tripData?.party || null);
  }, [reset, tripData]);
  if (!tripData && isLoading) {
    return <LoadingPage />;
  }
  if (!tripData && !isLoading) {
    return <Error404 />;
  }

  if (tripData) {
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
        {/* popup items */}
        <AddParty open={partyOpen} handleClose={() => setPartyOpen(false)} />
        {/* end popup items */}
        <Box
          component="form"
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Typography sx={{ fontWeight: 700, pb: 2 }}>
                Trip Details
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} lg={6}>
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
                <Grid item xs={12} lg={6}>
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
                <Grid item xs={12}>
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
                <Grid item xs={12}>
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
                <Grid item xs={12}>
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
                <Grid item xs={12}>
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
                <Grid item xs={12} md={5}>
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
                <Grid item xs={12} md={7}>
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
                      isOptionEqualToValue={(item, value) =>
                        item.id === value.id
                      }
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
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Remarks"
                    size="small"
                    {...register('remarks')}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography sx={{ fontWeight: 700, pb: 2 }}>
                Trip Expenses
              </Typography>
              <Grid container spacing={2}>
                {allExpenseHeads
                  ? allExpenseHeads?.map((el, index) => (
                      <Grid item xs={12} md={6} key={el.id}>
                        <Typography
                          sx={{
                            fontSize: 13,
                            fontWeight: 700,
                            color: '#999999',
                            pb: 1,
                          }}
                        >
                          {el.label}
                        </Typography>
                        <Grid container spacing={1}>
                          <Grid item xs={0} sx={{ display: 'none' }}>
                            <TextField
                              fullWidth
                              value={el.id}
                              label={el.label}
                              size="small"
                              {...register(`expenses[${index}].expenseHeadId`)}
                            />
                          </Grid>
                          <Grid item xs={5} lg={3}>
                            <TextField
                              fullWidth
                              label="Qty"
                              size="small"
                              type="number"
                              inputProps={{
                                step: '0.01',
                              }}
                              sx={inputStyles.input}
                              {...register(`expenses[${index}].unit`, {
                                valueAsNumber: true,
                              })}
                            />
                          </Grid>
                          <Grid item xs={7} lg={4}>
                            <TextField
                              fullWidth
                              label="Amount"
                              size="small"
                              type="number"
                              sx={inputStyles.input}
                              inputProps={{
                                step: '0.01',
                              }}
                              {...register(`expenses[${index}].amount`, {
                                valueAsNumber: true,
                              })}
                            />
                          </Grid>
                          <Grid item xs={12} lg={5}>
                            <TextField
                              fullWidth
                              label="Remarks"
                              size="small"
                              {...register(`expenses[${index}].remarks`)}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    ))
                  : null}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <LoadingButton
                size="small"
                fullWidth
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
      </MainCard>
    );
  }
};

export default UpdateTrip;
