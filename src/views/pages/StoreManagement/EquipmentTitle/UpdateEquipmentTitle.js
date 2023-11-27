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
import { useUomQuery } from 'store/api/uom/uomApi';
import { useUpdateEquipmentTitleMutation } from 'store/api/equipmentTitle/equipmentTitleSlice';
import ControlledAutoComplete from 'ui-component/form-components/ControlledAutoComplete';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: 300, sm: 500 },
  maxHeight: '100vh',
  overflow: 'auto',
  boxShadow: 24,
  p: 2,
};

const UpdateEquipmentTitle = ({ open, handleClose, preData }) => {
  const [loading, setLoading] = useState(false);
  const [uom, setUom] = useState(preData?.uom || null);
  const { register, handleSubmit } = useForm({ defaultValues: preData });

  // library

  const { data: uomData } = useUomQuery('', {
    refetchOnMountOrArgChange: true,
  });
  const allUom = uomData?.data || [];
  // end library

  const dispatch = useDispatch();

  const [updateEquipmentTitle] = useUpdateEquipmentTitleMutation();
  const onSubmit = async (data) => {
    const newData = {
      label: data?.label,
      uomId: uom?.id,
    };
    try {
      setLoading(true);
      const res = await updateEquipmentTitle({
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
            Edit Equipment Title
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
                label="Equipment Title"
                size="small"
                {...register('label', { required: true })}
              />
            </Grid>
            <Grid item xs={12}>
              <ControlledAutoComplete
                label="Unit of Measurement"
                value={uom}
                options={allUom}
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(item, value) => item.id === value.id}
                onChange={(e, newValue) => setUom(newValue)}
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

export default UpdateEquipmentTitle;
