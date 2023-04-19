import React, { useMemo } from 'react';
import { makeStyles } from '@mui/styles';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { FormProvider, RHFTextField } from '../../hook-form';
import { useDropzone } from 'react-dropzone';
import { yupResolver } from '@hookform/resolvers/yup';
import { settingsImage } from '../../../schemas/editorSchema';
import { ContentData } from '../../../@types/editor';
import { useCourseEditContext } from '../../../utils/context/CourseEditContext';
import { useUploadImageMutation } from '../../../store/api/admin/courseApi';
import { UploadData } from '../../../@types/course';

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
  data: ContentData;
}

const SettingsImage = ({data}: SettingsImageProps) => {

  const {handleChangeContent} = useCourseEditContext()
  const [uploadImage] = useUploadImageMutation()

  const {getRootProps, getInputProps} = useDropzone({
    maxFiles: 1, multiple: false,
    onDrop: async (acceptedFiles1: File[]) => {
      if (acceptedFiles1[0]) {
        let formData = new FormData()
        formData.append('file', acceptedFiles1[0])
        const { filePath } = await uploadImage(formData as unknown as UploadData).unwrap();

        const link = `${process.env.REACT_APP_API_URL}/${filePath}`

        let newData = JSON.parse(JSON.stringify(data))
        if ('src' in newData.element) {
          newData.element.src = link;
        }

        handleChangeContent(newData);
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
    control,
    reset,
    formState: { isSubmitting, errors },
  } = methods;

  const classes = useStyles();

  const onSubmit = (state: {src: string}) => {
    let newData = JSON.parse(JSON.stringify(data))
    if ('src' in newData.element) {
      newData.element.src = state.src;
    }
    handleChangeContent(newData);
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
          <Button type="submit" variant="contained" size="small" >Применить ссылку</Button>
          <Button {...getRootProps()} color="secondary" variant="contained" size="small" ><input {...getInputProps()} /> Загрузить с устройства</Button>
        </Stack>
      </Box>
    </FormProvider>
  );
};

export default SettingsImage;