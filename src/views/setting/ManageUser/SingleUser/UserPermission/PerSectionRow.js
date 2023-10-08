import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import { useDispatch } from 'react-redux';
import { setRefresh } from 'store/refreshSlice';
import { setToast } from 'store/toastSlice';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#614cab',
    color: theme.palette.common.white,
    padding: '6px',
  },
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

const PerSectionRow = ({ sn, data, userId, section }) => {
  const { title } = data;

  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();

  const handleSectionPermission = (e) => {
    const checkValue = e.target.checked;

    if (checkValue) {
      const newData = {
        userId,
        label: data?.id,
      };
      axiosPrivate
        .post('/section-permission/add', newData)
        .then((res) => {
          dispatch(setRefresh());
        })
        .catch((err) => {
          dispatch(setRefresh());
          dispatch(
            setToast({
              open: true,
              variant: 'error',
              message: 'Something Went Wrong',
            })
          );
        });
    } else {
      axiosPrivate
        .delete(`/section-permission/${section?.id}`)
        .then((res) => {
          dispatch(setRefresh());
        })
        .catch((err) => {
          dispatch(setRefresh());
          dispatch(
            setToast({
              open: true,
              variant: 'error',
              message: 'Something Went Wrong',
            })
          );
        });
    }
  };
  return (
    <StyledTableRow>
      <StyledTableCell>
        <FormControlLabel
          control={<Checkbox size="small" />}
          checked={section ? true : false}
          onChange={handleSectionPermission}
          label={title}
        />
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default PerSectionRow;
