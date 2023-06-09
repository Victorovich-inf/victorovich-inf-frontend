import React, { useEffect, useRef, useState } from 'react';
import { PATH_DASHBOARD } from '../../paths';
import Page from '../../components/Page';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { Box, Card, Stack } from '@mui/material';
import { ChatHeaderDetail, ChatMessageInput, ChatMessageList, ChatNav } from '../../sections/@dashboard/chat';
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
import { useGetOnePaidQuery } from '../../store/api/admin/paidCourseApi';

interface CoursesChatPageWithIdProps {
  user: UserData,
}

const CoursesChatPageWithId = ({user}: CoursesChatPageWithIdProps) => {
  const [roomId, setRoomId] = useState<number | null>(null)

  const [activeChat, setActiveChat] = useState<ChatData | undefined>()

  const [selectedMessage, setSelectedMessage] = useState<MessagesData | null>(null)

  const {data} = useGetChatsQuery()

  const { messages, sendMessage, removeMessage } = useChat(roomId)

  const params = useParams()

  const handleSelectMessage = (message: MessagesData | null) => {
    setSelectedMessage(message);
  }

  const { data: dataCourse } = useGetOnePaidQuery(params.idCourse || '');

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

  return (
    <Page title={'Чаты | Victorovich-inf'}>
      <CustomBreadcrumbs
        heading='Чат'
        links={[
          { name: 'Дашбоард', href: PATH_DASHBOARD.root },
          { name: `Курс "${dataCourse?.name || ''}"`, href: PATH_DASHBOARD.courses.details(dataCourse?.id) },
          { name: 'Чаты' },
        ]} action={undefined} moreLink={undefined} activeLast={undefined} sx={undefined}        />
      <ChatContextProvider value={{activeChat, roomId, messages, handleSelectMessage, selectedMessage, handleDeleteMessage}}>
        <Card sx={{ height: '72vh', display: 'flex' }}>
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
                {messages?.length ?  <ChatMessageList  /> : <Box flex={1}></Box>}

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
)(CoursesChatPageWithId);