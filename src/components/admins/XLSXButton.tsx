import React from 'react';
import { Button } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { useParseXLSXMutation } from '../../store/api/admin/userApi';

const XLSXButton = () => {
  const [parseXLSX] = useParseXLSXMutation()

  const {getRootProps, getInputProps} = useDropzone({
    maxFiles: 1, multiple: false,
    onDrop: async acceptedFiles1 => {
      if (acceptedFiles1[0]) {
        let formData = new FormData()
        formData.append('file', acceptedFiles1[0])
        // @ts-ignore
        parseXLSX(formData)
      }
    },
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx', '.xls']
    }
  });
  return (
    <Button variant="outlined" {...getRootProps()}>
      <input {...getInputProps()} />
      Импортировать csv
    </Button>
  );
};

export default XLSXButton;