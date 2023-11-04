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
import UncontrolledAutoComplete from 'ui-component/form-components/UncontrolledAutoComplete';
import ControlledAutoComplete from 'ui-component/form-components/ControlledAutoComplete';
import { useBrandsQuery } from 'store/api/brand/brandApi';
import { useModelsQuery } from 'store/api/model/modelApi';
import { useDriversQuery } from 'store/api/driver/driverApi';
import { useAddVehicleMutation } from 'store/api/vehicle/vehicleApi';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: 300, sm: 500, md: 600 },
  maxHeight: '100vh',
  overflow: 'auto',
  boxShadow: 24,
  p: 2,
};

const AddVehicle = ({ open, handleClose }) => {
  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  // library
  const { data: brandData } = useBrandsQuery('', {
    refetchOnMountOrArgChange: true,
  });
  const allBrands = brandData?.data;

  const { data: modelData } = useModelsQuery('', {
    refetchOnMountOrArgChange: true,
  });
  const allModels = modelData?.data;

  const { data: driverData } = useDriversQuery(
    { limit: 100, isActive: true },
    { refetchOnMountOrArgChange: true }
  );
  const allDrivers = driverData?.drivers || [];
  // end library

  const dispatch = useDispatch();

  const [addVehicle] = useAddVehicleMutation();
  const onSubmit = async (data) => {
    const newData = {
      ...data,
      vehicleValue: data.vehicleValue || 0,
      driverId: driver?.id,
    };
    try {
      setLoading(true);
      const res = await addVehicle({ ...newData }).unwrap();
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
            Add Vehicle
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
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Registration No"
                size="small"
                {...register('regNo', { required: true })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <UncontrolledAutoComplete
                options={allBrands?.filter((el) => el.label)}
                label="Select Brand"
                required
                register={{ ...register('brand', { required: true }) }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <UncontrolledAutoComplete
                options={allModels?.filter((el) => el.label)}
                label="Select Model"
                required
                register={{ ...register('model', { required: true }) }}
              />
            </Grid>
            <Grid item xs={12} md={5}>
              <TextField
                fullWidth
                label="Value in TK"
                size="small"
                type="number"
                {...register('vehicleValue', {
                  valueAsNumber: true,
                })}
              />
            </Grid>
            <Grid item xs={12} md={7}>
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

export default AddVehicle;
