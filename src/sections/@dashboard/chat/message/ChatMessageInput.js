import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { Stack, InputBase, IconButton, InputAdornment } from '@mui/material';
import Iconify from '../../../../components/iconify';
import { v4 } from 'uuid';

const CURRENT_USER_ID = '8864c717-587d-472a-929a-8e5f298024da-0';

ChatMessageInput.propTypes = {
  sx: PropTypes.object,
  onSend: PropTypes.func,
  disabled: PropTypes.bool,
  conversationId: PropTypes.string,
};

export default function ChatMessageInput({ disabled, conversationId, onSend, sx, ...other }) {
  const fileInputRef = useRef(null);

  const [message, setMessage] = useState('');

  const handleClickAttach = () => {
    fileInputRef.current?.click();
  };

  const handleSend = (event) => {
    if (event.key === 'Enter') {
      if (onSend && message) {
        onSend({
          conversationId,
          messageId: v4(),
          message,
          contentType: 'text',
          attachments: [],
          createdAt: new Date(),
          senderId: CURRENT_USER_ID,
        });
      }
      setMessage('');
    }
  };

  return (
    <>
      <InputBase
        value={message}
        onKeyUp={handleSend}
        disabled={disabled}
        onChange={(event) => setMessage(event.target.value)}
        placeholder="Введите сообщение"
        endAdornment={
          <Stack direction="row" spacing={1} sx={{ flexShrink: 0, mr: 1.5 }}>
            <IconButton  size="small" onClick={handleClickAttach}>
              <Iconify icon="ic:round-add-photo-alternate" />
            </IconButton>
          </Stack>
        }
        sx={{
          pl: 1,
          height: 56,
          flexShrink: 0,
          borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
          ...sx,
        }}
        {...other}
      />

      <input type="file" ref={fileInputRef} style={{ display: 'none' }} />
    </>
  );
}
