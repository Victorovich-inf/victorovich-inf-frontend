import React, { useEffect, useState } from 'react';
import { PATH_DASHBOARD } from '../../paths';
import Page from '../../components/Page';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { Card, Stack } from '@mui/material';
import { ChatHeaderDetail, ChatMessageInput, ChatMessageList, ChatNav } from '../../sections/@dashboard/chat';
import useChat from '../../hooks/useChat';
import {
  useGetChatsQuery,
} from '../../store/api/admin/chatApi';
import { useParams } from 'react-router';
import { CourseEditProvider } from '../../utils/context/ChatContext';
import { ChatData } from '../../@types/chat';
import { connect } from 'react-redux';
import { getUserData } from '../../store/reducers/userReducer';
import { UserData } from '../../@types/user';

interface ChatPageProps {
  user: UserData,
}

const ChatPage = ({user}: ChatPageProps) => {

  const [roomId, setRoomId] = useState<number | null>(null)

  const [activeChat, setActiveChat] = useState<ChatData | undefined>()

  const {data} = useGetChatsQuery()

  const { users, messages, log, sendMessage, removeMessage } = useChat(roomId)

  const params = useParams()

  useEffect(() => {
    if (params?.id && data?.rows) {
      setRoomId(+params?.id)
      setActiveChat(data.rows.find(el => Number(el.id) === Number(params?.id)))
    }
  }, [params, data]);

  return (
    <Page title={'Чаты | Victorovich-inf'}>
      <CustomBreadcrumbs
        heading='Чат'
        links={[
          { name: 'Дашбоард', href: PATH_DASHBOARD.root },
          { name: 'Чаты' },
        ]} action={undefined} moreLink={undefined} activeLast={undefined} sx={undefined}        />
      <CourseEditProvider value={{activeChat, roomId, messages}}>
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
                {messages?.length ?  <ChatMessageList /> : null}

                <ChatMessageInput
                  onSend={({ message, image }: {message?: string, image?: string}) => {
                    const body = {
                      senderId: user.id,
                      recipientId: activeChat?.user?.id,
                      chatId: activeChat?.id,
                      message,
                      image,
                    }
                    sendMessage(body);
                  }}
                  disabled={!activeChat}
                />
              </Stack>

            </Stack>
          </Stack>
        </Card>
      </CourseEditProvider>
    </Page>
  );
};

export default connect(
  (state) => ({
    user: getUserData(state),
  }),
)(ChatPage);