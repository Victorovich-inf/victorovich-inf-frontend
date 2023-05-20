import { Box } from '@mui/material';
import ShopProductCard from './ShopProductCard';
import SkeletonProductItem from './SkeletonProductItem';
import { CourseData } from '../../@types/course';

interface ShopProductListProps {
  loading: boolean;
  courses: CourseData[]
}

export default function ShopProductList({ courses, loading, ...other }: ShopProductListProps) {
  return (
    <Box
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
      {(loading ? [...Array(12)] : courses).map((course, index) =>
        course ? (
          <ShopProductCard key={course.id} data={course} />
        ) : (
          <SkeletonProductItem key={index} />
        )
      )}
    </Box>
  );
}
