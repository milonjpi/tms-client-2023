import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import { IconEdit, IconTrashXFilled } from '@tabler/icons-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setToast } from 'store/toastSlice';
import ConfirmDialog from 'ui-component/ConfirmDialog';
import { StyledTableCell, StyledTableRow } from 'ui-component/table-component';
import { selectAuth } from 'store/authSlice';
import { useDeleteTripMutation } from 'store/features/trip/tripApi';
import moment from 'moment';
import UpdateTrip from './UpdateTrip';

const AllTripRow = ({ sn, data }) => {
  const auth = useSelector(selectAuth);
  const vehicle = data?.vehicle;

  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState(false);

  const [deleteTrip] = useDeleteTripMutation();

  const dispatch = useDispatch();

  const handleDelete = async () => {
    setDialog(false);
    try {
      const res = await deleteTrip({
        id: data?.id,
        token: auth?.accessToken,
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
      <StyledTableCell>{data?.tripId}</StyledTableCell>
      <StyledTableCell>{vehicle?.regNo}</StyledTableCell>
      <StyledTableCell>
        {moment(data?.startDate).format('DD/MM/YYYY')}
      </StyledTableCell>
      <StyledTableCell>{data?.from + ' to ' + data?.to}</StyledTableCell>
      <StyledTableCell align="right">{data?.distance}</StyledTableCell>
      <StyledTableCell align="right">{data?.tripValue}</StyledTableCell>
      <StyledTableCell align="center">
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
        <ConfirmDialog
          open={dialog}
          setOpen={setDialog}
          content="Delete Trip"
          handleDelete={handleDelete}
        />
        <UpdateTrip
          open={open}
          preData={data}
          handleClose={() => setOpen(false)}
        />
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default AllTripRow;
