import { Link as RouterLink } from 'react-router-dom';
import { Box, Card, Link, Stack, Fab } from '@mui/material';
import { fCurrency, fShortenNumber } from '../../utils/formatNumber';
import { CourseData } from '../../@types/course';
import { UserData } from '../../@types/user';
import { PATH_DASHBOARD } from '../../paths';
import Image from '../image';
import Iconify from '../iconify';
import { connect } from 'react-redux';
import { getUserData } from '../../store/reducers/userReducer';
import { useBuyCourseMutation } from '../../store/api/admin/courseApi';
import { useStableNavigate } from '../../contexts/StableNavigateContext';
import { confirmDialog } from '../dialogs/DialogDelete';

interface ShopProductCardProps {
  data: CourseData,
  user: UserData
}

const ShopProductCard  = ({ data, user }: ShopProductCardProps) => {

  const [buyCourse] = useBuyCourseMutation()

  const navigate = useStableNavigate()

  const handleGoToDetails = (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    if (data.CourseUsers.find(el => el.userId === user.id)) {
      navigate(PATH_DASHBOARD.courses.details(data.id))
    } else {
      confirmDialog('Приобретение курса', `Вы действительно хотите приобрести этот курс? Стоимость: ${data?.free ? 'Бесплатно': `${data.cost}₽`}`,
        async () => {
          await buyCourse(data.id.toString()).unwrap().then(() => navigate(PATH_DASHBOARD.courses.details(data.id)))
        })
    }
  }

  const POST_INFO = [
    { id: 'view', value: 3, icon: 'eva:eye-fill' },
  ];

  const linkTo = PATH_DASHBOARD.courses.details(data.id);

  const handleAddCart = async () => {

    try {
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card
      sx={{
        '&:hover .add-cart-btn': {
          opacity: 1,
        },
      }}
    >
      <Box sx={{ position: 'relative', p: 1 }}>
        {/*<Label*/}
        {/*  variant="filled"*/}
        {/*  color={(status === 'sale' && 'error') || 'info'}*/}
        {/*  sx={{*/}
        {/*    top: 16,*/}
        {/*    right: 16,*/}
        {/*    zIndex: 9,*/}
        {/*    position: 'absolute',*/}
        {/*    textTransform: 'uppercase',*/}
        {/*  }}*/}
        {/*>*/}
        {/*  Статус*/}
        {/*</Label>*/}

        <Fab
          color="warning"
          size="medium"
          className="add-cart-btn"
          onClick={handleAddCart}
          sx={{
            right: 16,
            bottom: 16,
            zIndex: 9,
            opacity: 0,
            position: 'absolute',
            transition: (theme) =>
              theme.transitions.create('all', {
                easing: theme.transitions.easing.easeInOut,
                duration: theme.transitions.duration.shorter,
              }),
          }}
        >
          <Iconify icon="ic:round-add-shopping-cart" />
        </Fab>
        {// @ts-ignore
          <Image src={`${process.env.REACT_APP_API_URL}/${data.logo.replace('\\', '/')}`} ratio="1/1"
                 sx={{ borderRadius: 1.5 }} />
        }
      </Box>

      <Stack spacing={2.5} sx={{ p: 3 }}>
        <Link component={RouterLink} to={linkTo} onClick={handleGoToDetails} color="inherit" variant="subtitle2" noWrap>
          {data.name}
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="flex-end">

            {/*{priceSale && (*/}
            {/*  <Box component="span" sx={{ color: 'text.disabled', textDecoration: 'line-through' }}>*/}
            {/*    {fCurrency(priceSale)}*/}
            {/*  </Box>*/}
            {/*)}*/}

            <Box component="span">{data?.free ? 'Бесплатно' : `${fCurrency(data.cost)} ₽`}</Box>
        </Stack>
        <Stack
          flexWrap="wrap"
          direction="row"
          justifyContent="flex-end"
          sx={{
            mt: 3,
            color: 'text.disabled',
          }}
        >
          {POST_INFO.map((info) => (
            <Stack
              key={info.id}
              direction="row"
              alignItems="center"
              sx={{ typography: 'caption', ml: info.id === 'comment' ? 0 : 1.5 }}
            >
              <Iconify icon={info.icon} width={16} sx={{ mr: 0.5 }} />
              {fShortenNumber(info.value)}
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Card>
  );
}

export default connect(
  (state) => ({
    user: getUserData(state),
  }),
)(ShopProductCard);
