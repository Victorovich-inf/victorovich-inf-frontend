import React, { useEffect } from 'react';
import { Box, Grid, IconButton, Paper, Popover, Typography } from '@mui/material';
import Iconify from '../../iconify';
import { useCourseEditContext } from '../../../utils/context/CourseEditContext';
import { Position, TypeContent } from '../../../@types/editor';
import { v4 as uuidv4 } from 'uuid';
import { makeStyles } from '@mui/styles';
import SettingsImage from '../editor/SettingsImage';
import SettingsVideo from '../editor/SettingsVideo';

const useStyles = makeStyles({
  root: {
    minHeight: 40,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '16px',
  },
});

type Mode = 'list' | 'video' | 'image'

const AddItem = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mode, setMode] = React.useState<Mode>('list');
  const { handleSetContent } = useCourseEditContext();
  const classes = useStyles();

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAddContent = (type: TypeContent) => () => {
    if (type === TypeContent.IMAGE) {
      setMode('image')
    }
    if (type === TypeContent.VIDEO) {
      setMode('video');
    }
    if (type === TypeContent.HTML) {
      handleSetContent({
        id: uuidv4(),
        element: {
          html: `<p></p>`,
        },
        settings: {
          justifyContent: Position.Center,
        },
      });
      handleClose();
    }
    if (type === TypeContent.FILE) {
      handleSetContent({
        id: uuidv4(),
        element: {
          file: ``,
          name: '',
        },
        settings: {
          justifyContent: Position.Center,
        },
      });
      handleClose();
    }
  };

  let open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  useEffect(() => {
    if (!anchorEl) {
      open = false;
      setMode('list');
    }
  }, [anchorEl])

  const handleClose = () => {
    setAnchorEl(null);
  };


  const buttonSX = {
    display: 'flex', flexDirection: 'column', padding: 1, justifyContent: 'center', alignItems: 'center', height: 120,
    borderWidth: 1,
    rowGap: 1,
    borderColor: 'transparent',
    borderStyle: 'solid',
    cursor: 'pointer',
    '&:hover': {
      borderColor: '#1565c0',
    },
  };

  const renderRow = (mode: Mode) => {
    switch (mode) {
      case 'list': {
        return <Grid container spacing={2}>
          <Grid item xs={4}>
            <Box onClick={handleAddContent(TypeContent.IMAGE)} sx={buttonSX}>
              <Iconify icon='material-symbols:image-rounded' width={60} />
              <Typography variant='body2' sx={{ textAlign: 'center' }}>
                Картинка
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box onClick={handleAddContent(TypeContent.VIDEO)} sx={buttonSX}>
              <Iconify icon='simple-icons:youtube' width={60} />
              <Typography variant='body2' sx={{ textAlign: 'center' }}>
                Видео
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box onClick={handleAddContent(TypeContent.HTML)} sx={buttonSX}>
              <Iconify icon='ph:file-html' width={60} />
              <Typography variant='body2' sx={{ textAlign: 'center' }}>
                HTML код
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box onClick={handleAddContent(TypeContent.FILE)} sx={buttonSX}>
              <Iconify icon='material-symbols:file-open-sharp' width={60} />
              <Typography variant='body2' sx={{ textAlign: 'center' }}>
                Файл
              </Typography>
            </Box>
          </Grid>
        </Grid>
      }
      case 'image': {
        return <SettingsImage add handleClose={handleClose}/>
      }
      case 'video': {
        return <SettingsVideo add handleClose={handleClose}/>
      }
    }
  };

  return (
    <>
      <Box className={classes.root} sx={{ boxShadow: 2 }}>
        <IconButton onClick={handleClick}>
          <Iconify width={40} icon='material-symbols:add' />
        </IconButton>
      </Box>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Paper sx={{ p: 3 }} elevation={3}>
          {renderRow(mode)}
        </Paper>
      </Popover>
    </>
  );
};

export default AddItem;
