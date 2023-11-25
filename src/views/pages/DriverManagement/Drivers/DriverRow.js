import ButtonGroup from '@mui/material/ButtonGroup';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import {
  IconEdit,
  IconTrashXFilled,
  IconCreativeCommonsSa,
} from '@tabler/icons-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setToast } from 'store/toastSlice';
import ConfirmDialog from 'ui-component/ConfirmDialog';
import { StyledTableCell, StyledTableRow } from 'ui-component/table-component';
import UpdateDriver from './UpdateDriver';
import {
  useInactiveDriverMutation,
  useUpdateDriverMutation,
} from 'store/api/driver/driverApi';

const DriverRow = ({ sn, data }) => {
  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [reactive, setReactive] = useState(false);

  const [inactiveDriver] = useInactiveDriverMutation();
  const [updateDriver] = useUpdateDriverMutation();

  const dispatch = useDispatch();

  const handleDelete = async () => {
    setDialog(false);
    try {
      const res = await inactiveDriver(data?.id).unwrap();
      if (res.success) {
        dispatch(
          setToast({
            open: true,
            variant: 'success',
            message: res?.message,
          })
        );
      }
    } catch (err) {
      dispatch(
        setToast({
          open: true,
          variant: 'error',
          message: err?.data?.message || 'Something Went Wrong',
        })
      );
    }
  };
  const handleReactive = async () => {
    setReactive(false);
    try {
      const res = await updateDriver({
        id: data?.id,
        body: { isActive: true },
      }).unwrap();
      if (res.success) {
        dispatch(
          setToast({
            open: true,
            variant: 'success',
            message: res?.message,
          })
        );
      }
    } catch (err) {
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
    <StyledTableRow>
      <StyledTableCell align="center">{sn}</StyledTableCell>
      <StyledTableCell>{data?.driverId}</StyledTableCell>
      <StyledTableCell>{data?.name}</StyledTableCell>
      <StyledTableCell>{data?.mobile}</StyledTableCell>
      <StyledTableCell>{data?.address}</StyledTableCell>
      <StyledTableCell align="center">
        {data?.isActive ? (
          <ButtonGroup>
            <IconButton
              color="primary"
              size="small"
              onClick={() => setOpen(true)}
            >
              <IconEdit color="#468B97" size={18} />
            </IconButton>
            <IconButton
              size="small"
              color="error"
              onClick={() => setDialog(true)}
            >
              <IconTrashXFilled size={18} />
            </IconButton>
          </ButtonGroup>
        ) : (
          <Tooltip title="Reactive">
            <IconButton
              size="small"
              color="success"
              onClick={() => setReactive(true)}
            >
              <IconCreativeCommonsSa size={18} />
            </IconButton>
          </Tooltip>
        )}

        <ConfirmDialog
          open={reactive}
          setOpen={setReactive}
          content="Reactive Driver"
          handleDelete={handleReactive}
        />
        <ConfirmDialog
          open={dialog}
          setOpen={setDialog}
          content="Inactive Driver"
          handleDelete={handleDelete}
        />
        <UpdateDriver
          open={open}
          preData={data}
          handleClose={() => setOpen(false)}
        />
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default DriverRow;
