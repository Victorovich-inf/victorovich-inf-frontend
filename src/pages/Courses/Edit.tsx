import {
  Box, Button,
  List,
  ListSubheader,
  Stack,
} from '@mui/material';
import React from 'react';
import Page from '../../components/Page';
import useLoader from '../../hooks/useLoader';
import Typography from '@mui/material/Typography';
import { useGetOneQuery, useSavePageMutation } from '../../store/api/admin/courseApi';
import { useNavigate, useParams } from 'react-router';
import CourseListItem from '../../components/admins/course/CourseListItem';
import CourseLesson from '../../components/admins/course/CourseLesson';
import CourseAdd from '../../components/admins/course/CourseAdd';
import { LessonData } from '../../@types/lesson';
import { TaskData } from '../../@types/task';
import { CourseEditProvider } from '../../utils/context/CourseEditContext';
import { Content, ContentData } from '../../@types/editor';
import { LoadingButton } from '@mui/lab';
import { CourseData } from '../../@types/course';
import { swapElements } from '../../utils/utils';
import Iconify from '../../components/iconify';
import { PATH_DASHBOARD } from '../../paths';
import EditorDialog from '../../components/admins/dialog/EditorDialog';
import useResponsive from '../../hooks/useResponsive';

const dataToContent = (data: CourseData) => {
  const content = {} as Content;

  data.Lessons.map(el => {
    if (el.Tasks?.length) {
      el.Tasks?.map(task => {
        content[`${task.id}_task`] = {
          elements: task.Content.content,
        };
      });

      content[`${el.id}_lesson`] = {
        elements: el.Content.content,
      };
    }
  });

  return content;
};

function Edit() {
  const { loading, Preloader } = useLoader(false);
  const [content, setContent] = React.useState<Content>({});
  const [savePage] = useSavePageMutation();
  const navigate = useNavigate();

  const { id } = useParams();

  const [selected, setSelected] = React.useState<LessonData | TaskData | null>(null);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const { data } = useGetOneQuery(id || '');

  React.useEffect(() => {
    if (data) {
      const content = dataToContent(data);
      setContent(content);
    }
  }, [data]);

  const handleSetSelected = (data: LessonData | TaskData) => {
    setSelected(data);
  };

  const handleSave = () => {
    if (id)
      savePage({ id: +id, data: content });
  };

  const handleMoveUp = (index: number) => {
    if (selected?.id) {
      if ('courseId' in selected && selected?.courseId) {
        let oldArray1 = [...content[`${selected?.id}_lesson`].elements];

        if (oldArray1[index - 1]) {
          let swapArray = swapElements(oldArray1, index, index - 1);

          setContent((prev) => {
            return {
              ...prev, [`${selected?.id}_lesson`]: {
                elements: [...swapArray],
              },
            };
          });
        }

      } else if ('lessonId' in selected && selected?.lessonId) {
        let oldArray1 = [...content[`${selected?.id}_task`].elements];

        if (oldArray1[index - 1]) {
          let swapArray = swapElements(oldArray1, index, index - 1);

          setContent((prev) => {
            return {
              ...prev, [`${selected?.id}_task`]: {
                elements: [...swapArray],
              },
            };
          });
        }
      }
    }
  };

  const handleMoveDown = (index: number) => {
    if (selected?.id) {
      if ('courseId' in selected && selected?.courseId) {
        let oldArray1 = [...content[`${selected?.id}_lesson`].elements];

        if (oldArray1[index + 1]) {
          let swapArray = swapElements(oldArray1, index, index + 1);

          setContent((prev) => {
            return {
              ...prev, [`${selected?.id}_lesson`]: {
                elements: [...swapArray],
              },
            };
          });
        }

      } else if ('lessonId' in selected && selected?.lessonId) {
        let oldArray1 = [...content[`${selected?.id}_task`].elements];

        if (oldArray1[index + 1]) {
          let swapArray = swapElements(oldArray1, index, index + 1);

          setContent((prev) => {
            return {
              ...prev, [`${selected?.id}_task`]: {
                elements: [...swapArray],
              },
            };
          });
        }
      }
    }
  };

  const handleDeleteElement = (id: string) => {
    if (selected?.id) {
      if ('courseId' in selected && selected?.courseId) {
        setContent((prev) => {
          let oldArray = [...prev[`${selected?.id}_lesson`]?.elements.filter(el => el.id !== id)];

          return {
            ...prev, [`${selected?.id}_lesson`]: {
              elements: [...oldArray],
            },
          };
        });
      } else if ('lessonId' in selected && selected?.lessonId) {
        setContent((prev) => {
          let oldArray = [...prev[`${selected?.id}_task`]?.elements.filter(el => el.id !== id)];

          return {
            ...prev, [`${selected?.id}_task`]: {
              elements: [...oldArray],
            },
          };
        });
      }
    }
  };

  const handleChangeContent = (data: ContentData) => {
    if (selected?.id) {
      if ('courseId' in selected && selected?.courseId) {
        setContent((prev) => {
          let oldArray = [...prev[`${selected?.id}_lesson`]?.elements];
          let idx = oldArray?.findIndex(el => el.id === data.id);

          oldArray[idx] = { ...data };

          return {
            ...prev, [`${selected?.id}_lesson`]: {
              elements: [...oldArray],
            },
          };
        });
      } else if ('lessonId' in selected && selected?.lessonId) {
        setContent((prev) => {
          let oldArray = [...prev[`${selected?.id}_task`]?.elements];
          let idx = oldArray?.findIndex(el => el.id === data.id);

          oldArray[idx] = { ...data };

          return {
            ...prev, [`${selected?.id}_task`]: {
              elements: [...oldArray],
            },
          };
        });
      }
    }
  };

  const handleSetContent = (data: ContentData) => {
    if (selected?.id) {

      if ('courseId' in selected && selected?.courseId) {
        setContent((prev) => {

          const oldArray = prev[`${selected?.id}_lesson`]?.elements || [];

          return {
            ...prev, [`${selected?.id}_lesson`]: {
              elements: [
                ...oldArray,
                data,
              ],
            },
          };
        });
      } else if ('lessonId' in selected && selected?.lessonId) {
        setContent((prev) => {

          const oldArray = prev[`${selected?.id}_task`]?.elements || [];

          return {
            ...prev, [`${selected?.id}_task`]: {
              elements: [
                ...oldArray,
                data,
              ],
            },
          };
        });
      }
    }
  };

  const isLesson = (selected: LessonData | TaskData | null) => {
    if (selected) {
      return !!('courseId' in selected && selected?.courseId);
    }
    return false;
  };

  const isTask = (selected: LessonData | TaskData | null) => {
    if (selected) {
      return !!('lessonId' in selected && selected?.lessonId);
    }
    return false;
  };


  const isDesktop = useResponsive('up', 'md');
  const isMobile = useResponsive('down', 'sm');

  console.log(isMobile);

  return (
    <Page title={'Добавление курса'}>
      <CourseEditProvider value={{
        selected,
        handleMoveUp,
        handleSetSelected,
        content,
        handleSetContent,
        handleChangeContent,
        handleDeleteElement,
        handleMoveDown,
        isLesson,
        isTask,
      }}>
        {loading ? Preloader() : data ? <>
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{
                flexGrow: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: {
                  xs: 'column',
                  sm: 'row',
                },
              }}>
                <Typography variant={isMobile ? 'h4' : 'h6'} gutterBottom>
                  Редактирование курса "{data.name}"
                </Typography>
                <Stack sx={{ marginTop: 2, marginLeft: !isMobile ? 'auto' : 0, width: { xs: '100%', md: 'auto' } }} spacing={2}
                       direction={isMobile ? 'column' : 'row'}>
                  {selected ? <Button size={isMobile ? 'small': 'medium'} fullWidth={isMobile} onClick={handleClickOpen} color='warning' variant='outlined'
                                      startIcon={<Iconify icon='material-symbols:settings-b-roll-rounded' />}>
                    Редактировать {isLesson(selected) ? 'урок' : 'задание'}
                  </Button> : null}
                  <Button size={isMobile ? 'small': 'medium'} fullWidth={isMobile} onClick={() => navigate(PATH_DASHBOARD.courses.root)}
                          variant='outlined'>Назад</Button>
                  <LoadingButton size={isMobile ? 'small': 'medium'} fullWidth={isMobile} onClick={handleSave} type='submit' variant='contained'>
                    {'Сохранить'}
                  </LoadingButton>
                </Stack>
              </Box>
            </Box>
          </Box>
          <Stack spacing={2} direction={isMobile ? 'column' : 'row'} justifyContent='space-between' sx={{ flex: 1 }}>
            <List
              sx={{
                width: '100%',
                maxWidth: {
                  xs: '100%',
                  sm: 300
                },
                bgcolor: 'background.paper',
                alignSelf: 'flex-start',
                minHeight: {
                  xs: 250,
                  sm: 500
                },
              }}
              component='nav'
              aria-labelledby='nested-list-subheader'
              subheader={
                <ListSubheader component='div' id='nested-list-subheader'>
                  Уроки и задания
                </ListSubheader>
              }
            >
              {data.Lessons.map(lesson => {
                return <CourseListItem key={lesson.id} data={lesson} />;
              })}
              <CourseAdd id={data.id} label='Добавить урок' type='lesson' />
            </List>
            <CourseLesson />
          </Stack>
          <EditorDialog open={open} handleClose={handleClose} />
        </> : null}
      </CourseEditProvider>
    </Page>
  );
};

export default Edit;
