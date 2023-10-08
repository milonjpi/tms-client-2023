import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import PerSubMenuRow from './PerSubMenuRow';
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

const PerMenuRow = ({
  sn,
  data,
  userId,
  userMenu,
  userSubMenus,
  userSections,
}) => {
  const { title, children } = data;

  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();

  const handleMenuPermission = (e) => {
    const checkValue = e.target.checked;

    if (checkValue) {
      const newData = {
        userId,
        label: data?.id,
      };
      axiosPrivate
        .post('/menu-permission/add', newData)
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
        .delete(`/menu-permission/${userMenu?.id}`)
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
      <StyledTableCell align="center">{sn}</StyledTableCell>
      <StyledTableCell>
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              checked={userMenu ? true : false}
              onChange={handleMenuPermission}
            />
          }
          label={title}
        />
      </StyledTableCell>
      <StyledTableCell>
        <Table>
          <TableBody>
            {children?.length
              ? children.map((el) => (
                  <PerSubMenuRow
                    key={el.id}
                    data={el}
                    userId={userId}
                    subMenu={userSubMenus?.find((tl) => tl.label === el.id)}
                    userSections={userSections}
                  />
                ))
              : null}
          </TableBody>
        </Table>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default PerMenuRow;
