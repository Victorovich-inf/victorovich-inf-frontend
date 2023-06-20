import { formatDistanceToNowStrict } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Typography, Stack } from '@mui/material';
import Image from '../../../../components/image';
import { MessagesData } from '../../../../@types/chat';
import { connect } from 'react-redux';
import { getUserData } from '../../../../store/reducers/userReducer';
import { UserData } from '../../../../@types/user';
import React, { useState } from 'react';
import { useChatContext } from '../../../../utils/context/ChatContext';
import Iconify from '../../../../components/iconify';
import axios from 'axios';

interface ChatMessageItemProps {
  message: MessagesData;
  onOpenLightbox: (url: string) => void;
  user: UserData;
}

const ChatMessageItem = ({ message, onOpenLightbox, user }: ChatMessageItemProps) => {

  const [down, setDown] = useState(false)

  const {handleSelectMessage, selectedMessage} = useChatContext()

  const currentUser = message.sender.id === user.id;

  const firstName = message.sender.firstName;


  const isImage = !!message?.image && (message?.image.includes('.svg') || message?.image.includes('.png') || message?.image.includes('.jpeg') || message?.image.includes('.jpg'));
  const isFile = !!message?.image && (!message?.image.includes('.svg') && !message?.image.includes('.png') && !message?.image.includes('.jpeg') && !message?.image.includes('.jpg'));

  function getFileExt(url: string) {
    // @ts-ignore
    return url.split('/').pop().split('#')[0].split('?')[0].split('.')[1];
  }

  function downloadFile(address: string, name: string) {
    axios.get(address, {
      responseType: 'blob',
    }).then(({ data: blob }) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `${name}.${getFileExt(address)}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }


  const handleSelectMessageDown = () => {
    if (currentUser) {
      setDown(prev => !prev);
      handleSelectMessage(selectedMessage ? null : message);
    }
  }
  return (
    <Stack  direction='row' justifyContent={currentUser ? 'flex-end' : 'unset'} sx={{ mb: 3 }}>

      <Stack  onMouseDown={handleSelectMessageDown}  position="relative" spacing={1} alignItems='flex-end'>
        <Typography
          noWrap
          variant='caption'
          sx={{
            color: 'text.disabled',
            ...(!currentUser && {
              mr: 'auto',
            }),
          }}
        >
          {!currentUser && `${firstName},`} &nbsp;
          {formatDistanceToNowStrict(new Date(message.createdAt), {
            addSuffix: true,
            locale: ru,
          })}
        </Typography>

        <Stack
          sx={{
            p: 1.5,
            minWidth: 48,
            maxWidth: 320,
            borderRadius: 1,
            overflow: 'hidden',
            typography: 'body2',
            ...(currentUser && {
              color: 'grey.800',
              bgcolor: 'primary.lighter',
            }),
            ...(!currentUser && {
              alignSelf: 'flex-start',
            }),
            ...(selectedMessage?.id === message.id ? {
              bgcolor: '#c7c7c7',
            } : {
              bgcolor: 'background.neutral',
            })
            // ...(isImage && {
            //   p: 0,
            // }),
          }}
        >
          {isImage ? (
            <Image
              src={`${process.env.REACT_APP_API_URL}/${message.image.replace('\\', '/')}`}
              onClick={() => {
                onOpenLightbox(`${process.env.REACT_APP_API_URL}/${message.image.replace('\\', '/')}`);
              }}
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  opacity: 0.9,
                },
              }}
            />
          ) : isFile ? (
            <div className='file-details'>
              <div className='file-details-content'>
                <div className='file-details-info'>
                  <div className='file-details-top'>Файл </div>
                  <span>{message?.image}</span>
                </div>
                <Iconify onClick={() => downloadFile(`${process.env.REACT_APP_API_URL}/${message?.image}`, `Файл`)} sx={{ cursor: 'pointer' }} icon='material-symbols:download' />
              </div>
            </div>
          ) : (
            message.message
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default connect(
  (state) => ({
    user: getUserData(state),
  }),
)(ChatMessageItem);