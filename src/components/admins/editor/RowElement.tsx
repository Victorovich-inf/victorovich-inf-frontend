import React, { useMemo } from 'react';
import { Box, IconButton, Paper, Popover, Stack } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ContentData } from '../../../@types/editor';
import Iconify from '../../iconify';
import SettingsImage from './SettingsImage';
import { useCourseEditContext } from '../../../utils/context/CourseEditContext';
import { confirmDialog } from '../../dialogs/DialogDelete';

interface RowElementProps {
  data: ContentData;
  idx: number
}

const useStyles = makeStyles({
  row: {
    borderRadius: '16px',
    minHeight: 80,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  image: {
    maxWidth: '70%',
    objectFit: 'cover',
    maxHeight: 450
  },
  settings: {
    position: 'absolute',
    top: -10,
    right: 10
  }
});

const RowElement = ({data, idx}: RowElementProps) => {
  const [hover, setHover] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null);

  const {handleDeleteElement, handleMoveUp, handleMoveDown} = useCourseEditContext()

  const handleDelete = () => {
    return confirmDialog('Удаление элемента', `Вы действительно хотите удалить этот элемент`, async () => {
      handleDeleteElement(data.id.toString())
    })
  }

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const classes = useStyles();

  const type = useMemo(() => {
    if ('src' in data.element) {
      return 'image'
    }
    return ''
  }, [data])

  const renderRow = (type: string) => {
    switch (type) {
      case 'image': {
        return <img className={classes.image} src={'src' in data.element ? data.element?.src : ''} alt='image' />
      }
      default: {
        return <div></div>
      }
    }
  }

  const renderSettings = (type: string) => {
    switch (type) {
      case 'image': {
        return <SettingsImage data={data}/>
      }
      default: {
        return <div></div>
      }
    }
  }

  const handleMoveDownElement = () => {
    handleMoveDown(idx);
  }

  const handleMoveUpElement = () => {
    handleMoveUp(idx);
  }

  return (
    <>
      <Box onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className={classes.row}>
        {renderRow(type)}
        <Stack className={classes.settings} direction="row">
          <IconButton onClick={handleMoveUpElement}>
            <Iconify icon="material-symbols:arrow-circle-up"/>
          </IconButton>
          <IconButton onClick={handleMoveDownElement}>
            <Iconify icon="material-symbols:arrow-circle-down"/>
          </IconButton>
          <IconButton onClick={handleDelete}>
            <Iconify icon="material-symbols:delete-forever-rounded"/>
          </IconButton>
          <IconButton onClick={handleClick}>
            <Iconify icon="material-symbols:settings"/>
          </IconButton>
        </Stack>
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
          <Paper sx={{ p: 3 }} elevation={3}>
            {renderSettings(type)}
          </Paper>
        </Popover>
      </Box>
    </>
  );
};

export default RowElement;