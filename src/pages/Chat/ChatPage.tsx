import React from 'react';
import { PATH_DASHBOARD } from '../../paths';
import Page from '../../components/Page';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { Card, Stack } from '@mui/material';
import { ChatHeaderDetail, ChatMessageInput, ChatMessageList, ChatNav, ChatRoom } from '../../sections/@dashboard/chat';
import useChat from '../../hooks/useChat';
import { useGetChatsQuery } from '../../store/api/admin/chatApi';

const ChatPage = () => {

  const {data} = useGetChatsQuery()

  console.log(data);

  const { users, messages, log, sendMessage, removeMessage } = useChat()

  return (
    <Page title={'Чаты | Victorovich-inf'}>
      <CustomBreadcrumbs
        heading='Чат'
        links={[
          { name: 'Дашбоард', href: PATH_DASHBOARD.root },
          { name: 'Чаты' },
        ]} action={undefined} moreLink={undefined} activeLast={undefined} sx={undefined}        />
      <Card sx={{ height: '72vh', display: 'flex' }}>
        <ChatNav  conversations={data ? data.rows : []} />

        <Stack flexGrow={1}>
          <ChatHeaderDetail participants={[]} />

          <Stack
            direction="row"
            flexGrow={1}
            sx={{
              overflow: 'hidden',
              borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
            }}
          >
            <Stack flexGrow={1}>
              <ChatMessageList conversation={{}} />

              <ChatMessageInput
                conversationId={null}
                onSend={(message: any) => {
                  sendMessage(message);
                }}
                disabled={true} sx={undefined}
              />
            </Stack>

            {/*{detailView && (*/}
            {/*  <ChatRoom conversation={selectedConversation} participants={displayParticipants} />*/}
            {/*)}*/}
          </Stack>
        </Stack>
      </Card>
    </Page>
  );
};

export default ChatPage;