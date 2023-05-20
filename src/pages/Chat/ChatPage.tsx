import React from 'react';
import { PATH_DASHBOARD } from '../../paths';
import Page from '../../components/Page';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { Box, Card, Stack } from '@mui/material';
import { ChatHeaderDetail, ChatMessageInput, ChatNav } from '../../sections/@dashboard/chat';
import {
  useGetChatsQuery,
} from '../../store/api/admin/chatApi';
import { connect } from 'react-redux';
import { getUserData } from '../../store/reducers/userReducer';
import { UserData } from '../../@types/user';
import { ChatContextProvider } from '../../utils/context/ChatContext';

interface ChatPageProps {
  user: UserData,
}

const ChatPage = ({user}: ChatPageProps) => {

  const {data} = useGetChatsQuery()


  return (
    <Page title={'Чаты | Victorovich-inf'}>
      <CustomBreadcrumbs
        heading='Чат'
        links={[
          { name: 'Дашбоард', href: PATH_DASHBOARD.root },
          { name: 'Чаты' },
        ]} action={undefined} moreLink={undefined} activeLast={undefined} sx={undefined}        />
      <ChatContextProvider  value={{handleSelectMessage: (data) => {}, handleDeleteMessage: () => {}, selectedMessage: null}}>
        <Card sx={{ height: '72vh', display: 'flex' }}>
          <ChatNav  conversations={data ? data.rows : []} />

          <Stack flexGrow={1}>
            <ChatHeaderDetail />

            <Stack
              direction="row"
              flexGrow={1}
              sx={{
                overflow: 'hidden',
                borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
              }}
            >
              <Stack flexGrow={1}>
                <Box flex={1}></Box>

                <ChatMessageInput
                  onSend={() => {}}
                  disabled={true}
                />
              </Stack>

            </Stack>
          </Stack>
        </Card>
      </ChatContextProvider>
    </Page>
  );
};

export default connect(
  (state) => ({
    user: getUserData(state),
  }),
)(ChatPage);