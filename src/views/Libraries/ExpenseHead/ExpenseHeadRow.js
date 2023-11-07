import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { IconEdit, IconTrashXFilled } from '@tabler/icons-react';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setToast } from 'store/toastSlice';
import ConfirmDialog from 'ui-component/ConfirmDialog';
import { StyledTableCell, StyledTableRow } from 'ui-component/table-component';
import { useDeleteExpenseHeadMutation } from 'store/api/expenseHead/expenseHeadApi';
import UpdateExpenseHead from './UpdateExpenseHead';

const ExpenseHeadRow = ({ sn, data }) => {
  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState(false);

  const [deleteExpenseHead] = useDeleteExpenseHeadMutation();

  const dispatch = useDispatch();

  const handleDelete = async () => {
    setDialog(false);
    try {
      const res = await deleteExpenseHead(data?.id).unwrap();
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
      <StyledTableCell sx={{ textTransform: 'capitalize' }}>
        {data?.type + ' Expense'}
      </StyledTableCell>
      <StyledTableCell>{data?.label}</StyledTableCell>
      <StyledTableCell align="center">
        {data?.type === 'trip' ? (
          <Tooltip title="Not Editable">
            <ArticleOutlinedIcon />
          </Tooltip>
        ) : (
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
        )}

        <ConfirmDialog
          open={dialog}
          setOpen={setDialog}
          content="Delete Expense Head"
          handleDelete={handleDelete}
        />
        <UpdateExpenseHead
          open={open}
          preData={data}
          handleClose={() => setOpen(false)}
        />
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default ExpenseHeadRow;
