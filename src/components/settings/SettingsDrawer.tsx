import React, { useState } from 'react';
import { alpha, useTheme } from '@mui/material/styles';
import { Divider, Drawer, Stack, Typography, IconButton } from '@mui/material';
import Block from './Block';
import Iconify from '../iconify';
import Scrollbar from '../scrollbar';
import ToggleButton from './ToggleButton';
import { bgBlur } from '../../utils/cssStyles';
import AppWidget from '../../sections/@dashboard/app/AppWidget';
import { useGetAchievementsQuery } from '../../store/api/admin/userApi';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserData } from '../../store/reducers/userReducer';
import { UserData } from '../../@types/user';

const SPACING = 2.5;

const SettingsDrawer = ({user}: {user: UserData}) => {
  const { pathname } = useLocation()

  const {data} = useGetAchievementsQuery()

  const theme = useTheme();

  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {!open && pathname.includes('dashboard') && user && <ToggleButton open={open} onToggle={handleToggle} notDefault={false}  />}

      <Drawer
        anchor="right"
        open={open}
        onClose={handleClose}
        BackdropProps={{ invisible: true }}
        PaperProps={{
          sx: {
            ...bgBlur({ color: theme.palette.background.default, opacity: 0.9 }) as any,
            width: 300,
            boxShadow: `-24px 12px 40px 0 ${alpha(
              theme.palette.mode === 'light' ? theme.palette.grey[500] : theme.palette.common.black,
              0.16
            )}`,
          },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ py: 2, pr: 1, pl: SPACING }}
        >
          <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
            Достижения
          </Typography>

          <IconButton onClick={handleClose}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Scrollbar sx={{ p: SPACING, pb: 0 }}>
          <Block title='Пройден курс' tooltip={undefined}  sx={undefined}>
            <AppWidget
              total={data?.achievements?.completedCourse ? '1 из 1' : `0 из 1`}
              icon='material-symbols:golf-course'
              chart={{
                series: data?.achievements?.completedCourse ? 100 : 0,
              }} sx={undefined} title={undefined}        />
          </Block>
          {data ? <Block title='Выполнено заданий' tooltip={undefined}  sx={undefined}>
            {[10, 25, 50, 100].map(el => {
              let value = 0;

              if (data?.statics?.correctlyCompletedTasks) {
                value = el <= +data?.statics?.correctlyCompletedTasks ? el : +data?.statics?.correctlyCompletedTasks
              }

              return <AppWidget
                key={el}
                color='secondary'
                total={`${value} из ${el}`}
                icon='material-symbols:task-alt'
                chart={{
                  series: (value / el * 100).toFixed(0)
                }} sx={undefined} title={undefined} />
            })}
          </Block> : null}
          {data ? <Block title='Победная серия' tooltip={undefined}  sx={undefined}>
            {[5, 10, 15, 25].map(el => {
              let value = 0;

              if (data?.statics?.winningStreak) {
                value = el <= +data?.statics?.winningStreak ? el : +data?.statics?.winningStreak
              }

              // @ts-ignore
              if (data?.achievements?.[`winningStreak${el}`]) {
                return <AppWidget
                  key={el}
                  color="info"
                  total={`${el} из ${el}`}
                  icon='akar-icons:victory-hand'
                  chart={{
                    series: 100
                  }} sx={undefined} title={undefined} />
              }

              return <AppWidget
                key={el}
                color="info"
                total={`${value} из ${el}`}
                icon='akar-icons:victory-hand'
                chart={{
                  series: (value / el * 100).toFixed(0)
                }} sx={undefined} title={undefined} />
            })}
          </Block> : null}

        </Scrollbar>

      </Drawer>
    </>
  );
}

export default connect(
  (state) => ({
    user: getUserData(state),
  }),
)(SettingsDrawer);