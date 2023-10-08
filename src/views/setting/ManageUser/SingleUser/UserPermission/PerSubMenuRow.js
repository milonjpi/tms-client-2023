import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import { useDispatch } from 'react-redux';
import { setRefresh } from 'store/refreshSlice';
import { setToast } from 'store/toastSlice';
import PerSectionRow from './PerSectionRow';

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

const PerSubMenuRow = ({ sn, data, userId, subMenu, userSections }) => {
  const { title, children } = data;

  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();

  const handleSubMenuPermission = (e) => {
    const checkValue = e.target.checked;

    if (checkValue) {
      const newData = {
        userId,
        label: data?.id,
      };
      axiosPrivate
        .post('/subMenu-permission/add', newData)
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
        .delete(`/subMenu-permission/${subMenu?.id}`)
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
          checked={subMenu ? true : false}
          onChange={handleSubMenuPermission}
          label={title}
        />
      </StyledTableCell>
      <StyledTableCell>
        <Table>
          <TableBody>
            {children?.length
              ? children.map((el) => (
                  <PerSectionRow
                    key={el.id}
                    data={el}
                    userId={userId}
                    section={userSections?.find((tl) => tl.label === el.id)}
                  />
                ))
              : null}
          </TableBody>
        </Table>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default PerSubMenuRow;
