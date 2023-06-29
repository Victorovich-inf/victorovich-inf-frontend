import React, { useState } from 'react';
import { PATH_DASHBOARD } from '../../paths';
import Page from '../../components/Page';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { Box, Card, FormControl, Stack } from '@mui/material';
import { ChatHeaderDetail, ChatMessageInput, ChatNav } from '../../sections/@dashboard/chat';
import {
  useGetChatsQuery,
} from '../../store/api/admin/chatApi';
import { connect } from 'react-redux';
import { getUserData } from '../../store/reducers/userReducer';
import { UserData } from '../../@types/user';
import { ChatContextProvider } from '../../utils/context/ChatContext';
import { useGetAllForUserQuery } from '../../store/api/admin/courseApi';
import { MenuItem, Select as Select2 } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';

interface ChatPageProps {
  user: UserData,
}

const ChatPage = ({ user }: ChatPageProps) => {
  const [courseId, setCourseId] = useState<number>(0);


  const { data: dataCourses } = useGetAllForUserQuery({ paging: { skip: 0, take: 100 } });

  const { data } = useGetChatsQuery();

  console.log(data);

  return (
    <Page title={'Чаты | Victorovich-inf'}>
      <CustomBreadcrumbs
        heading='Чат'
        links={[
          { name: 'Дашбоард', href: PATH_DASHBOARD.root },
          { name: 'Чаты' },
        ]} action={undefined} moreLink={undefined} activeLast={undefined} sx={undefined} />
      <ChatContextProvider value={{
        handleSelectMessage: (data) => {
        }, handleDeleteMessage: () => {
        }, selectedMessage: null,
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          {dataCourses ? <FormControl>
              <InputLabel id={`select`}>Выбрать курс</InputLabel>
              <Select2
                label={'Выбрать курс'}
                value={courseId}
                sx={{ mb: 2 }}
                onChange={(e) => {
                  setCourseId(Number(e.target.value));
                }}
              >
                <MenuItem value={0}>
                  Не выбрано
                </MenuItem>
                {dataCourses.rows.map(_ => (
                  <MenuItem key={_.id} value={_.id}>
                    {_.name}
                  </MenuItem>
                ))}
              </Select2>
            </FormControl>
            : null}
        </Box>
        {courseId ? <>
          <Card sx={{ minHeight: '40vh', maxHeight: '72vh', display: 'flex' }}>

            <ChatNav courseId={courseId} conversations={data ? data.rows.filter(el => el.courseId === courseId) : []} />

            <Stack flexGrow={1}>
              <ChatHeaderDetail />

              <Stack
                direction='row'
                flexGrow={1}
                sx={{
                  overflow: 'hidden',
                  borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
                }}
              >
                <Stack flexGrow={1}>
                  <Box flex={1}></Box>

                  <ChatMessageInput
                    onSend={() => {
                    }}
                    disabled={true}
                  />
                </Stack>

              </Stack>
            </Stack>

          </Card>
        </> : null}
      </ChatContextProvider>
    </Page>
  );
};

export default connect(
  (state) => ({
    user: getUserData(state),
  }),
)(ChatPage);