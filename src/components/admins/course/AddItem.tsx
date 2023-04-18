import React from 'react';
import { Box, Grid, IconButton, Paper, Popover, Typography } from '@mui/material';
import Iconify from '../../iconify';

const AddItem = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const buttonSX = {
    display: 'flex', flexDirection: 'column', padding: 1, justifyContent: 'center', alignItems: 'center', height: 120,
    borderWidth: 1,
    rowGap: 1,
    borderColor: 'transparent',
    borderStyle: 'solid',
    cursor: 'pointer',
    "&:hover": {
      borderColor: "#1565c0",
    },
  };

  return (
    <>
      <Box sx={{boxShadow: 2, borderRadius: '16px', minHeight: 120, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <IconButton onClick={handleClick}>
          <Iconify width={40} icon="material-symbols:add"/>
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
        <Paper sx={{p: 3}} elevation={3} >
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Box sx={buttonSX}>
                <Iconify icon="material-symbols:image-rounded" width={60}/>
                <Typography variant="body2" sx={{textAlign: 'center'}}>
                  Картинка
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box sx={buttonSX}>
                <Iconify icon="simple-icons:youtube" width={60}/>
                <Typography variant="body2" sx={{textAlign: 'center'}}>
                  Видео
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box sx={buttonSX}>
                <Iconify icon="ph:file-html" width={60}/>
                <Typography  variant="body2" sx={{textAlign: 'center'}}>
                  HTML код
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box sx={buttonSX}>
                <Iconify icon="material-symbols:file-open-sharp" width={60}/>
                <Typography  variant="body2" sx={{textAlign: 'center'}}>
                  Файл
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Popover>
    </>
  );
};

export default AddItem;
