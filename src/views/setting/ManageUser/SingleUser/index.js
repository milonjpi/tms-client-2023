import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { styled } from '@mui/material/styles';
import { useLocation, Link, useParams, Outlet } from 'react-router-dom';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import InfoIcon from '@mui/icons-material/Info';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { selectRefresh } from 'store/refreshSlice';
import NotFoundUser from './NotFoundUser';
import useAxiosPrivate from 'hooks/useAxiosPrivate';

const NavItem = styled(ButtonBase)`
  border-radius: 5px 5px 0 0;
  min-width: 125px;
`;

const SingleUser = () => {
  const { id } = useParams();
  const [data, setData] = useState({});

  // location
  let location = useLocation();
  const path = location?.pathname?.split('/')[5] || '';

  const axiosPrivate = useAxiosPrivate();
  const refresh = useSelector(selectRefresh);

  useEffect(() => {
    axiosPrivate
      .get(`/user/${id}`)
      .then((res) => {
        setData(res.data?.data);
      })
      .catch((err) => {
        setData(null);
      });
  }, [refresh, id, axiosPrivate]);

  if (!data) {
    return <NotFoundUser />;
  }

  return (
    <Paper>
      <Box
        sx={{
          px: 2,
          pt: 2,
          background: 'linear-gradient(to right, #614cab 0%, #614cab99 100%)',
          borderRadius: '5px 5px 0 0',
        }}
      >
        <Box>
          <Typography sx={{ fontSize: 18, color: '#fff', lineHeight: 1 }}>
            {data?.fullName ? data?.fullName : 'Loading...'}
          </Typography>
        </Box>
        <Box sx={{ mt: 1.5 }}>
          <NavItem
            component={Link}
            to=""
            sx={{
              py: 0.6,
              px: 1.5,
              color: path === '' ? '#614cab' : '#fff',
              background: path === '' ? '#fff' : 'transparent',
            }}
          >
            <InfoIcon sx={{ fontSize: '1.2rem' }} />
            <span style={{ paddingLeft: '5px' }}>Info</span>
          </NavItem>
          <NavItem
            component={Link}
            to="permission"
            sx={{
              py: 0.6,
              px: 1.5,
              color: path === 'permission' ? '#614cab' : '#fff',
              background: path === 'permission' ? '#fff' : 'transparent',
            }}
          >
            <LockPersonIcon sx={{ fontSize: '1.2rem' }} />
            <span style={{ paddingLeft: '5px' }}>Permissions</span>
          </NavItem>
        </Box>
      </Box>
      <Box sx={{ p: 2 }}>
        <Outlet context={{ data }} />
      </Box>
    </Paper>
  );
};

export default SingleUser;
