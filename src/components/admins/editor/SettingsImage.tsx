import React, { useMemo } from 'react';
import { makeStyles } from '@mui/styles';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { FormProvider, RHFTextField } from '../../hook-form';
import { useDropzone } from 'react-dropzone';
import { yupResolver } from '@hookform/resolvers/yup';
import { settingsImage } from '../../../schemas/editorSchema';
import { ContentData, Position } from '../../../@types/editor';
import { useCourseEditContext } from '../../../utils/context/CourseEditContext';
import { useUploadImageMutation } from '../../../store/api/admin/courseApi';
import { UploadData } from '../../../@types/course';
import useResponsive from '../../../hooks/useResponsive';
import { v4 as uuidv4 } from 'uuid';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    rowGap: 15,
    flexDirection: 'column'
  },
  button: {
    alignSelf: 'flex-end'
  }
});

interface SettingsImageProps {
  data?: ContentData;
  add?: boolean;
  handleClose?: () => void;
}

const SettingsImage = ({data, add = false, handleClose}: SettingsImageProps) => {

  const {handleChangeContent, handleSetContent} = useCourseEditContext()
  const [uploadImage] = useUploadImageMutation()

  const {getRootProps, getInputProps} = useDropzone({
    maxFiles: 1, multiple: false,
    onDrop: async (acceptedFiles1: File[]) => {
      if (acceptedFiles1[0]) {
        let formData = new FormData()
        formData.append('file', acceptedFiles1[0])
        const { filePath } = await uploadImage(formData as unknown as UploadData).unwrap();

        const link = `${process.env.REACT_APP_API_URL}/${filePath}`

        if (add) {
          handleSetContent({
            id: uuidv4(),
            element: {
              src: link,
            },
            settings: {
              justifyContent: Position.Center,
            },
          });
          handleClose && handleClose()
        } else {
          let newData = JSON.parse(JSON.stringify(data))

          if ('src' in newData.element) {
            newData.element.src = link;
          }

          handleChangeContent(newData);
        }
      }
    },
    accept: {
      'image/*': []
    }
  });

  const defaultValues = useMemo(() => ({
    src: ''
  }), []);

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(settingsImage)
  });

  const {
    handleSubmit,
    setValue,
  } = methods;

  const classes = useStyles();
  const isMobile = useResponsive('down', 'sm');

  const onSubmit = (state: {src: string}) => {
    if (add) {
      handleSetContent({
        id: uuidv4(),
        element: {
          src: state.src,
        },
        settings: {
          justifyContent: Position.Center,
        },
      })
      handleClose && handleClose()
    } else {
      let newData = JSON.parse(JSON.stringify(data))
      if ('src' in newData.element) {
        newData.element.src = state.src;
      }
      handleChangeContent(newData);
    }
  }

  React.useEffect(() => {
    if (data) {
      if ('src' in data.element) {
        setValue('src', data.element.src);
      }
    }
  }, [data])

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Box className={classes.root}>
        <Typography variant="h6" gutterBottom>
          Настройка изображения
        </Typography>
        <RHFTextField size="small" name='src' label='Ссылка' />
        <Stack spacing={1} className={classes.button} direction="row">
          <Button type="submit" variant="contained" size="small" >{isMobile ? 'Применить' : 'Применить ссылку'}</Button>
          <Button {...getRootProps()} color="secondary" variant="contained" size="small" ><input {...getInputProps()} />{isMobile ? 'Загрузить' : 'Загрузить с устройства'}</Button>
        </Stack>
      </Box>
    </FormProvider>
  );
};

export default SettingsImage;