import { Link as RouterLink } from 'react-router-dom';
import { Box, Card, Link, Stack, Fab } from '@mui/material';
import { CourseData } from '../../@types/course';
import { UserData } from '../../@types/user';
import { PATH_DASHBOARD } from '../../paths';
import Image from '../image';
import { connect } from 'react-redux';
import { getUserData } from '../../store/reducers/userReducer';
import { useBuyCourseMutation } from '../../store/api/admin/courseApi';
import { useStableNavigate } from '../../contexts/StableNavigateContext';
import { confirmDialog } from '../dialogs/DialogDelete';
import { isEmpty } from 'lodash';
import { showToast } from '../../utils/toast';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';

interface ShopProductCardProps {
  data: CourseData,
  user: UserData
}

const useStyles = makeStyles({
  typography: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: '1.25rem',
    cursor: 'pointer',
    transition: 'all 0.4s ease',
    textDecoration: 'none',
    '&:hover': {
      color: '#71f821',
    },
  },
});

const ShopProductCard = ({ data, user }: ShopProductCardProps) => {
  const classes = useStyles();
  const [buyCourse] = useBuyCourseMutation();

  const [isExpandCard, setIsExpandCard] = useState(false);

  const expandCard = () => {
    setIsExpandCard(true);
  };

  const collapseCard = () => {
    setIsExpandCard(false);
  };

  const cardRoot = {
    cursor: 'pointer',
    transition: 'transform 0.5s',
  };

  const cardRootExpand = {
    cursor: 'pointer',
    transform: 'scale(1.1)',
    transition: 'transform 0.5s',
  };

  const navigate = useStableNavigate();

  const handleGoToDetails = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (data.free) {
      if (isEmpty(user)) {
        navigate(PATH_DASHBOARD.courses.details(data.id));
      } else {
        buyCourse({
          id: data.id.toString(),
          buyed: true,
        }).unwrap().then(() => navigate(PATH_DASHBOARD.courses.details(data.id)));
      }
    } else if (data.CourseUsers.find(el => el.userId === user.id)) {
      navigate(PATH_DASHBOARD.courses.details(data.id));
    } else {
      if (user?.Subscription?.active) {
        buyCourse({
          id: data.id.toString(),
          buyed: false,
        }).unwrap().then(() => navigate(PATH_DASHBOARD.courses.details(data.id)));
      } else {
        confirmDialog('Приобретение курса', `Вы действительно хотите приобрести этот курс? Стоимость: ${data?.free ? 'Бесплатно' : `${data.cost}₽`}`,
          async () => {
            if (isEmpty(user)) {
              showToast({ variant: 'close', content: 'Пожалуйста, авторизуйтесь' });
            } else {
              await buyCourse({
                id: data.id.toString(),
                buyed: true,
              }).unwrap().then(() => navigate(PATH_DASHBOARD.courses.details(data.id)));
            }
          });
      }
    }
  };

  const linkTo = PATH_DASHBOARD.courses.details(data.id);

  return (
    <Card
      onClick={handleGoToDetails}
      style={isExpandCard ? cardRootExpand : cardRoot}
      onMouseEnter={() => expandCard()}
      onMouseLeave={() => collapseCard()}
      sx={{
        '&:hover .add-cart-btn': {
          opacity: 1,
        },
      }}
    >
      <Box sx={{ position: 'relative', p: 1 }}>
        {// @ts-ignore
          <Image src={`${process.env.REACT_APP_API_URL}/${data.logo.replace('\\', '/')}`} ratio='1/1'
                 sx={{ borderRadius: 1.5 }} />
        }
      </Box>

      <Stack spacing={2.5} sx={{ px: 2, pb: 3, pt: 1 }}>
        <Link className={classes.typography} component={RouterLink} to={linkTo} onClick={handleGoToDetails}
              color='inherit' variant='h5' noWrap>
          {data.name}
        </Link>
      </Stack>
    </Card>
  );
};

export default connect(
  (state) => ({
    user: getUserData(state),
  }),
)(ShopProductCard);
