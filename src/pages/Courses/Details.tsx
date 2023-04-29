import {
  Box, Button, Chip, CircularProgress,
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
import CourseLessonAdmin from '../../components/admins/course/CourseLessonAdmin';
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
import EditorCourse from '../../components/admins/dialog/EditorCourse';
import CourseLesson from '../../components/admins/course/CourseLesson';
import ProgressWithLabel from '../../components/admins/editor/ProgressWithLabel';

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

function Details() {
  const { loading, Preloader } = useLoader(false);
  const [content, setContent] = React.useState<Content>({});
  const [savePage] = useSavePageMutation();
  const navigate = useNavigate();

  const { id } = useParams();

  const [selected, setSelected] = React.useState<LessonData | TaskData | null>(null);

  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen2 = () => {
    setOpen2(true);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };

  const { data } = useGetOneQuery(id || '');

  React.useEffect(() => {
    if (data) {
      const content = dataToContent(data);
      console.log(content);
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

  const isMobile = useResponsive('down', 'sm');

  return (
    <Page title={`Просмотр курса "${data ? data.name : ''}"`}>
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
        course: data
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
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography variant={isMobile ? 'h4' : 'h6'}>
                    {data.name}
                  </Typography>
                  <ProgressWithLabel value={50}/>
                </Stack>
                <Stack sx={{ marginTop: 2, marginLeft: !isMobile ? 'auto' : 0, width: { xs: '100%', md: 'auto' } }} spacing={2}
                       direction={isMobile ? 'column' : 'row'}>
                  <Button size={isMobile ? 'small': 'medium'} fullWidth={isMobile} onClick={() => navigate(PATH_DASHBOARD.courses.rootUser)}
                          variant='outlined'>Назад</Button>
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
              {data.Lessons.filter(lesson => {
                return lesson.public
              }).map(lesson => {
                return <CourseListItem detailsMode key={lesson.id} data={lesson} />;
              })}
            </List>
            <CourseLesson />
          </Stack>
          <EditorDialog open={open} handleClose={handleClose} />
          <EditorCourse open={open2} handleClose={handleClose2} />
        </> : null}
      </CourseEditProvider>
    </Page>
  );
};

export default Details;
