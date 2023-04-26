import React, { useMemo } from 'react';
import { Box, IconButton, Paper, Popover, Stack, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ContentData } from '../../../@types/editor';
import Iconify from '../../iconify';
import SettingsImage from './SettingsImage';
import { useCourseEditContext } from '../../../utils/context/CourseEditContext';
import { confirmDialog } from '../../dialogs/DialogDelete';
import ReactPlayer from 'react-player';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import SettingsFile from './SettingsFile';
import clsx from 'clsx';
import SettingsVideo from './SettingsVideo';

interface RowElementProps {
  data: ContentData;
  idx: number;
}

const useStyles = makeStyles({
  row: {
    borderRadius: '16px',
    minHeight: 80,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  image: {
    maxWidth: '70%',
    objectFit: 'cover',
    maxHeight: 450,
    '@media (max-width: 900px)': {
      maxWidth: '95%',
      paddingTop: 20,
      maxHeight: 300,
    }
  },
  settings: {
    position: 'absolute',
    top: -10,
    right: 10,
  },
  file: {
    objectFit: 'cover',
    maxHeight: 450,
    display: 'flex',
    columnGap: 10,
    width: '100%'
  },
});

const RowElementAdmin = ({ data, idx }: RowElementProps) => {
  const [hover, setHover] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const { handleDeleteElement, handleMoveUp, handleMoveDown, handleChangeContent } = useCourseEditContext();

  const handleDelete = () => {
    return confirmDialog('Удаление элемента', `Вы действительно хотите удалить этот элемент`, async () => {
      handleDeleteElement(data.id.toString());
    });
  };

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
      return 'image';
    }
    if ('video' in data.element) {
      return 'video';
    }
    if ('html' in data.element) {
      return 'html';
    }
    if ('file' in data.element) {
      return 'file';
    }
    return '';
  }, [data]);

  const renderRow = (type: string) => {
    switch (type) {
      case 'image': {
        return <img className={classes.image} src={'src' in data.element ? data.element?.src : ''} alt='image' />;
      }
      case 'video': {
        return <ReactPlayer  className={clsx(classes.image, 'player')} url={'video' in data.element ? data.element?.video : ''} />;
      }
      case 'html': {
        return <CKEditor
          editor={ ClassicEditor }
          data={'html' in data.element ? data.element?.html : ''}
          onChange={ ( event, editor ) => {
            const contentEditor = editor.getData();
            let newData = JSON.parse(JSON.stringify(data))
            if ('html' in newData.element) {
              newData.element.html = contentEditor;
            }
            handleChangeContent(newData);
          } }
        />;
      }
      case 'file': {
        return <div className={classes.file}>
          <Iconify icon="material-symbols:file-present" width={60}/>
          <Stack spacing={1}>
            <Typography  variant="h6" > {'file' in data.element && data.element?.file ? 'Файл загружен' : 'Файл не выбран'}</Typography>
            {'name' in data.element && data.element?.name ? <Typography  variant="subtitle1" >{data.element?.name}</Typography> : null}
          </Stack>
        </div>;
      }

      default: {
        return <div></div>;
      }
    }
  };

  const renderSettings = (type: string) => {
    switch (type) {
      case 'image': {
        return <SettingsImage data={data} />;
      }
      case 'video': {
        return <SettingsVideo data={data} />;
      }
      case 'file': {
        return <SettingsFile data={data} />;
      }
      default: {
        return <div></div>;
      }
    }
  };

  const handleMoveDownElement = () => {
    handleMoveDown(idx);
  };

  const handleMoveUpElement = () => {
    handleMoveUp(idx);
  };

  return (
    <>
      <Box onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className={classes.row}>
        {renderRow(type)}
        <Stack className={classes.settings} direction='row'>
          <IconButton onClick={handleMoveUpElement}>
            <Iconify icon='material-symbols:arrow-circle-up' />
          </IconButton>
          <IconButton onClick={handleMoveDownElement}>
            <Iconify icon='material-symbols:arrow-circle-down' />
          </IconButton>
          <IconButton onClick={handleDelete}>
            <Iconify icon='material-symbols:delete-forever-rounded' />
          </IconButton>
          {type === 'video' || type === 'image' || type === 'file' ? <IconButton onClick={handleClick}>
            <Iconify icon='material-symbols:settings' />
          </IconButton> : null}
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

export default RowElementAdmin;