import React from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { CourseData } from '../../../@types/course';
import { useStableNavigate } from '../../../contexts/StableNavigateContext';
import { PATH_DASHBOARD } from '../../../paths';

interface CourseCardProps {
  data: CourseData,
  onDelete: (id: number) => void
}

const CourseCard = ({data, onDelete}: CourseCardProps) => {

  const navigate = useStableNavigate()

  const handleEdit = () => {
    navigate(PATH_DASHBOARD.courses.edit(data.id))
  }

  const handleDelete = () => {
    onDelete(data.id)
  }

  return (
    <Card>
      <CardMedia
        sx={{ height: 200 }}
        image={`${process.env.REACT_APP_API_URL}/${data.logo}`}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {data.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">{data.description}</Typography>
      </CardContent>
      <CardActions sx={{padding: '12px'}}>
        <Button onClick={handleEdit} size="small">Редактировать</Button>
        <Button onClick={handleDelete} size="small" color="error">Удалить</Button>
      </CardActions>
    </Card>
  );
};

export default CourseCard;
