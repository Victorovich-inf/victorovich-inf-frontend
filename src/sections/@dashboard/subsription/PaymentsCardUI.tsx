import React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import './style.css'

interface PaymentsCardUiProps {
  id: number;
  cost: number;
  label: string;
}

const PaymentsCardUi = ({cost, label}: PaymentsCardUiProps) => {
  return (
    <Card
      elevation={4}
      className="payments-card"
    >
      <CardContent >
        <Typography
          variant='h5'

        >
          {label}
        </Typography>

        <div >
          <div >
            <Typography component='span'  color='inherit' variant='body1'>
              Цена: {cost}
            </Typography>
          </div>
        </div>

        <List >
          <ListItem disableGutters>
            <ListItemIcon >
              <svg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <circle cx='11' cy='11' r='11' fill='#fffff' />
                <path d='M6 10.1L10.3333 14L17 8' stroke='#70B2FE' strokeWidth='2' strokeLinecap='round' />
              </svg>
            </ListItemIcon>
            <ListItemText
              disableTypography

            >
              <Typography variant='body1' color='inherit'>
                Полный доступ к курсам
              </Typography>
            </ListItemText>
          </ListItem>
        </List>
      </CardContent>
      <CardActions >
        <Button
          color='primary'
          variant='outlined'
          fullWidth

        >
          Выбрать
        </Button>
      </CardActions>
    </Card>
  );
};

export default PaymentsCardUi;