import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import { IconEdit, IconTrashXFilled } from '@tabler/icons-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setRefresh } from 'store/refreshSlice';
import { setToast } from 'store/toastSlice';
import ConfirmDialog from 'ui-component/ConfirmDialog';
import UpdateUser from './UpdateUser';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import { roleValue } from 'assets/data';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    padding: '6px',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const ManageUserRow = ({ sn, data }) => {
  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState(false);

  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const handleDelete = () => {
    setDialog(false);
    axiosPrivate
      .delete(`/user/${data?.id}`)
      .then((res) => {
        dispatch(setRefresh());
        dispatch(
          setToast({
            open: true,
            variant: 'success',
            message: res.data?.message,
          })
        );
      })
      .catch((err) => {
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
    <StyledTableRow>
      <StyledTableCell align="center">{sn}</StyledTableCell>
      <StyledTableCell>
        <Link to={`${data?.id}`}>{data?.fullName}</Link>
      </StyledTableCell>
      <StyledTableCell>{data?.userName}</StyledTableCell>
      <StyledTableCell>{roleValue[data?.role] || ''}</StyledTableCell>
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
          content="Delete User"
          handleDelete={handleDelete}
        />
        <UpdateUser
          open={open}
          preData={data}
          handleClose={() => setOpen(false)}
        />
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default ManageUserRow;
