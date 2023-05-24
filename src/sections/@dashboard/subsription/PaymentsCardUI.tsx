import React from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText, Stack,
  Typography,
} from '@mui/material';
import './style.css';
import { connect } from 'react-redux';
import { getUserData } from '../../../store/reducers/userReducer';
import { UserData } from '../../../@types/user';
import Chart from '../../../components/chart';
import Iconify from '../../../components/iconify';
import { useTheme } from '@mui/material/styles';
import Label from '../../../components/label';

interface PaymentsCardUiProps {
  id: number;
  cost: number;
  duration: number;
  label: string;
  buySubscription: (duration: number) => void;
  user: UserData;
  color?: string;
  icon: string;
}

const PaymentsCardUi = ({
                          cost,
                          label,
                          buySubscription,
                          duration,
                          user,
                          icon,
                          color = 'secondary',
                        }: PaymentsCardUiProps) => {
  const theme = useTheme();

  return (
    <Stack
      direction='row'
      color='primary'
      alignItems='center'
      sx={{
        p: 3,
        borderRadius: 2,
        overflow: 'hidden',
        position: 'relative',
        color: 'common.white',
        bgcolor: `${color}.dark`,
      }}
      flex={1}
      height={225}
      minWidth={350}
    >
      {user?.Subscription?.duration === duration ?
        // @ts-ignore
        <Label
            variant='filled'
            color={'error'}
            sx={{
              top: 16,
              right: 16,
              zIndex: 9,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            Активна
          </Label> : null}
      <Box sx={{ ml: 3 }}>
        <Typography variant='h4'> {label}</Typography>
        <Button
          sx={{ mt: 4 }}
          color='secondary'
          variant='contained'
          fullWidth
          onClick={() => buySubscription(duration)}
        >
          Выбрать
        </Button>
      </Box>

      <Iconify
        icon={icon}
        sx={{
          width: 120,
          height: 120,
          opacity: 0.12,
          position: 'absolute',
          right: theme.spacing(-3),
        }}
      />
    </Stack>
  );


  // <Card
  //   elevation={4}
  //   className="payments-card"
  // >
  //   <CardContent >
  //     <Typography
  //       variant='h5'
  //
  //     >
  //       {label}
  //     </Typography>
  //
  //     <div >
  //       <div >
  //         <Typography component='span'  color='inherit' variant='body1'>
  //           Цена: {cost}
  //         </Typography>
  //       </div>
  //     </div>
  //
  //     <List >
  //       <ListItem disableGutters>
  //         <ListItemIcon >
  //           <svg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
  //             <circle cx='11' cy='11' r='11' fill='#fffff' />
  //             <path d='M6 10.1L10.3333 14L17 8' stroke='#70B2FE' strokeWidth='2' strokeLinecap='round' />
  //           </svg>
  //         </ListItemIcon>
  //         <ListItemText
  //           disableTypography
  //
  //         >
  //           <Typography variant='body1' color='inherit'>
  //             Полный доступ к курсам
  //           </Typography>
  //         </ListItemText>
  //       </ListItem>
  //     </List>
  //   </CardContent>
  //   <CardActions >

  //   </CardActions>
  // </Card>
};


export default connect(
  (state) => ({
    user: getUserData(state),
  }),
)(PaymentsCardUi);
