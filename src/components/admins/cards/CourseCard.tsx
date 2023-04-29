import React from 'react';
import {  Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import { CourseData } from '../../../@types/course';
import { useStableNavigate } from '../../../contexts/StableNavigateContext';
import { PATH_DASHBOARD } from '../../../paths';
import { confirmDialog } from '../../dialogs/DialogDelete';
import { useBuyCourseMutation } from '../../../store/api/admin/courseApi';
import { connect } from 'react-redux';
import { getUserData } from '../../../store/reducers/userReducer';
import { UserData } from '../../../@types/user';

interface CourseCardProps {
  data: CourseData,
  user: UserData
}

const CourseCard = ({data, user}: CourseCardProps) => {

  const [buyCourse] = useBuyCourseMutation()

  const navigate = useStableNavigate()

  const handleGoToDetails = () => {

    if (data.CourseUsers.find(el => el.userId === user.id)) {
      navigate(PATH_DASHBOARD.courses.details(data.id))
    } else {
      confirmDialog('Приобретение курса', `Вы действительно хотите приобрести этот курс? Стоимость: ${data?.free ? 'Бесплатно': `${data.cost}₽`}`,
        async () => {
          await buyCourse(data.id.toString()).unwrap().then(() => navigate(PATH_DASHBOARD.courses.details(data.id)))
        })
    }
  }

  return (
    <Card onClick={handleGoToDetails} sx={{flex: 1, display: 'flex', flexDirection: 'column', cursor: 'pointer'}}>
      <CardMedia
        sx={{ height: 200 }}
        image={`${process.env.REACT_APP_API_URL}/${data.logo.replace('\\', '/')}`}
        title="green iguana"
      />
      <CardContent sx={{display: 'flex', flexDirection: 'column'}}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography gutterBottom variant="h5" component="div">
            {data.name}
          </Typography>
        </Stack>
        <Typography variant="body2" color="text.secondary">{data.description}</Typography>
        <Typography sx={{mt: 2, alignSelf: 'flex-end'}} variant="h5" component="div" >
          {data?.free ? 'Бесплатно' : `${data.cost}₽`}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default connect(
  (state) => ({
    user: getUserData(state),
  }),
)(CourseCard);
