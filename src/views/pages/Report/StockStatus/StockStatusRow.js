import { StyledTableCell, StyledTableRow } from 'ui-component/table-component';
import { totalSum } from 'views/utilities/NeedyFunction';

const StockStatusRow = ({ sn, data }) => {
  // calculation
  const purchasedQty = totalSum(data?.equipments || [], 'quantity');
  const purchasedAmount = totalSum(data?.equipments || [], 'totalPrice');

  const usedQty = totalSum(data?.equipmentUses || [], 'quantity');
  const usedAmount = totalSum(data?.equipmentUses || [], 'totalPrice');

  const availableQty = purchasedQty - usedQty;
  const availableAmount = purchasedAmount - usedAmount;
  return (
    <StyledTableRow>
      <StyledTableCell align="center">{sn}</StyledTableCell>
      <StyledTableCell>{data?.label}</StyledTableCell>
      <StyledTableCell align="right">{purchasedQty}</StyledTableCell>
      <StyledTableCell align="right">{purchasedAmount}</StyledTableCell>
      <StyledTableCell align="right">{usedQty}</StyledTableCell>
      <StyledTableCell align="right">{usedAmount}</StyledTableCell>
      <StyledTableCell align="right">{availableQty}</StyledTableCell>
      <StyledTableCell align="right">{availableAmount}</StyledTableCell>
    </StyledTableRow>
  );
};

export default StockStatusRow;
