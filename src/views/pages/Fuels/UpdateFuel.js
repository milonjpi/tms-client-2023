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
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { setToast } from 'store/toastSlice';
import { useUpdateFuelMutation } from 'store/api/fuel/fuelApi';
import { useVehiclesQuery } from 'store/api/vehicle/vehicleApi';
import { useUomQuery } from 'store/api/uom/uomApi';
import { useFuelTypeQuery } from 'store/api/fuelType/fuelTypeApi';
import ControlledAutoComplete from 'ui-component/form-components/ControlledAutoComplete';

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

const UpdateFuel = ({ open, handleClose, preData }) => {
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(preData?.date || null);
  const [vehicle, setVehicle] = useState(preData?.vehicle || null);
  const [uom, setUom] = useState(preData?.uom || null);
  const [fuelType, setFuelType] = useState(preData?.fuelType || null);
  const { register, handleSubmit } = useForm({ defaultValues: preData });

  // library
  const { data: vehicleData } = useVehiclesQuery(
    { limit: 100, isActive: true },
    { refetchOnMountOrArgChange: true }
  );
  const allVehicles = vehicleData?.vehicles || [];

  const { data: uomData } = useUomQuery('', {
    refetchOnMountOrArgChange: true,
  });
  const allUom = uomData?.data || [];

  const { data: fuelTypeData } = useFuelTypeQuery('', {
    refetchOnMountOrArgChange: true,
  });
  const allFuelTypes = fuelTypeData?.data || [];
  // end library

  const dispatch = useDispatch();

  const [updateFuel] = useUpdateFuelMutation();

  const onSubmit = async (data) => {
    const newData = {
      date,
      vehicleId: vehicle?.id,
      fuelTypeId: fuelType?.id,
      uomId: uom?.id,
      quantity: data?.quantity,
      amount: data?.amount,
      remarks: data?.remarks,
    };
    try {
      setLoading(true);
      const res = await updateFuel({
        id: preData?.id,
        body: newData,
      }).unwrap();
      if (res.success) {
        setLoading(false);
        handleClose();
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
            Edit Fuel
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
                  label="Start Date"
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
            <Grid item xs={12} md={6}>
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
            <Grid item xs={12} md={6}>
              <ControlledAutoComplete
                label="Unit of Measurement"
                required
                value={uom}
                options={allUom}
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(item, value) => item.id === value.id}
                onChange={(e, newValue) => setUom(newValue)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                label="Quantity"
                size="small"
                type="number"
                inputProps={{
                  step: '0.0001',
                }}
                {...register('quantity', {
                  required: true,
                  valueAsNumber: true,
                })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
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
                Update
              </LoadingButton>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Modal>
  );
};

export default UpdateFuel;
