import React, { useMemo } from 'react';
import { makeStyles } from '@mui/styles';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { FormProvider, RHFTextField } from '../../hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { settingsVideo } from '../../../schemas/editorSchema';
import { ContentData } from '../../../@types/editor';
import { useCourseEditContext } from '../../../utils/context/CourseEditContext';
import useResponsive from '../../../hooks/useResponsive';

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

interface SettingsVideoProps {
  data: ContentData;
}

const SettingsVideo = ({data}: SettingsVideoProps) => {

  const {handleChangeContent} = useCourseEditContext()


  const defaultValues = useMemo(() => ({
    video: ''
  }), []);

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(settingsVideo)
  });

  const {
    handleSubmit,
    setValue,
  } = methods;

  const classes = useStyles();
  const isMobile = useResponsive('down', 'sm');

  const onSubmit = (state: {video: string}) => {
    let newData = JSON.parse(JSON.stringify(data))
    if ('video' in newData.element) {
      newData.element.video = state.video;
    }
    handleChangeContent(newData);
  }

  React.useEffect(() => {
    if (data) {
      if ('video' in data.element) {
        setValue('video', data.element.video);
      }
    }
  }, [data])

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Box className={classes.root}>
        <Typography variant="h6" gutterBottom>
          Настройка видео
        </Typography>
        <RHFTextField size="small" name='video' label='Ссылка' />
        <Stack spacing={1} className={classes.button} direction="row">
          <Button type="submit" variant="contained" size="small" >{isMobile ? 'Применить' : 'Применить ссылку'}</Button>
        </Stack>
      </Box>
    </FormProvider>
  );
};

export default SettingsVideo;