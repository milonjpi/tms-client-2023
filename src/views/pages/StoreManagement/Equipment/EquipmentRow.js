import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import { IconEdit, IconTrashXFilled } from '@tabler/icons-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setToast } from 'store/toastSlice';
import ConfirmDialog from 'ui-component/ConfirmDialog';
import { StyledTableCell, StyledTableRow } from 'ui-component/table-component';
import moment from 'moment';
import { useDeleteEquipmentMutation } from 'store/api/equipment/equipmentApi';
import UpdateEquipment from './UpdateEquipment';

const EquipmentRow = ({ sn, data }) => {
  const equipmentTitle = data?.equipmentTitle;

  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState(false);

  const [deleteEquipment] = useDeleteEquipmentMutation();

  const dispatch = useDispatch();

  const handleDelete = async () => {
    setDialog(false);
    try {
      const res = await deleteEquipment(data?.id).unwrap();
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
      <StyledTableCell>{equipmentTitle?.label}</StyledTableCell>
      <StyledTableCell>{equipmentTitle?.uom?.label}</StyledTableCell>
      <StyledTableCell align="right">{data?.quantity}</StyledTableCell>
      <StyledTableCell align="right">{data?.unitPrice}</StyledTableCell>
      <StyledTableCell align="right">{data?.totalPrice}</StyledTableCell>
      <StyledTableCell>{data?.remarks}</StyledTableCell>
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
        <UpdateEquipment
          open={open}
          handleClose={() => setOpen(false)}
          preData={data}
        />
        <ConfirmDialog
          open={dialog}
          setOpen={setDialog}
          content="Delete Equipment"
          handleDelete={handleDelete}
        />
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default EquipmentRow;
