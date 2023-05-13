import { Link as RouterLink } from 'react-router-dom';
import { Box, Card, Link, Stack, Fab } from '@mui/material';
import { fCurrency } from '../../utils/formatNumber';
import { CourseData } from '../../@types/course';
import { UserData } from '../../@types/user';
import { PATH_DASHBOARD } from '../../paths';
import Image from '../image';
import Iconify from '../iconify';
import { connect } from 'react-redux';
import { getUserData } from '../../store/reducers/userReducer';

interface ShopProductCardProps {
  data: CourseData,
  user: UserData
}

const ShopProductCard  = ({ data, user }: ShopProductCardProps) => {

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
        <Link component={RouterLink} to={linkTo} color="inherit" variant="subtitle2" noWrap>
          {data.name}
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="flex-end">

            {/*{priceSale && (*/}
            {/*  <Box component="span" sx={{ color: 'text.disabled', textDecoration: 'line-through' }}>*/}
            {/*    {fCurrency(priceSale)}*/}
            {/*  </Box>*/}
            {/*)}*/}

            <Box component="span">{data?.free ? 'Бесплатно' : `${fCurrency(data.cost)}₽`}</Box>
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
