import { StyledTableCell, StyledTableRow } from 'ui-component/table-component';

const InactiveVehicleRow = ({ sn, data }) => {
  const driver = data?.driver;
  return (
    <StyledTableRow>
      <StyledTableCell align="center">{sn}</StyledTableCell>
      <StyledTableCell>{data?.vehicleId}</StyledTableCell>
      <StyledTableCell>{data?.regNo}</StyledTableCell>
      <StyledTableCell>{data?.brand + ' ' + data?.model}</StyledTableCell>
      <StyledTableCell>{data?.vehicleValue}</StyledTableCell>
      <StyledTableCell>{driver ? driver?.name : 'n/a'}</StyledTableCell>
    </StyledTableRow>
  );
};

export default InactiveVehicleRow;
