import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { setToast } from 'store/toastSlice';
import UncontrolledAutoComplete from 'ui-component/form-components/UncontrolledAutoComplete';
import ControlledAutoComplete from 'ui-component/form-components/ControlledAutoComplete';
import { useBrandsQuery } from 'store/api/brand/brandApi';
import { useModelsQuery } from 'store/api/model/modelApi';
import { useDriversQuery } from 'store/api/driver/driverApi';
import { useAddVehicleMutation } from 'store/api/vehicle/vehicleApi';
import AddVehicleBrand from '../VehicleBrand/AddVehicleBrand';
import AddVehicleModel from '../VehicleModel/AddVehicleModel';
import AddDriver from 'views/pages/DriverManagement/Drivers/AddDriver';

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

  const [brandOpen, setBrandOpen] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);
  const [driverOpen, setDriverOpen] = useState(false);

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
        setDriver(null);
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
        {/* popup items */}
        <AddVehicleBrand
          open={brandOpen}
          handleClose={() => setBrandOpen(false)}
        />
        <AddVehicleModel
          open={modelOpen}
          handleClose={() => setModelOpen(false)}
        />
        <AddDriver open={driverOpen} handleClose={() => setDriverOpen(false)} />
        {/* end popup items */}
        <Box
          component="form"
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container spacing={2.5}>
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
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <UncontrolledAutoComplete
                  options={allBrands?.filter((el) => el.label)}
                  label="Select Brand"
                  required
                  register={{ ...register('brand', { required: true }) }}
                />
                <Tooltip title="Add Brand">
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    sx={{ minWidth: 0, height: 32, width: 38, ml: 1, p: 0 }}
                    onClick={() => setBrandOpen(true)}
                  >
                    <AddIcon fontSize="small" />
                  </Button>
                </Tooltip>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <UncontrolledAutoComplete
                  options={allModels?.filter((el) => el.label)}
                  label="Select Model"
                  required
                  register={{ ...register('model', { required: true }) }}
                />
                <Tooltip title="Add Model">
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    sx={{ minWidth: 0, height: 32, width: 38, ml: 1, p: 0 }}
                    onClick={() => setModelOpen(true)}
                  >
                    <AddIcon fontSize="small" />
                  </Button>
                </Tooltip>
              </Box>
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
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
                <Tooltip title="Add Driver">
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    sx={{ minWidth: 0, height: 32, width: 38, ml: 1, p: 0 }}
                    onClick={() => setDriverOpen(true)}
                  >
                    <AddIcon fontSize="small" />
                  </Button>
                </Tooltip>
              </Box>
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
