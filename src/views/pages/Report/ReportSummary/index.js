import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TablePagination from '@mui/material/TablePagination';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import LinearProgress from '@mui/material/LinearProgress';
import MainCard from 'ui-component/cards/MainCard';
import { StyledTableCell, StyledTableRow } from 'ui-component/table-component';
import moment from 'moment';
import { useGetSummaryQuery } from 'store/api/report/reportApi';
import { useVehiclesQuery } from 'store/api/vehicle/vehicleApi';
import ControlledAutoComplete from 'ui-component/form-components/ControlledAutoComplete';
import ReportSummaryRow from './ReportSummaryRow';

const ReportSummary = () => {
  const [vehicle, setVehicle] = useState(null);
  const [startDate, setStartDate] = useState(moment().subtract(30, 'days'));
  const [endDate, setEndDate] = useState(moment());

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

  if (startDate) {
    query['startDate'] = moment(startDate).format('YYYY-MM-DD');
  }

  if (endDate) {
    query['endDate'] = moment(endDate).format('YYYY-MM-DD');
  }

  const { data, isLoading } = useGetSummaryQuery(
    { ...query },
    { refetchOnMountOrArgChange: true }
  );

  const allSummaries = data?.summaries || [];
  const meta = data?.meta;

  let sn = page * rowsPerPage + 1;
  return (
    <MainCard title="Summary">
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
          <Grid item xs={12} md={4}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label="Start Date"
                views={['year', 'month', 'day']}
                inputFormat="DD/MM/YYYY"
                value={startDate}
                onChange={(newValue) => {
                  setStartDate(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    required
                    size="small"
                    autoComplete="off"
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} md={4}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label="End Date"
                views={['year', 'month', 'day']}
                minDate={startDate}
                inputFormat="DD/MM/YYYY"
                value={endDate}
                onChange={(newValue) => {
                  setEndDate(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    required
                    size="small"
                    autoComplete="off"
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ overflow: 'auto' }}>
        <Table sx={{ minWidth: 400 }}>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="center">SN</StyledTableCell>
              <StyledTableCell>Vehicle</StyledTableCell>
              <StyledTableCell align="right">Total Trip</StyledTableCell>
              <StyledTableCell align="right">Trip Income</StyledTableCell>
              <StyledTableCell align="right">Trip Expense</StyledTableCell>
              <StyledTableCell align="right">
                Maintenance Expense
              </StyledTableCell>
              <StyledTableCell align="right">
                Miscellaneous Expense
              </StyledTableCell>
              <StyledTableCell align="right">
                Documentation Cost
              </StyledTableCell>
              <StyledTableCell align="right">Total Expense</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {allSummaries?.length ? (
              allSummaries.map((item) => (
                <ReportSummaryRow key={item.id} sn={sn++} data={item} />
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

export default ReportSummary;
