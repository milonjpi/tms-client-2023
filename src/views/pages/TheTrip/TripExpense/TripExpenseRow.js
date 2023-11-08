import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import { IconEdit, IconTrashXFilled } from '@tabler/icons-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setToast } from 'store/toastSlice';
import ConfirmDialog from 'ui-component/ConfirmDialog';
import { StyledTableCell, StyledTableRow } from 'ui-component/table-component';
import { useDeleteTripExpenseMutation } from 'store/api/tripExpense/tripExpenseApi';
import moment from 'moment';
import UpdateTripExpense from './UpdateTripExpense';

const TripExpenseRow = ({ sn, data }) => {
  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState(false);

  const [deleteTripExpense] = useDeleteTripExpenseMutation();

  const dispatch = useDispatch();

  const handleDelete = async () => {
    setDialog(false);
    try {
      const res = await deleteTripExpense(data?.id).unwrap();
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

  // create expenses object
  const expensesObj = data?.tripExpenses?.reduce(
    (acc, el) => ({ ...acc, [el.expenseHeadId]: el.amount }),
    {}
  );
  return (
    <StyledTableRow>
      <StyledTableCell align="center">{sn}</StyledTableCell>
      <StyledTableCell>
        {moment(data?.startDate).format('DD/MM/YYYY')}
      </StyledTableCell>
      <StyledTableCell>{data?.tripId}</StyledTableCell>
      <StyledTableCell>{data?.from + '-' + data?.to}</StyledTableCell>
      <StyledTableCell align="right">{data?.tripValue}</StyledTableCell>
      {data?.tripExpenses?.map((el) => (
        <StyledTableCell key={el.id} align="right">
          {el?.amount}
        </StyledTableCell>
      ))}
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
          content="Delete Trip Expenses"
          handleDelete={handleDelete}
        />
        <UpdateTripExpense
          open={open}
          tripId={data?.id}
          preData={expensesObj}
          handleClose={() => setOpen(false)}
        />
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default TripExpenseRow;
