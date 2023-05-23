import { Card, Dialog, DialogTitle, Stack, DialogContent } from '@mui/material';
import FullCalendar from '@fullcalendar/react'; // => request placed at the top
import interactionPlugin from '@fullcalendar/interaction';
import ru from '@fullcalendar/core/locales/ru';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
import StyledCalendar from '../sections/@dashboard/calendar/styles';
import useResponsive from '../hooks/useResponsive';
import { useGetSchedulesQuery } from '../store/api/admin/courseApi';
import React, { useEffect, useMemo, useState } from 'react';
import { EventInput } from '@fullcalendar/core';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { editorLessonDialogSchema } from '../schemas/editor/dialog/editorDialogSchema';
import { FormProvider, RHFTextField } from '../components/hook-form';
import RHFDateTime from '../components/hook-form/RHFDateTime';
import Page from '../components/Page';
import { PATH_DASHBOARD } from '../paths';
import CustomBreadcrumbs from '../components/custom-breadcrumbs';

const COLOR_OPTIONS = [
  '#00AB55',
  '#1890FF',
  '#54D62C',
  '#FFC107',
  '#FF4842',
  '#04297A',
  '#7A0C2E',
];

export default function DashboardAppPage() {
  const isDesktop = useResponsive('up', 'sm');

  const [events, setEvents] = useState<EventInput[]>([]);
  const [open, setOpen] = useState(false);

  const { data } = useGetSchedulesQuery();

  const defaultValues = useMemo(() => ({
    title: '',
    start: '',
  }), []);

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(editorLessonDialogSchema),
  });

  const {
    handleSubmit,
    reset,
  } = methods;

  useEffect(() => {
    if (data) {
      const events = data.map(el => ({
        id: el.id.toString(),
        title: `Курс: ${el.Course?.name}, урок: ${el.name}`,
        date: el.start,
        color: COLOR_OPTIONS[Math.floor(Math.random() * COLOR_OPTIONS.length)],
      }));
      setEvents(events);
    }
  }, [data]);


  const onSubmit = () => {
  };

  const handleSelectEvent = (arg: { event: { id: any; }; }) => {
    const event = events.find(el => el.id === arg.event.id);

    if (event) {
      reset({ title: event.title, start: event?.date?.toString() });
      setOpen(true);
    }
    ;

  };

  return (
    <Page title={'Дашбоард | Victorovich-inf'}>
      <CustomBreadcrumbs
        heading='Календарь'
        links={[
          { name: 'Дашбоард', href: PATH_DASHBOARD.root },
          { name: 'Календарь' },
        ]} action={undefined} moreLink={undefined} activeLast={undefined} sx={undefined} />
      <Card>
        <StyledCalendar>
          <FullCalendar
            weekends
            editable
            droppable
            selectable
            events={events}
            allDayMaintainDuration
            eventResizableFromStart
            eventClick={handleSelectEvent}
            initialDate={new Date()}
            dayMaxEventRows={3}
            eventDisplay='block'
            headerToolbar={false}
            height={isDesktop ? 720 : 'auto'}
            locale={ru}
            plugins={[
              listPlugin,
              dayGridPlugin,
              timelinePlugin,
              timeGridPlugin,
              interactionPlugin,
            ]}
          />
        </StyledCalendar>
      </Card>

      <Dialog fullWidth maxWidth='xs' open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Напоминание</DialogTitle>
        <DialogContent>
          <FormProvider
            methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3} sx={{ py: 3 }}>
              <RHFTextField name='title' label='Название' />

              <RHFDateTime name='start' label='Дата' />
            </Stack>
          </FormProvider>
        </DialogContent>
      </Dialog>


    </Page>
  );
}
