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
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { setToast } from 'store/toastSlice';
import { useBrandsQuery } from 'store/features/brand/brandApi';
import { selectAuth } from 'store/authSlice';
import { useUpdateVehicleMutation } from 'store/features/vehicle/vehicleApi';
import UncontrolledAutoComplete from 'ui-component/form-components/UncontrolledAutoComplete';
import { useModelsQuery } from 'store/features/model/modelApi';
import ControlledAutoComplete from 'ui-component/form-components/ControlledAutoComplete';
import { useDriversQuery } from 'store/features/driver/driverApi';

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

const UpdateVehicle = ({ open, handleClose, preData }) => {
  const auth = useSelector(selectAuth);
  const [driver, setDriver] = useState(preData?.driver || null);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm({ defaultValues: preData });

  // library
  const { data: brandData } = useBrandsQuery(auth?.accessToken);
  const allBrands = brandData?.data;

  const { data: modelData } = useModelsQuery(auth?.accessToken);
  const allModels = modelData?.data;

  const { data: driverData } = useDriversQuery(auth?.accessToken);
  const allDrivers = driverData?.data;
  // end library

  const dispatch = useDispatch();

  const [updateVehicle] = useUpdateVehicleMutation();
  const onSubmit = async (data) => {
    const newData = {
      regNo: data?.regNo,
      brand: data?.brand,
      model: data?.model,
      vehicleValue: data.vehicleValue || 0,
      driverId: driver?.id,
    };
    try {
      setLoading(true);
      const res = await updateVehicle({
        id: preData?.id,
        token: auth?.accessToken,
        data: newData,
      }).unwrap();
      if (res.success) {
        handleClose();
        dispatch(
          setToast({
            open: true,
            variant: 'success',
            message: res?.message,
          })
        );
        setLoading(false);
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
            Edit Vehicle
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
                defaultValue={preData?.brand || null}
                options={allBrands?.map((el) => el.label)}
                label="Select Brand"
                required
                register={{ ...register('brand', { required: true }) }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <UncontrolledAutoComplete
                defaultValue={preData?.model || null}
                options={allModels?.map((el) => el.label)}
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
                Update
              </LoadingButton>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Modal>
  );
};

export default UpdateVehicle;