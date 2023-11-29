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
import { useNavigate } from 'react-router-dom';
import { useDeleteMaintenanceMutation } from 'store/api/maintenance/maintenanceApi';

const RepairMaintenanceRow = ({ sn, data }) => {
  const vehicle = data?.vehicle;
  const driver = data?.driver;
  const navigate = useNavigate();

  const [dialog, setDialog] = useState(false);
  const [billOpen, setBillOpen] = useState(false);

  const [deleteMaintenance] = useDeleteMaintenanceMutation();

  const dispatch = useDispatch();

  const handleDelete = async () => {
    setDialog(false);
    try {
      const res = await deleteMaintenance(data?.id).unwrap();
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
      <StyledTableCell>
        {moment(data?.date).format('DD/MM/YYYY')}
      </StyledTableCell>
      <StyledTableCell>{data?.billNo}</StyledTableCell>
      <StyledTableCell>{vehicle?.regNo}</StyledTableCell>

      <StyledTableCell>{driver?.name}</StyledTableCell>
      <StyledTableCell>{data?.workshopType}</StyledTableCell>
      <StyledTableCell>{data?.maintenanceType}</StyledTableCell>
      <StyledTableCell align="right">{data?.serviceCharge}</StyledTableCell>
      <StyledTableCell>{data?.remarks}</StyledTableCell>
      <StyledTableCell align="center">
        <IconButton
          color="secondary"
          size="small"
          onClick={() => setBillOpen(true)}
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
        /> */}
        <ConfirmDialog
          open={dialog}
          setOpen={setDialog}
          content="Delete Repair Maintenance"
          handleDelete={handleDelete}
        />
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default RepairMaintenanceRow;
