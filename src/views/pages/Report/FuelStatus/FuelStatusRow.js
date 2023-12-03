import Typography from '@mui/material/Typography';
import { StyledTableCell, StyledTableRow } from 'ui-component/table-component';
import { totalSum } from 'views/utilities/NeedyFunction';

const FuelStatusRow = ({ sn, data }) => {
  // calculation
  const refilledQty = totalSum(data?.fuels || [], 'quantity');
  const refilledAmount = totalSum(data?.fuels || [], 'amount');

  const usesQty = totalSum(data?.expenses || [], 'unit');
  const usesAmount = totalSum(data?.expenses || [], 'amount');

  const availableQty = refilledQty - usesQty;
  const availableAmount = refilledAmount - usesAmount;

  return (
    <StyledTableRow>
      <StyledTableCell align="center">{sn}</StyledTableCell>
      <StyledTableCell>
        <Typography sx={{ fontSize: 11 }}>{data?.regNo}</Typography>
        <Typography sx={{ fontSize: 11 }}>
          {data?.brand + ' ' + data?.model}
        </Typography>
      </StyledTableCell>
      <StyledTableCell align="right">{refilledQty}</StyledTableCell>
      <StyledTableCell align="right">{refilledAmount}</StyledTableCell>
      <StyledTableCell align="right">{usesQty}</StyledTableCell>
      <StyledTableCell align="right">{usesAmount}</StyledTableCell>
      <StyledTableCell align="right">{availableQty}</StyledTableCell>
      <StyledTableCell align="right">{availableAmount}</StyledTableCell>
    </StyledTableRow>
  );
};

export default FuelStatusRow;
