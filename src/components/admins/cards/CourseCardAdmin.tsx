import React from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Chip, IconButton, Stack, Typography } from '@mui/material';
import { CourseData } from '../../../@types/course';
import { useStableNavigate } from '../../../contexts/StableNavigateContext';
import { PATH_DASHBOARD } from '../../../paths';
import Iconify from '../../iconify';

interface CourseCardAdminProps {
  data: CourseData,
  onDelete: (id: number) => void
}

const CourseCardAdmin = ({data, onDelete}: CourseCardAdminProps) => {

  const navigate = useStableNavigate()

  const handleEdit = () => {
    navigate(PATH_DASHBOARD.courses.edit(data.id))
  }

  const handleCopy = () => {

  }

  const handleDelete = () => {
    onDelete(data.id)
  }

  return (
    <Card sx={{flex: 1, display: 'flex', flexDirection: 'column'}}>
      <CardMedia
        sx={{ height: 200 }}
        image={`${process.env.REACT_APP_API_URL}/${data.logo.replace('\\', '/')}`}
        title="green iguana"
      />
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography gutterBottom variant="h5" component="div">
            {data.name}
          </Typography>
          <Chip size="small" label={data.public ? 'Опуб.' : 'Не опуб.'} color={data.public ? 'success': 'error'} />
        </Stack>
        <Typography variant="body2" color="text.secondary">{data.description}</Typography>
      </CardContent>
      <CardActions sx={{padding: '12px', mt: 'auto', ml: 'auto'}}>
        <IconButton onClick={handleCopy} >
          <Iconify icon="ph:copy" width={16} />
        </IconButton>
        <IconButton onClick={handleEdit} >
          <Iconify icon="material-symbols:edit" width={16} />
        </IconButton>
        <IconButton onClick={handleDelete} color="error">
          <Iconify icon="material-symbols:delete-outline" width={16} />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default CourseCardAdmin;
