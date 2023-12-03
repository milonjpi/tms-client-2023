import Typography from '@mui/material/Typography';
import { StyledTableCell, StyledTableRow } from 'ui-component/table-component';
import { totalSum } from 'views/utilities/NeedyFunction';

const ReportSummaryRow = ({ sn, data }) => {
  // calculation
  const totalTrip = data?.incomes?.length || 0;
  const tripIncomes = totalSum(data?.incomes || [], 'amount');

  // expenses
  const filterTripExpenses = data?.expenses?.filter((el) => !el.miscellaneous);
  const filterMiscExpenses = data?.expenses?.filter((el) => el.miscellaneous);

  const tripExpenses = totalSum(filterTripExpenses || [], 'amount');
  const miscExpenses = totalSum(filterMiscExpenses || [], 'amount');

  // maintenance
  const maintenanceExpenses = totalSum(
    data?.maintenances || [],
    'serviceCharge'
  );
  const equipmentUseExpenses = totalSum(
    data?.equipmentUses || [],
    'totalPrice'
  );
  const exEquipmentUseExpenses = totalSum(
    data?.externalEquipmentUses || [],
    'totalPrice'
  );
  const totalMaintenanceCost =
    maintenanceExpenses + equipmentUseExpenses + exEquipmentUseExpenses;

  // documentation cost
  const paperWorkExpenses = totalSum(data?.paperWorks || [], 'totalAmount');

  // total sum
  const totalCost =
    tripExpenses + totalMaintenanceCost + miscExpenses + paperWorkExpenses;

  return (
    <StyledTableRow>
      <StyledTableCell align="center">{sn}</StyledTableCell>
      <StyledTableCell>
        <Typography sx={{ fontSize: 11 }}>{data?.regNo}</Typography>
        <Typography sx={{ fontSize: 11 }}>
          {data?.brand + ' ' + data?.model}
        </Typography>
      </StyledTableCell>
      <StyledTableCell align="right">{totalTrip}</StyledTableCell>
      <StyledTableCell align="right">{tripIncomes}</StyledTableCell>
      <StyledTableCell align="right">{tripExpenses}</StyledTableCell>
      <StyledTableCell align="right">{totalMaintenanceCost}</StyledTableCell>
      <StyledTableCell align="right">{miscExpenses}</StyledTableCell>
      <StyledTableCell align="right">{paperWorkExpenses}</StyledTableCell>
      <StyledTableCell align="right">{totalCost}</StyledTableCell>
    </StyledTableRow>
  );
};

export default ReportSummaryRow;
