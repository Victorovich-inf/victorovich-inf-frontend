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
import { useNavigate, useParams } from 'react-router';
import CourseListItem from '../../components/admins/course/CourseListItem';
import { LessonData } from '../../@types/lesson';
import { TaskData } from '../../@types/task';
import { CourseEditProvider } from '../../utils/context/CourseEditContext';
import { Content, ContentData } from '../../@types/editor';
import { AnswerData, CourseData } from '../../@types/course';
import { swapElements } from '../../utils/utils';
import { PATH_DASHBOARD } from '../../paths';
import EditorDialog from '../../components/admins/dialog/EditorDialog';
import useResponsive from '../../hooks/useResponsive';
import EditorCourse from '../../components/admins/dialog/EditorCourse';
import CourseLesson from '../../components/admins/course/CourseLesson';
import ProgressWithLabel from '../../components/admins/editor/ProgressWithLabel';
import {
  useGetOnePaidQuery,
  useResetWinningStreakMutation,
  useUpdateProgressMutation,
} from '../../store/api/admin/paidCourseApi';
import { showToast } from '../../utils/toast';
import { connect } from 'react-redux';
import { getIsCurator, getUserData } from '../../store/reducers/userReducer';
import { useCreateChatWithCuratorMutation } from '../../store/api/admin/chatApi';
import { UserData } from '../../@types/user';
import dayjs from 'dayjs';
import CuratorButton from '../../components/CuratorButton';
import { useLocation } from 'react-router-dom';

const dataToContent = (data: CourseData) => {
  const content = {} as Content;

  data.Lessons.map(el => {
    if (el.Tasks?.length) {
      el.Tasks?.map(task => {
        content[`${task.id}_task`] = {
          elements: task.Content.content,
          public: task.public,
        };
      });

      content[`${el.id}_lesson`] = {
        elements: el.Content.content,
        public: el.public,
      };
    } else {
      content[`${el.id}_lesson`] = {
        elements: el.Content.content,
        public: el.public,
      };
    }
  });

  return content;
};

const calculateProgress = (data: AnswerData, all: number) => {
  let percent = 0;
  let count = 0;

  Object.keys(data).map(el => {
    if (data[el].viewed) {
      count = count + 1;
      data[el].Tasks.map(el => {
        if (el.correctly) {
          count = count + 1;
        }
      });
    }
  });

  percent = +(count / all * 100).toFixed(0);

  return percent;
};

function Details({ isCurator, user }: { isCurator: boolean, user: UserData }) {

  const { loading, Preloader } = useLoader(false);
  const [content, setContent] = React.useState<Content>({});
  const [answerData, setAnswerData] = React.useState<AnswerData>({});
  const [percent, setPercent] = React.useState<number>(0);
  const [hasCurator, setHasCurator] = React.useState<boolean>(true);
  const location = useLocation()

  const navigate = useNavigate();
  const [updateProgress] = useUpdateProgressMutation();
  const [resetWinningStreak] = useResetWinningStreakMutation();

  const { id } = useParams();

  const [selected, setSelected] = React.useState<LessonData | TaskData | null>(null);

  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const { data } = useGetOnePaidQuery(id || '');

  React.useEffect(() => {
    if (Object.keys(content).length) {
      let all = Object.keys(content).filter(el => content[el].public).length;

      const percent = calculateProgress(answerData, all);
      setPercent(percent);
    }
  }, [answerData, content])

  React.useEffect(() => {
    const query = new URLSearchParams(location?.search);
    const lessonId = query.get('lessonId');

    if (lessonId && data && selected === null) {
      const active = data.Lessons.find(el => el.id === Number(lessonId))
      setSelected(active as LessonData);
    }
  }, [location?.search, data]);

  React.useEffect(() => {
    if (data) {
      const answer = data.CourseUsers?.[0]?.ProgressCourseUsers[0]?.data;


      const content = dataToContent(data);

      setContent(content);

      if (typeof answer === 'string')
        setAnswerData(JSON.parse(answer) || {});

      if (selected) {
        if ('lessonId' in selected) {
          const active = data.Lessons.find(el => el.id === selected.lessonId)?.Tasks?.find(el => el.id === selected.id)
          setSelected(active as TaskData);
        }
      }
    }
  }, [data])

  React.useEffect(() => {
    if (data && user) {
      const courseUser = data.CourseUsers?.find(el => el.userId == user.id)

      if (courseUser) {
        setHasCurator(courseUser.hasCurator)
      }
    }
  }, [data, user]);

  const updateProgressLesson = (lesson: string, task?: string, answer?: string) => {
    const hasKey = Object.keys(answerData).includes(lesson);

    if (selected && answer && 'answer' in selected) {
      const answerDb = selected.answer.toLowerCase().split(/\r?\n/).join('');
      const answerUser = answer.toLowerCase().split(/\r?\n/).join('');
      if (answerDb !== answerUser) {
        resetWinningStreak();
        return showToast({ variant: 'close', content: 'Неправильный ответ' });
      }
    }

    if (task && answer && selected) {
      if (hasKey) {
        setAnswerData((prev) => {
          let tasks: any[] = [];

          if (Object.values(prev[lesson].Tasks).length) {
            tasks = [...prev[lesson].Tasks];
          }

          tasks.push(
            { answer, correctly: true, id: selected.id.toString() },
          );

          return {
            ...prev, [lesson]: {
              viewed: prev[lesson].viewed,
              Tasks: tasks,
            },
          };
        });
        if (id) {
          let tasks: any[] = [];

          if (Object.values(answerData[lesson].Tasks).length) {
            tasks = [...answerData[lesson].Tasks];
          }

          tasks.push(
            { answer, correctly: true, id: selected.id.toString() },
          );

          const data = {
            ...answerData, [lesson]: {
              viewed: true,
              Tasks: tasks,
            },
          };
          updateProgress({ id: id.toString(), data: JSON.stringify(data), answer: !!answer });
        }
      } else {
        setAnswerData((prev) => {
          let tasks: any[] = [];

          tasks.push(
            { answer, correctly: true, id: selected.id.toString() },
          );

          return {
            ...prev, [lesson]: {
              viewed: true,
              Tasks: tasks,
            },
          };
        });
        if (id) {
          let tasks: any[] = [];

          tasks.push(
            { answer, correctly: true, id: selected.id.toString() },
          );
          const data = {
            ...answerData, [lesson]: {
              viewed: true,
              Tasks: tasks,
            },
          };
          updateProgress({ id: id.toString(), data: JSON.stringify(data), answer: !!answer });
        }
      }
    } else {
      if (hasKey) {
        setAnswerData((prev) => {
          let tasks: any[] = [];

          if (Object.values(prev[lesson].Tasks).length) {
            tasks = [...prev[lesson].Tasks];
          }

          return {
            ...prev, [lesson]: {
              viewed: prev[lesson].viewed,
              Tasks: tasks,
            },
          };
        });
        if (id) {
          let tasks: any[] = [];

          if (Object.values(answerData[lesson].Tasks).length) {
            tasks = [...answerData[lesson].Tasks];
          }
          const data = {
            ...answerData, [lesson]: {
              viewed: answerData[lesson].viewed,
              Tasks: tasks,
            },
          };
          updateProgress({ id: id.toString(), data: JSON.stringify(data), answer: !!answer });
        }
      } else {
        setAnswerData((prev) => {
          return {
            ...prev, [lesson]: {
              viewed: true,
              Tasks: [],
            },
          };
        });
        if (id) {
          const data = {
            ...answerData, [lesson]: {
              viewed: true,
              Tasks: [],
            },
          };
          updateProgress({ id: id.toString(), data: JSON.stringify(data), answer: !!answer });
        }
      }
    }

  };

  const handleSetSelected = (data: LessonData | TaskData) => {
    setSelected(data);
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
        updateProgressLesson,
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
        course: data,
        answerData: answerData,
        isCurator: isCurator ? isCurator : false,
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
                <Stack direction='row' spacing={2} alignItems='center'>
                  <Typography variant={isMobile ? 'h4' : 'h6'}>
                    {data.name}
                  </Typography>
                  <ProgressWithLabel value={percent} />
                </Stack>
                <Stack sx={{ marginTop: 2, marginLeft: !isMobile ? 'auto' : 0, width: { xs: '100%', md: 'auto' } }}
                       spacing={2}
                       direction={isMobile ? 'column' : 'row'}>
                  {!isCurator && data?.CuratorCourses?.length && hasCurator ?
                    <CuratorButton/> : null}
                  <Button size={isMobile ? 'small' : 'medium'} fullWidth={isMobile}
                          onClick={() => navigate(PATH_DASHBOARD.courses.rootUser)}
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
                  sm: 300,
                },
                bgcolor: 'background.paper',
                alignSelf: 'flex-start',
                minHeight: {
                  xs: 250,
                  sm: 500,
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
                return lesson.public;
              }).filter((lesson) => {

                const courseUser = data.CourseUsers?.find(el => el.userId == user.id);

                if (!courseUser) {
                  return false;
                }

                if (courseUser.buyed || courseUser.curator) {
                  return true;
                }

                if (data.free) {
                  return true;
                }

                if (user.role === 0) {
                  return dayjs(courseUser.end) > dayjs(lesson.start);
                } else {
                  return true;
                }
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

export default connect(
  (state) => ({
    isCurator: getIsCurator(state),
    user: getUserData(state),
  }),
)(Details);
