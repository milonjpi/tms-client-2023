import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { IconEdit, IconTrashXFilled } from '@tabler/icons-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setToast } from 'store/toastSlice';
import ConfirmDialog from 'ui-component/ConfirmDialog';
import { StyledTableCell, StyledTableRow } from 'ui-component/table-component';
import moment from 'moment';
import { useDeletePaperWorkMutation } from 'store/api/paperWork/paperWorkApi';
import UpdatePaperWork from '../UpdatePaperWork';

const FitnessRow = ({ sn, data }) => {
  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState(false);

  const [deletePaperWork] = useDeletePaperWorkMutation();

  const dispatch = useDispatch();

  const handleDelete = async () => {
    setDialog(false);
    try {
      const res = await deletePaperWork(data?.id).unwrap();
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
      <StyledTableCell>
        <Typography sx={{ fontSize: 11 }}>{data?.vehicle?.regNo}</Typography>
        <Typography sx={{ fontSize: 11 }}>
          {data?.vehicle?.brand + ' ' + data?.vehicle?.model}
        </Typography>
      </StyledTableCell>
      <StyledTableCell>{data?.odoMeter}</StyledTableCell>
      <StyledTableCell>{data?.certificateNo}</StyledTableCell>
      <StyledTableCell>
        {moment(data?.effectiveDate).format('DD/MM/YYYY')}
      </StyledTableCell>
      <StyledTableCell>
        {data?.expiryDate
          ? moment(data?.expiryDate).format('DD/MM/YYYY')
          : 'n/a'}
      </StyledTableCell>
      <StyledTableCell align="right">{data?.fee}</StyledTableCell>
      <StyledTableCell align="right">{data?.totalAmount}</StyledTableCell>
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
        <ConfirmDialog
          open={dialog}
          setOpen={setDialog}
          content="Delete Document"
          handleDelete={handleDelete}
        />
        <UpdatePaperWork
          open={open}
          preData={data}
          handleClose={() => setOpen(false)}
        />
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default FitnessRow;
