import { useRef, useState } from 'react';
import { Stack, InputBase, IconButton } from '@mui/material';
import Iconify from '../../../../components/iconify';
import { useDropzone } from 'react-dropzone';
import { useUploadImageMutation } from '../../../../store/api/admin/courseApi';
import { UploadData } from '../../../../@types/course';


interface ChatMessageInputProps {
  disabled: boolean
  onSend: (data: any) => void
}

export default function ChatMessageInput({ disabled, onSend, ...other }: ChatMessageInputProps) {
  const [uploadImage] = useUploadImageMutation()

  const {getRootProps, getInputProps} = useDropzone({
    maxFiles: 1, multiple: false,
    onDrop: async (acceptedFiles1: File[]) => {
      if (acceptedFiles1[0]) {
        let formData = new FormData()
        formData.append('file', acceptedFiles1[0])
        const { filePath } = await uploadImage(formData as unknown as UploadData).unwrap();

        onSend({
          image: filePath
        });
      }
    }
  });

  const [message, setMessage] = useState('');

  const handleSendKey = (event: { key: string; }) => {
    if (event.key === 'Enter') {
      if (onSend && message) {
        onSend({
          message
        });
      }
      setMessage('');
    }
  };

  const handleSend = () => {
      if (onSend && message) {
        onSend({
          message
        });
      }
      setMessage('');
  };

  return (
    <>
      <InputBase
        value={message}
        onKeyUp={handleSendKey}
        disabled={disabled}
        onChange={(event) => setMessage(event.target.value)}
        placeholder="Введите сообщение"
        endAdornment={
          <Stack direction="row" spacing={1} sx={{ flexShrink: 0, mr: 1.5 }}>
            <IconButton  size="small" {...getRootProps()}>
              <Iconify icon="ic:round-add-photo-alternate" />
            </IconButton>
            <IconButton onClick={handleSend} size="small">
              <Iconify icon="material-symbols:send" />
            </IconButton>
          </Stack>
        }
        sx={{
          pl: 1,
          height: 56,
          flexShrink: 0,
          borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
        }}
        {...other}
      />

      <input {...getInputProps()} />
    </>
  );
}
