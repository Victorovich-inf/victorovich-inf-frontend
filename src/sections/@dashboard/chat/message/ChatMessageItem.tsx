import { formatDistanceToNowStrict } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Typography, Stack } from '@mui/material';
import Image from '../../../../components/image';
import { MessagesData } from '../../../../@types/chat';
import { connect } from 'react-redux';
import { getUserData } from '../../../../store/reducers/userReducer';
import { UserData } from '../../../../@types/user';
import { CustomAvatar } from '../../../../components/custom-avatar';

interface ChatMessageItemProps {
  message: MessagesData;
  onOpenLightbox: (url: string) => void;
  user: UserData;
}

const ChatMessageItem = ({ message, onOpenLightbox, user }: ChatMessageItemProps) => {

  const currentUser = message.sender.id === user.id;

  const firstName = message.sender.firstName;

  const isImage = !!message?.image

  return (
    <Stack direction='row' justifyContent={currentUser ? 'flex-end' : 'unset'} sx={{ mb: 3 }}>

      <Stack spacing={1} alignItems='flex-end'>
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
            bgcolor: 'background.neutral',
            ...(currentUser && {
              color: 'grey.800',
              bgcolor: 'primary.lighter',
            }),
            ...(!currentUser && {
              alignSelf: 'flex-start',
            }),
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