import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
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
import { useAddFuelMutation } from 'store/api/fuel/fuelApi';
import { useVehiclesQuery } from 'store/api/vehicle/vehicleApi';
import { useFuelTypeQuery } from 'store/api/fuelType/fuelTypeApi';
import moment from 'moment';
import ControlledAutoComplete from 'ui-component/form-components/ControlledAutoComplete';
import { useFuelPumpsQuery } from 'store/api/fuelPump/fuelPumpApi';
import AddPumpStation from '../PumpStation/AddPumpStation';
import { useDriversQuery } from 'store/api/driver/driverApi';

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

const AddFuel = ({ open, handleClose }) => {
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(moment());
  const [vehicle, setVehicle] = useState(null);
  const [driver, setDriver] = useState(null);
  const [fuelType, setFuelType] = useState(null);
  const [pumpStation, setPumpStation] = useState(null);
  const [addPumpOpen, setAddPumpOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();

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

  const { data: fuelTypeData } = useFuelTypeQuery('', {
    refetchOnMountOrArgChange: true,
  });
  const allFuelTypes = fuelTypeData?.data || [];

  const { data: fuelPumpData } = useFuelPumpsQuery(
    { limit: 100, sortBy: 'label', sortOrder: 'asc' },
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const allFuelPumps = fuelPumpData?.fuelPumps || [];
  // end library

  const dispatch = useDispatch();

  const [addFuel] = useAddFuelMutation();
  const onSubmit = async (data) => {
    const newData = {
      date,
      vehicleId: vehicle?.id,
      driverId: driver?.id,
      fuelTypeId: fuelType?.id,
      fuelPumpId: pumpStation?.id,
      odoMeter: data?.odoMeter,
      quantity: data?.quantity,
      amount: data?.amount,
      remarks: data?.remarks,
    };
    try {
      setLoading(true);
      const res = await addFuel({ ...newData }).unwrap();
      if (res.success) {
        handleClose();
        setLoading(false);
        reset();
        setDate(moment());
        setVehicle(null);
        setDriver(null);
        setPumpStation(null);
        setFuelType(null);
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
            Add Fuel
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
        <AddPumpStation
          open={addPumpOpen}
          handleClose={() => setAddPumpOpen(false)}
        />
        {/* end popup items */}
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
            <Grid item xs={12} md={5}>
              <ControlledAutoComplete
                label="Select Driver"
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
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ControlledAutoComplete
                  label="Select Pump Station"
                  value={pumpStation}
                  options={allFuelPumps}
                  getOptionLabel={(option) =>
                    option.label +
                    (option?.address ? ', ' + option?.address : '')
                  }
                  isOptionEqualToValue={(item, value) => item.id === value.id}
                  onChange={(e, newValue) => setPumpStation(newValue)}
                />
                <Tooltip title="Add Pump Station">
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    sx={{ minWidth: 0, height: 32, width: 38, ml: 1, p: 0 }}
                    onClick={() => setAddPumpOpen(true)}
                  >
                    <AddIcon fontSize="small" />
                  </Button>
                </Tooltip>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <ControlledAutoComplete
                label="Select Fuel Type"
                required
                value={fuelType}
                options={allFuelTypes}
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(item, value) => item.id === value.id}
                onChange={(e, newValue) => setFuelType(newValue)}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                required
                label="Quantity in Litre"
                size="small"
                type="number"
                inputProps={{
                  step: '0.01',
                }}
                {...register('quantity', {
                  required: true,
                  valueAsNumber: true,
                })}
              />
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
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Odo Meter"
                size="small"
                type="number"
                {...register('odoMeter', { valueAsNumber: true })}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                label="Remarks"
                size="small"
                {...register('remarks')}
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

export default AddFuel;
