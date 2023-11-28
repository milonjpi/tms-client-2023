import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import {
  IconEdit,
  IconTrashXFilled,
  IconListSearch,
} from '@tabler/icons-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setToast } from 'store/toastSlice';
import ConfirmDialog from 'ui-component/ConfirmDialog';
import { StyledTableCell, StyledTableRow } from 'ui-component/table-component';
import moment from 'moment';
import { totalSum } from 'views/utilities/NeedyFunction';
import { useDeleteTripMutation } from 'store/api/trip/tripApi';
import { useNavigate } from 'react-router-dom';

const RepairMaintenanceRow = ({ sn, data }) => {
  const vehicle = data?.vehicle;
  const navigate = useNavigate();

  const [dialog, setDialog] = useState(false);
  const [invoice, setInvoice] = useState(false);

  const [deleteTrip] = useDeleteTripMutation();

  const dispatch = useDispatch();

  const handleDelete = async () => {
    setDialog(false);
    try {
      const res = await deleteTrip(data?.id).unwrap();
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
  const tripExpenses = data?.expenses || [];
  const totalExpenses = totalSum(tripExpenses, 'amount');
  const netProfit = (data?.tripValue || 0) - (totalExpenses || 0);
  return (
    <StyledTableRow>
      <StyledTableCell align="center">{sn}</StyledTableCell>
      <StyledTableCell>{data?.tripId}</StyledTableCell>
      <StyledTableCell>{vehicle?.regNo}</StyledTableCell>
      <StyledTableCell>
        {moment(data?.startDate).format('DD/MM/YYYY')}
      </StyledTableCell>
      <StyledTableCell>{data?.party?.name}</StyledTableCell>
      <StyledTableCell>{data?.from + ' to ' + data?.to}</StyledTableCell>
      <StyledTableCell align="right">{data?.distance}</StyledTableCell>
      <StyledTableCell align="right">{data?.tripValue}</StyledTableCell>
      <StyledTableCell align="right">{totalExpenses}</StyledTableCell>
      <StyledTableCell align="right">{netProfit}</StyledTableCell>
      <StyledTableCell align="center">
        <IconButton
          color="secondary"
          size="small"
          onClick={() => setInvoice(true)}
        >
          <IconListSearch size={20} color="#614cab" />
        </IconButton>
      </StyledTableCell>
      <StyledTableCell align="center">
        <ButtonGroup>
          <IconButton
            color="primary"
            size="small"
            onClick={() => navigate(`edit/${data?.id}`)}
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
        {/* <TripInvoice
          open={invoice}
          handleClose={() => setInvoice(false)}
          data={data}
        />
        <ConfirmDialog
          open={dialog}
          setOpen={setDialog}
          content="Delete Trip"
          handleDelete={handleDelete}
        /> */}
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default RepairMaintenanceRow;
