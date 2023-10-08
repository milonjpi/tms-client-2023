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
import LockResetIcon from '@mui/icons-material/LockReset';
import { useDispatch } from 'react-redux';
import { setRefresh } from 'store/refreshSlice';
import { setToast } from 'store/toastSlice';
import useAxiosPrivate from 'hooks/useAxiosPrivate';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: 350 },
  maxHeight: '100vh',
  overflow: 'auto',
  boxShadow: 24,
  p: 2,
};

const ChangePassword = ({ open, handleClose, uId }) => {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');

  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axiosPrivate
      .patch(`/user/${uId}`, { password })
      .then((res) => {
        handleClose();
        setPassword('');
        dispatch(setRefresh());
        dispatch(
          setToast({
            open: true,
            variant: 'success',
            message: res.data?.message,
          })
        );
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        dispatch(
          setToast({
            open: true,
            variant: 'error',
            message: err.response?.data?.message || 'Network Error',
            errorMessages: err.response?.data?.errorMessages,
          })
        );
      });
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
            Change Password
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
        <Box component="form" autoComplete="off" onSubmit={onSubmit}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              required
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>

          <LoadingButton
            fullWidth
            size="small"
            color="primary"
            sx={{ py: 1, mt: 3 }}
            loading={loading}
            loadingPosition="start"
            startIcon={<LockResetIcon />}
            variant="contained"
            type="submit"
          >
            <span style={{ lineHeight: 1 }}>Change</span>
          </LoadingButton>
        </Box>
      </Paper>
    </Modal>
  );
};

export default ChangePassword;
