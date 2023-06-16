import React from 'react';
import { Button, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Popover } from '@mui/material';
import useResponsive from '../hooks/useResponsive';
import { useCourseEditContext } from '../utils/context/CourseEditContext';
import { PATH_DASHBOARD } from '../paths';
import { useCreateChatWithCuratorMutation } from '../store/api/admin/chatApi';
import { useNavigate } from 'react-router';
import { CustomAvatar } from './custom-avatar';

const CuratorButton = () => {
  const [createChatWithCurator] = useCreateChatWithCuratorMutation();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const { course } = useCourseEditContext();

  const handleGoToChatWithCurator = async (curatorId: string) => {
    if (course) {
      const { roomId } = await createChatWithCurator({
        curatorId,
        courseId: course.id.toString(),
      }).unwrap();
      navigate(PATH_DASHBOARD.courses.chat(course.id, roomId));
    }
  };


  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isMobile = useResponsive('down', 'sm');

  return (
    <>
      <Button size={isMobile ? 'small' : 'medium'} fullWidth={isMobile}
              onClick={handleClick}
              variant='outlined' color='warning'>В чат с куратором</Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <List component='div' disablePadding>
          <ListItem>
            <ListItemText primary={'Выбрать куратора'} />
          </ListItem>
          {course?.CuratorCourses?.map(el => {
            return <ListItemButton onClick={(e) => {
              handleGoToChatWithCurator(el.User.id.toString())
            }
            } key={el.id} >
              <ListItemIcon>
                <CustomAvatar
                  // @ts-ignore
                  name={`${el.User?.firstName}${el.User?.lastName}`}
                />
              </ListItemIcon>
              <ListItemText primary={el.User.email} />
            </ListItemButton>;
          })}
        </List>
      </Popover>
    </>
  );
};

export default CuratorButton;