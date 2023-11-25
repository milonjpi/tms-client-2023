import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { IconEdit } from '@tabler/icons-react';
import { useState } from 'react';
import { StyledTableCell, StyledTableRow } from 'ui-component/table-component';
import UpdateAccountHead from './UpdateAccountHead';

const AccountHeadRow = ({ sn, data }) => {
  const [open, setOpen] = useState(false);
  return (
    <StyledTableRow>
      <StyledTableCell align="center">{sn}</StyledTableCell>
      <StyledTableCell>{data?.label}</StyledTableCell>
      <StyledTableCell align="center">
        <Typography
          component="span"
          sx={{
            display: 'inline-block',
            fontSize: 9,
            p: 0.3,
            minWidth: 40,
            textAlign: 'center',
            borderRadius: 1,
            color: data?.isIncome ? '#006644' : '#E53935',
            backgroundColor: data?.isIncome ? '#E3FCEF' : '#ffcdd2',
          }}
        >
          {data?.isIncome ? 'YES' : 'NO'}
        </Typography>
      </StyledTableCell>
      <StyledTableCell align="center">
        <IconButton color="primary" size="small" onClick={() => setOpen(true)}>
          <IconEdit color="#468B97" size={18} />
        </IconButton>
        <UpdateAccountHead
          open={open}
          preData={data}
          handleClose={() => setOpen(false)}
        />
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default AccountHeadRow;
