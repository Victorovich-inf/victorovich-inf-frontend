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
import { useParams } from 'react-router';
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

    const { id } = useParams();

    const [selected, setSelected] = React.useState<LessonData | TaskData | null>(null);

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
          })
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
          })
        }
      }}
  }

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
          })
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
          })
        }
      }}
    }

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
        }}>
          {loading ? Preloader() : data ? <>
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant='h4' gutterBottom>
                    Редактирование курса "{data.name}"
                  </Typography>
                  <Stack sx={{ marginTop: 2, marginLeft: 'auto' }} spacing={2} direction='row'>
                    <Button color="warning" variant="outlined" startIcon={<Iconify icon="material-symbols:settings-b-roll-rounded"/>}>
                      Редактировать
                    </Button>
                    <Button sx={{ alignSelf: 'flex-end' }} variant='outlined'>Опубликовать</Button>
                    <LoadingButton onClick={handleSave} type='submit' variant='contained'>
                      {'Сохранить'}
                    </LoadingButton>
                  </Stack>
                </Box>
              </Box>
            </Box>
            <Stack spacing={2} direction='row' justifyContent='space-between' sx={{ flex: 1 }}>
              <List
                sx={{
                  width: '100%',
                  maxWidth: 300,
                  bgcolor: 'background.paper',
                  alignSelf: 'flex-start',
                  minHeight: 500,
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

          </> : null}
        </CourseEditProvider>
      </Page>
    );
  };

  export default Edit;
