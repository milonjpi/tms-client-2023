import { StyledTableCell, StyledTableRow } from 'ui-component/table-component';

const InactiveDriverRow = ({ sn, data }) => {
  return (
    <StyledTableRow>
      <StyledTableCell align="center">{sn}</StyledTableCell>
      <StyledTableCell>{data?.driverId}</StyledTableCell>
      <StyledTableCell>{data?.name}</StyledTableCell>
      <StyledTableCell>{data?.mobile}</StyledTableCell>
      <StyledTableCell>{data?.address}</StyledTableCell>
    </StyledTableRow>
  );
};

export default InactiveDriverRow;
