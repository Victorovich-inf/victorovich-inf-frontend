import { Stack, Typography } from '@mui/material';
import { fToNow } from '../../../../utils/formatTime';
import { CustomAvatar } from '../../../../components/custom-avatar';
import { useChatContext } from '../../../../utils/context/ChatContext';

export default function ChatHeaderDetail( ) {

  const {activeChat} = useChatContext()

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
    </Stack>
  );
}
