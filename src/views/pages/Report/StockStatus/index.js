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
import { useGetStockStatusQuery } from 'store/api/report/reportApi';
import ControlledAutoComplete from 'ui-component/form-components/ControlledAutoComplete';
import { useGetEquipmentTitlesQuery } from 'store/api/equipmentTitle/equipmentTitleSlice';
import StockStatusRow from './StockStatusRow';

const StockStatus = () => {
  const [equipment, setEquipment] = useState(null);

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
  const { data: equipmentTitlesData } = useGetEquipmentTitlesQuery(
    { limit: 200, sortBy: 'label', sortOrder: 'asc' },
    { refetchOnMountOrArgChange: true }
  );

  const allEquipmentTitles = equipmentTitlesData?.equipmentTitles || [];
  // end library

  // filtering
  const query = {};

  query['limit'] = rowsPerPage;
  query['page'] = page;
  query['sortBy'] = 'label';
  query['sortOrder'] = 'asc';

  if (equipment) {
    query['equipmentId'] = equipment.id;
  }

  const { data, isLoading } = useGetStockStatusQuery(
    { ...query },
    { refetchOnMountOrArgChange: true }
  );

  const allStockStatus = data?.stockStatus || [];
  const meta = data?.meta;

  let sn = page * rowsPerPage + 1;
  return (
    <MainCard title="Stock Status">
      <Box sx={{ mb: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <ControlledAutoComplete
              label="Select Equipment"
              required
              value={equipment}
              options={allEquipmentTitles}
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(item, value) => item.id === value.id}
              onChange={(e, newValue) => setEquipment(newValue)}
            />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ overflow: 'auto' }}>
        <Table sx={{ minWidth: 400 }}>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="center">SN</StyledTableCell>
              <StyledTableCell>Equipment</StyledTableCell>
              <StyledTableCell align="right">
                Purchased &#40;QTY&#41;
              </StyledTableCell>
              <StyledTableCell align="right">
                Purchased &#40;Amount&#41;
              </StyledTableCell>
              <StyledTableCell align="right">
                Item Used &#40;QTY&#41;
              </StyledTableCell>
              <StyledTableCell align="right">
                Item Used &#40;Amount&#41;
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
            {allStockStatus?.length ? (
              allStockStatus.map((item) => (
                <StockStatusRow key={item.id} sn={sn++} data={item} />
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

export default StockStatus;
