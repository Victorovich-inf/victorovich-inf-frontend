import React, { useState } from 'react';
import { Button, Dialog, DialogContent, DialogTitle, Stack } from '@mui/material';
import PaymentsCardUi from '../../../sections/@dashboard/subsription/PaymentsCardUI';

interface SubscriptionDialogProps {
}

const SubscriptionDialog = ({}: SubscriptionDialogProps) => {
  const [open, setOpen] = useState(false)

  const [payments, setPayments] = useState([
    {id: 1, label: 'На месяц', cost: 500},
    {id: 2, label: 'На три месяца', cost: 1500},
    {id: 3, label: 'На пол года', cost: 2500},
  ])

  return (
    <>
      <Button size="small" variant="contained" color="info" onClick={() => setOpen(true)}>Купить подписку</Button>
      <Dialog maxWidth="lg" open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Подписки</DialogTitle>
        <DialogContent>
          <Stack spacing={2} direction="row" alignItems="center">
            {payments.map(({ label, cost, id }) => <PaymentsCardUi id={id} cost={cost} label={label} key={id}/>)}
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SubscriptionDialog;