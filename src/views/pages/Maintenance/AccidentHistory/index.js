import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TablePagination from '@mui/material/TablePagination';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import InputBase from '@mui/material/InputBase';
import InputAdornment from '@mui/material/InputAdornment';
import LinearProgress from '@mui/material/LinearProgress';
import SearchIcon from '@mui/icons-material/Search';
import MainCard from 'ui-component/cards/MainCard';
import CardAction from 'ui-component/cards/CardAction';
import { IconPlus } from '@tabler/icons-react';
import { StyledTableCell, StyledTableRow } from 'ui-component/table-component';
import { useDebounced } from 'hooks';
import AccidentHistoryRow from './AccidentHistoryRow';
import AddAccidentHistory from './AddAccidentHistory';
import { useGetHistoriesQuery } from 'store/api/accidentHistory/accidentHistoryApi';

const AccidentHistory = () => {
  const [searchText, setSearchText] = useState('');

  const [open, setOpen] = useState(false);

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

  // filtering
  const query = {};

  query['limit'] = rowsPerPage;
  query['page'] = page;

  // search term
  const debouncedSearchTerm = useDebounced({
    searchQuery: searchText,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query['searchTerm'] = debouncedSearchTerm;
  }

  const { data, isLoading } = useGetHistoriesQuery(
    { ...query },
    { refetchOnMountOrArgChange: true }
  );

  const allAccidentHistories = data?.accidentHistories || [];
  const meta = data?.meta;

  let sn = page * rowsPerPage + 1;
  return (
    <MainCard
      title="Accident History"
      secondary={
        <CardAction
          title="Add Accident History"
          onClick={() => setOpen(true)}
          icon={<IconPlus />}
        />
      }
    >
      <Box sx={{ mb: 2 }}>
        <Grid container spacing={2} sx={{ alignItems: 'end' }}>
          <Grid item xs={12} md={6}>
            <InputBase
              fullWidth
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              sx={{ borderBottom: '1px solid #ccc' }}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
            />
          </Grid>
        </Grid>
      </Box>
      {/* popup items */}

      <AddAccidentHistory open={open} handleClose={() => setOpen(false)} />
      {/* end popup items */}
      <Box sx={{ overflow: 'auto' }}>
        <Table sx={{ minWidth: 400 }}>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="center">SN</StyledTableCell>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Vehicle</StyledTableCell>
              <StyledTableCell>Driver</StyledTableCell>
              <StyledTableCell>Location</StyledTableCell>
              <StyledTableCell>Details</StyledTableCell>
              <StyledTableCell>Amount Status</StyledTableCell>
              <StyledTableCell align="right">
                Amount&#40;TK&#41;
              </StyledTableCell>
              <StyledTableCell align="right">Odometer</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {allAccidentHistories?.length ? (
              allAccidentHistories.map((item) => (
                <AccidentHistoryRow key={item.id} sn={sn++} data={item} />
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

export default AccidentHistory;
