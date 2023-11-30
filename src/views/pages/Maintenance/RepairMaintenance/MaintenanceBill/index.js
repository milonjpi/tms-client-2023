import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';
import PrintIcon from '@mui/icons-material/Print';
import moment from 'moment';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import MainCard from 'ui-component/cards/MainCard';
import { totalSum } from 'views/utilities/NeedyFunction';
import {
  StyledTableCellWithBorder,
  StyledTableCellWithNoBorder,
} from 'ui-component/table-component';

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

const MaintenanceBill = ({ open, handleClose, data }) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: `
    @media print {

    }
    `,
  });

  const allEquipmentUses = data?.equipmentUses || [];
  const allExtEquipmentUses = data?.externalEquipmentUses || [];

  const itemUses =
    data?.workshopType === 'InHouse' ? allEquipmentUses : allExtEquipmentUses;

  const itemUsesPrice = totalSum(itemUses, 'totalPrice');

  const totalExpenses = (data?.serviceCharge || 0) + itemUsesPrice;

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
            Maintenance Bill
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
                fontSize: 22,
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
                <Table>
                  <TableBody>
                    <TableRow>
                      <StyledTableCellWithNoBorder sx={{ fontWeight: 700 }}>
                        Vehicle
                      </StyledTableCellWithNoBorder>
                      <StyledTableCellWithNoBorder>
                        :
                      </StyledTableCellWithNoBorder>
                      <StyledTableCellWithNoBorder>
                        {data?.vehicle?.regNo}
                      </StyledTableCellWithNoBorder>
                    </TableRow>
                    <TableRow>
                      <StyledTableCellWithNoBorder sx={{ fontWeight: 700 }}>
                        Workshop Type
                      </StyledTableCellWithNoBorder>
                      <StyledTableCellWithNoBorder>
                        :
                      </StyledTableCellWithNoBorder>
                      <StyledTableCellWithNoBorder>
                        {data?.workshopType === 'InHouse'
                          ? 'In House'
                          : data?.workshopType}
                      </StyledTableCellWithNoBorder>
                    </TableRow>
                    <TableRow>
                      <StyledTableCellWithNoBorder sx={{ fontWeight: 700 }}>
                        Maintenance Type
                      </StyledTableCellWithNoBorder>
                      <StyledTableCellWithNoBorder>
                        :
                      </StyledTableCellWithNoBorder>
                      <StyledTableCellWithNoBorder>
                        {data?.maintenanceType}
                      </StyledTableCellWithNoBorder>
                    </TableRow>
                  </TableBody>
                </Table>
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
                      Maintenance Date:
                    </Typography>
                    <Typography sx={{ fontSize: 11 }}>
                      {moment(data?.date).format('DD/MM/YYYY')}
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 1 }}>
                    <Typography sx={{ fontSize: 12, fontWeight: 700 }}>
                      Bill No:{' '}
                      <span style={{ fontSize: 11, fontWeight: 400 }}>
                        {data?.billNo}
                      </span>
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 1 }}>
                    <Typography sx={{ fontSize: 12, fontWeight: 700 }}>
                      Service Charge:
                    </Typography>
                    <Typography sx={{ fontSize: 11 }}>
                      {data?.serviceCharge || 0}
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
            <Box sx={{ mt: 2 }}>
              <Typography
                sx={{ fontSize: 16, fontWeight: 700, color: '#666', mb: 0.5 }}
              >
                Item Details
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledTableCellWithBorder>
                      Description
                    </StyledTableCellWithBorder>
                    <StyledTableCellWithBorder align="right">
                      Qty
                    </StyledTableCellWithBorder>
                    <StyledTableCellWithBorder align="right">
                      Unit Price
                    </StyledTableCellWithBorder>
                    <StyledTableCellWithBorder align="right">
                      Total Price
                    </StyledTableCellWithBorder>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {itemUses?.length ? (
                    itemUses?.map((el) => (
                      <TableRow>
                        <StyledTableCellWithBorder>
                          {el.equipmentTitle?.label}
                        </StyledTableCellWithBorder>
                        <StyledTableCellWithBorder align="right">
                          {el.quantity}
                        </StyledTableCellWithBorder>
                        <StyledTableCellWithBorder align="right">
                          {el.unitPrice}
                        </StyledTableCellWithBorder>
                        <StyledTableCellWithBorder align="right">
                          {el.totalPrice}
                        </StyledTableCellWithBorder>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <StyledTableCellWithBorder colSpan={4} align="center">
                        No Data
                      </StyledTableCellWithBorder>
                    </TableRow>
                  )}
                  {itemUses?.length ? (
                    <TableRow>
                      <StyledTableCellWithBorder
                        colSpan={3}
                        align="right"
                        sx={{ fontWeight: 700 }}
                      >
                        Total
                      </StyledTableCellWithBorder>
                      <StyledTableCellWithBorder
                        align="right"
                        sx={{ fontWeight: 700 }}
                      >
                        {itemUsesPrice}
                      </StyledTableCellWithBorder>
                    </TableRow>
                  ) : null}
                </TableBody>
              </Table>
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
                        Maintenance Summary
                      </Typography>
                    }
                  >
                    <Box>
                      <Typography sx={{ fontSize: 13, mb: 1.3 }}>
                        Service Charge:{' '}
                        <span style={{ fontWeight: 700 }}>
                          {data?.serviceCharge || 0}
                        </span>
                      </Typography>
                      <Typography sx={{ fontSize: 13, mb: 1.3 }}>
                        Equipment Expenses:{' '}
                        <span style={{ fontWeight: 700 }}>{itemUsesPrice}</span>
                      </Typography>
                      <Typography sx={{ fontSize: 13 }}>
                        Total Expenses:{' '}
                        <span style={{ fontWeight: 700 }}>{totalExpenses}</span>
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

export default MaintenanceBill;
