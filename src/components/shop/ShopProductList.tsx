import { Box, Paper, Typography } from '@mui/material';
import ShopProductCard from './ShopProductCard';
import { CourseData } from '../../@types/course';

interface ShopProductListProps {
  loading: boolean;
  courses: CourseData[]
}

export default function ShopProductList({ courses, loading, ...other }: ShopProductListProps) {
  return (
      <>
        {courses?.length ? <Box
          gap={3}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(3, 1fr)',
            xl: 'repeat(4, 1fr)',
          }}
          {...other}
        >
          { courses.map((course) => <ShopProductCard key={course.id} data={course} />
          ) }
        </Box> : <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            textAlign: 'center',
          }}
        >
          <Typography variant="h6" paragraph>
            Не найдено
          </Typography>
        </Box>}
      </>
  );
}
