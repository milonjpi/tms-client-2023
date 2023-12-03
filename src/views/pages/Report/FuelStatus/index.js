import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TablePagination from '@mui/material/TablePagination';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import LinearProgress from '@mui/material/LinearProgress';
import MainCard from 'ui-component/cards/MainCard';
import { StyledTableCell, StyledTableRow } from 'ui-component/table-component';
import { useGetFuelStatusQuery } from 'store/api/report/reportApi';
import { useVehiclesQuery } from 'store/api/vehicle/vehicleApi';
import ControlledAutoComplete from 'ui-component/form-components/ControlledAutoComplete';
import FuelStatusRow from './FuelStatusRow';

const FuelStatus = () => {
  const [vehicle, setVehicle] = useState(null);

  // pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  // end pagination

  // library
  const { data: vehicleData } = useVehiclesQuery(
    { limit: 100, sortBy: 'vehicleId', sortOrder: 'asc', isActive: true },
    { refetchOnMountOrArgChange: true }
  );
  const allVehicles = vehicleData?.vehicles || [];
  // end library

  // filtering
  const query = {};

  query['limit'] = rowsPerPage;
  query['page'] = page;
  query['sortBy'] = 'vehicleId';
  query['sortOrder'] = 'asc';

  if (vehicle) {
    query['vehicleId'] = vehicle.id;
  }

  const { data, isLoading } = useGetFuelStatusQuery(
    { ...query },
    { refetchOnMountOrArgChange: true }
  );

  const allFuelStatus = data?.fuelStatus || [];
  const meta = data?.meta;

  let sn = page * rowsPerPage + 1;
  return (
    <MainCard title="Fuel Status">
      <Box sx={{ mb: 2 }}>
        <Grid container spacing={2} sx={{ alignItems: 'end' }}>
          <Grid item xs={12} md={4}>
            <ControlledAutoComplete
              label="Select Vehicle"
              required
              value={vehicle}
              options={allVehicles}
              getOptionLabel={(option) =>
                option.vehicleId + ' - ' + option.regNo
              }
              isOptionEqualToValue={(item, value) => item.id === value.id}
              onChange={(e, newValue) => setVehicle(newValue)}
            />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ overflow: 'auto' }}>
        <Table sx={{ minWidth: 400 }}>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="center">SN</StyledTableCell>
              <StyledTableCell>Vehicle</StyledTableCell>
              <StyledTableCell align="right">
                Fuel Refilled &#40;QTY&#41;
              </StyledTableCell>
              <StyledTableCell align="right">
                Fuel Refilled &#40;Amount&#41;
              </StyledTableCell>
              <StyledTableCell align="right">
                Fuel Uses &#40;QTY&#41;
              </StyledTableCell>
              <StyledTableCell align="right">
                Fuel Uses &#40;Amount&#41;
              </StyledTableCell>
              <StyledTableCell align="right">
                Available &#40;QTY&#41;
              </StyledTableCell>
              <StyledTableCell align="right">
                Available &#40;Amount&#41;
              </StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {allFuelStatus?.length ? (
              allFuelStatus.map((item) => (
                <FuelStatusRow key={item.id} sn={sn++} data={item} />
              ))
            ) : (
              <StyledTableRow>
                <StyledTableCell colSpan={12} sx={{ border: 0 }} align="center">
                  {isLoading ? (
                    <LinearProgress sx={{ opacity: 0.5, py: 0.5 }} />
                  ) : (
                    'No Data'
                  )}
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </Box>
      <TablePagination
        rowsPerPageOptions={[10, 20, 40]}
        component="div"
        count={meta?.total || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </MainCard>
  );
};

export default FuelStatus;
