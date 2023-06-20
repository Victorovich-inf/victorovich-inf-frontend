import React, { useEffect, useRef, useState } from 'react';
import { PATH_DASHBOARD } from '../../paths';
import Page from '../../components/Page';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { Box, Card, Stack } from '@mui/material';
import { ChatHeaderDetail, ChatMessageInput, ChatMessageList } from '../../sections/@dashboard/chat';
import useChat from '../../hooks/useChat';
import {
  useGetChatsQuery,
} from '../../store/api/admin/chatApi';
import { useParams } from 'react-router';
import { ChatData, MessagesData } from '../../@types/chat';
import { connect } from 'react-redux';
import { getUserData } from '../../store/reducers/userReducer';
import { UserData } from '../../@types/user';
import { ChatContextProvider } from '../../utils/context/ChatContext';
import { useGetAllForUserQuery } from '../../store/api/admin/courseApi';

interface ChatPageWithIdProps {
  user: UserData,
}

const ChatPageWithId = ({user}: ChatPageWithIdProps) => {
  const scrollRef = useRef<HTMLElement>(null);

  const [roomId, setRoomId] = useState<number | null>(null)

  const [activeChat, setActiveChat] = useState<ChatData | undefined>()

  const [selectedMessage, setSelectedMessage] = useState<MessagesData | null>(null)

  const {data} = useGetChatsQuery()
  const { data: dataCourses } = useGetAllForUserQuery({ paging: { skip: 0, take: 100 } });

  const { messages, sendMessage, removeMessage } = useChat(roomId)

  const params = useParams()
  const [courseId, setCourseId] = useState<number>(Number(params.idCourse) || 0);

  const handleSelectMessage = (message: MessagesData | null) => {
    setSelectedMessage(message);
  }

  const scrollMessagesToBottom = () => {
    if (scrollRef?.current) {
      scrollRef.current.scrollTop = scrollRef?.current.scrollHeight;
    }
  };

  const handleDeleteMessage = () => {
    removeMessage({
      id: selectedMessage?.id,
      path: selectedMessage?.image
    })
    setSelectedMessage(null);
  }


  useEffect(() => {
    if (params?.id && data?.rows) {
      setRoomId(+params?.id)
      setActiveChat(data.rows.find(el => Number(el.id) === Number(params?.id)))
      setSelectedMessage(null)
    }
  }, [params, data]);

  useEffect(() => {
    scrollMessagesToBottom();
  }, [messages]);

  return (
    <Page title={'Чаты | Victorovich-inf'}>
      <CustomBreadcrumbs
        heading={`Чат курса "${dataCourses?.rows?.find(el => el.id === courseId)?.name || ''}"`}
        links={[
          { name: 'Дашбоард', href: PATH_DASHBOARD.root },
          { name: 'Чаты', href: PATH_DASHBOARD.chat.root },
          { name: `Чат курса "${dataCourses?.rows?.find(el => el.id === courseId)?.name || ''}"` },
        ]} action={undefined} moreLink={undefined} activeLast={undefined} sx={undefined}        />
      <ChatContextProvider value={{activeChat, roomId, messages, handleSelectMessage, selectedMessage, handleDeleteMessage}}>
        <Card sx={{ height: '68vh', display: 'flex' }}>

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
                {messages?.length ?  <ChatMessageList ref={scrollRef} /> : <Box flex={1}></Box>}

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
      </ChatContextProvider>
    </Page>
  );
};

export default connect(
  (state) => ({
    user: getUserData(state),
  }),
)(ChatPageWithId);