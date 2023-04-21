import React, { useMemo } from 'react';
import { makeStyles } from '@mui/styles';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { FormProvider, RHFTextField } from '../../hook-form';
import { useDropzone } from 'react-dropzone';
import { yupResolver } from '@hookform/resolvers/yup';
import { settingsFile, settingsImage } from '../../../schemas/editorSchema';
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

interface SettingsFileProps {
  data: ContentData;
}

const SettingsFile = ({data}: SettingsFileProps) => {

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
        if ('file' in newData.element) {
          newData.element.file = link;
        }

        handleChangeContent(newData);
      }
    },
  });

  const defaultValues = useMemo(() => ({
    file: '',
    name: ''
  }), []);

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(settingsFile)
  });

  const {
    handleSubmit,
    setValue,
  } = methods;

  const classes = useStyles();

  const onSubmit = (state: {file: string, name: string}) => {
    let newData = JSON.parse(JSON.stringify(data))
    if ('file' in newData.element) {
      newData.element.file = state.file;
    }
    if ('name' in newData.element) {
      newData.element.name = state.name;
    }
    handleChangeContent(newData);
  }

  React.useEffect(() => {
    if (data) {
      if ('file' in data.element) {
        setValue('file', data.element.file);
      }
      if ('name' in data.element) {
        setValue('name', data.element.name);
      }
    }
  }, [data])

  return (
    <FormProvider  methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Box className={classes.root}>
        <Typography variant="h6" gutterBottom>
          Настройка файла
        </Typography>
        <RHFTextField size="small" name='file' label='Ссылка' />
        <RHFTextField size="small" name='name' label='Название файла' />
        <Stack spacing={1} className={classes.button} direction="row">
          <Button type="submit" variant="contained" size="small" >Применить</Button>
          <Button type="button" {...getRootProps()} color="secondary" variant="contained" size="small" ><input {...getInputProps()} /> Загрузить файл с устройства</Button>
        </Stack>
      </Box>
    </FormProvider>
  );
};

export default SettingsFile;