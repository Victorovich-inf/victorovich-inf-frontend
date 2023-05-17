import { IconButton, Stack, Typography } from '@mui/material';
import { fToNow } from '../../../../utils/formatTime';
import { CustomAvatar } from '../../../../components/custom-avatar';
import { useChatContext } from '../../../../utils/context/ChatContext';
import Iconify from '../../../../components/iconify';

export default function ChatHeaderDetail( ) {

  const {activeChat, selectedMessage, handleSelectMessage, handleDeleteMessage} = useChatContext()

  const participantInfo = activeChat?.user

  if (!participantInfo) {
    return null
  }

  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        p: (theme) => theme.spacing(2, 1, 2, 2),
      }}
    >
      <Stack flexGrow={1} direction="row" alignItems="center" spacing={2}>
        <CustomAvatar
          // @ts-ignore
          name={`${participantInfo?.firstName}${participantInfo?.lastName}`}
        />

        <div>
          <Typography variant="subtitle2">{`${participantInfo?.firstName} ${participantInfo?.lastName}`}</Typography>
        </div>
      </Stack>
      {selectedMessage ? <Stack direction="row"  alignItems="center">
        <IconButton color="error" onClick={handleDeleteMessage}>
          <Iconify icon="material-symbols:delete-outline" />
        </IconButton>
        <IconButton onClick={() => handleSelectMessage(null)}>
          <Iconify icon="eva:close-fill" />
        </IconButton>
      </Stack> : null}
    </Stack>
  );
}
