import React, { useMemo, useState } from 'react';
import { Button, Dialog, DialogContent, DialogTitle, Stack } from '@mui/material';
import PaymentsCardUi from '../../../sections/@dashboard/subsription/PaymentsCardUI';
import { useBuySubscriptionMutation } from '../../../store/api/admin/subscriptionApi';
import { connect, useDispatch } from 'react-redux';
import { getUserData, setUser } from '../../../store/reducers/userReducer';
import { UserData } from '../../../@types/user';
import { convertToDate } from '../../../utils/time';

interface SubscriptionDialogProps {
  user: UserData
}

const SubscriptionDialog = ({user}: SubscriptionDialogProps) => {
  const [buySubscription] = useBuySubscriptionMutation()
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()

  const payments = useMemo(() => [
    {id: 1, label: 'На месяц', duration: 1, cost: 500},
    {id: 2, label: 'На три месяца', duration: 3, cost: 1500},
    {id: 3, label: 'На пол года', duration: 6, cost: 2500},
  ], []);

  const handleBuySubscription = async (duration: number) => {
    const {user} = await buySubscription({duration}).unwrap()
    dispatch(setUser({...user, Subscription: {...user.Subscription, active: true}}))
  }

  return (
    <>
      {user?.Subscription ? user?.Subscription?.active ? <Button size="small" variant="contained" onClick={() => setOpen(true)}>
          Подписка до {convertToDate(user?.Subscription?.end)}
        </Button> : <Button size="small" variant="contained"  onClick={() => setOpen(true)}>Подписка истекла</Button> :
        <Button size="small" variant="contained"  onClick={() => setOpen(true)}>Купить подписку</Button>}
      <Dialog maxWidth="lg" open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Подписки</DialogTitle>
        <DialogContent>
          <Stack spacing={2} direction="row" alignItems="center">
            {payments.map(({ label, cost, id, duration }) => <PaymentsCardUi icon="fluent:premium-32-filled" buySubscription={handleBuySubscription} duration={duration} id={id} cost={cost} label={label} key={id}/>)}
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default connect(
  (state) => ({
    user: getUserData(state),
  }),
)(SubscriptionDialog);
