import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';
import PrintIcon from '@mui/icons-material/Print';
import moment from 'moment';
import styled from '@emotion/styled';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import MainCard from 'ui-component/cards/MainCard';
import { totalSum } from 'views/utilities/NeedyFunction';

const TableCellLeft = styled.td`
  text-align: left;
  padding: 8px;
  font-size: 12px;
  border-left: 1px solid #000;
  border-right: 1px solid #000;
  border-bottom: 1px solid #000;
`;

const TableCellRight = styled.td`
  text-align: right;
  padding: 8px;
  font-size: 12px;
  width: 100px;
  border-right: 1px solid #000;
  border-bottom: 1px solid #000;
`;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: 350, sm: 500, md: 750 },
  maxHeight: '100vh',
  overflow: 'auto',
  boxShadow: 24,
  p: 2,
};

const TripInvoice = ({ open, handleClose, data }) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: `
    @media print {

    }
    `,
  });

  const expenseData = data?.tripExpenses || [];
  const tripValue = data?.tripValue || 0;
  const tripExpenses = data?.tripExpenses || [];
  const totalExpenses = totalSum(tripExpenses, 'amount');

  const netProfit = tripValue - totalExpenses;

  return (
    <Modal open={open} onClose={handleClose}>
      <Paper sx={style}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <Typography sx={{ fontSize: 18, color: '#878781' }}>
            Trip Invoice
          </Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon color="error" fontSize="small" />
          </IconButton>
          <IconButton
            onClick={handlePrint}
            size="small"
            sx={{ position: 'absolute', top: 70, right: 16, zIndex: 12 }}
          >
            <PrintIcon color="primary" fontSize="small" />
          </IconButton>
        </Box>
        <Divider sx={{ mt: 0.5, mb: 2 }} />
        <Box
          sx={{
            minWidth: 600,
            p: 3,
          }}
          ref={componentRef}
        >
          <Box className="printPage">
            <Typography
              sx={{
                fontSize: 30,
                textTransform: 'uppercase',
                fontWeight: 700,
                mb: 2,
                lineHeight: 1,
                color: '#614cab',
              }}
            >
              Invoice/Bill
            </Typography>

            <Box
              sx={{
                mt: 3,
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
              }}
            >
              <Box>
                <Typography sx={{ fontWeight: 700, fontSize: 12 }}>
                  {data?.party?.name}
                </Typography>
                <Typography sx={{ fontSize: 12, letterSpacing: 2 }}>
                  {data?.party?.address}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Box sx={{ pr: 2 }}>
                  <Box sx={{ mb: 1 }}>
                    <Typography sx={{ fontSize: 12, fontWeight: 700 }}>
                      Invoice Date:
                    </Typography>
                    <Typography sx={{ fontSize: 11 }}>
                      {moment(data?.createdAt).format('DD/MM/YYYY')}
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 1 }}>
                    <Typography sx={{ fontSize: 12, fontWeight: 700 }}>
                      Invoice No:
                    </Typography>
                    <Typography sx={{ fontSize: 11 }}>
                      {data?.tripId}
                    </Typography>
                  </Box>
                </Box>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ borderColor: '#111', opacity: 1 }}
                />
                <Box sx={{ pl: 2 }}>
                  <Typography sx={{ fontSize: 12, fontWeight: 700 }}>
                    Company Name
                  </Typography>
                  <Typography sx={{ fontSize: 11 }}>
                    24/7, Ali Jahan Road
                  </Typography>
                  <Typography sx={{ fontSize: 11 }}>Dhaka.</Typography>
                </Box>
              </Box>
            </Box>
            <Divider sx={{ mt: 2, borderColor: '#000' }} />
            <Box>
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                }}
              >
                <thead style={{ borderBottom: '1px solid #000' }}>
                  <tr>
                    <TableCellLeft>Description</TableCellLeft>
                    <TableCellRight>Income</TableCellRight>
                    <TableCellRight>Expense</TableCellRight>
                  </tr>
                </thead>
                <tbody style={{ borderBottom: '1px solid #000' }}>
                  <tr>
                    <TableCellLeft>
                      <Typography sx={{ fontSize: 12 }}>
                        {data.vehicle?.regNo}
                      </Typography>
                      <Typography sx={{ fontSize: 12 }}>
                        {data.from +
                          '-' +
                          data?.to +
                          (data?.distance ? ', ' + data?.distance + ' KM' : '')}
                      </Typography>
                    </TableCellLeft>
                    <TableCellRight>{data?.tripValue || 0}</TableCellRight>
                    <TableCellRight></TableCellRight>
                  </tr>
                  {expenseData.map((el) => (
                    <tr key={el.id}>
                      <TableCellLeft>{el.expenseHead?.label}</TableCellLeft>
                      <TableCellRight></TableCellRight>
                      <TableCellRight>{el.amount}</TableCellRight>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
            <Box sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={5}>
                  <MainCard
                    sx={{ borderColor: '#999' }}
                    headerX={{ p: 1.8 }}
                    contentSX={{ p: 2, '&:last-child': { pb: 2 } }}
                    title={
                      <Typography
                        component="span"
                        sx={{ fontSize: 16, lineHeight: 1, fontWeight: 700 }}
                      >
                        Payment Info
                      </Typography>
                    }
                  >
                    <Box>
                      <Typography sx={{ fontSize: 13, mb: 1.3 }}>
                        Trip Income:{' '}
                        <span style={{ fontWeight: 700 }}>{tripValue}</span>
                      </Typography>
                      <Typography sx={{ fontSize: 13, mb: 1.3 }}>
                        Trip Expenses:{' '}
                        <span style={{ fontWeight: 700 }}>{totalExpenses}</span>
                      </Typography>
                      <Typography sx={{ fontSize: 13 }}>
                        Net Profit:{' '}
                        <span style={{ fontWeight: 700 }}>{netProfit}</span>
                      </Typography>
                    </Box>
                  </MainCard>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Modal>
  );
};

export default TripInvoice;
