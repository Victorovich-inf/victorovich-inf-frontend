import React, { useMemo, useState } from 'react';
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ContentData } from '../../../@types/editor';
import Iconify from '../../iconify';
import ReactPlayer from 'react-player';
import clsx from 'clsx';
import './RowElement.css';
import axios from 'axios';
import { formatBytes } from '../../../utils/utils';
import Lightbox from '../../lightbox';
import useResponsive from '../../../hooks/useResponsive';

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
    objectFit: 'cover',
    maxHeight: 500,
    '@media (max-width: 900px)': {
      maxWidth: '95%',
      paddingTop: 20,
      maxHeight: 300,
    },
    '&.player': {
      width: '100%',
      height: 450,
    },
  },
  file: {
    objectFit: 'cover',
    maxHeight: 450,
    display: 'flex',
    columnGap: 10,
    width: '100%',
  },
});

const RowElement = ({ data, idx }: RowElementProps) => {
  const classes = useStyles();
  const [size, setSize] = useState('');
  const isMobile = useResponsive('down', 'sm');

  const [imagesLightbox, setImagesLightbox] = useState<Array<{ src: string }>>([])
  const [selectedImage, setSelectedImage] = useState(-1);

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

  function handleOpenImage(src: string) {
    setSelectedImage(0)
    setImagesLightbox([{src: src}])
  }

  function handleCloseLightbox() {
    setSelectedImage(-1);
  };

  async function getFileStats(url: string) {
    const { data } = await axios.get(url, {
      responseType: 'blob',
    });
    return data.size;
  }

  function getFileExt(url: string) {
    // @ts-ignore
    return url.split('/').pop().split('#')[0].split('?')[0].split('.')[1];
  }

  function downloadFile(address: string, name: string) {
    axios.get(address, {
      responseType: 'blob',
    }).then(({ data: blob }) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `${name}.${getFileExt(address)}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }

  React.useEffect(() => {
    if ('file' in data.element) {
      getFileStats(data.element.file).then(res => {
        const size = formatBytes(res);
        setSize(size);
      });
    }
  }, [data]);

  const renderRow = (type: string) => {
    switch (type) {
      case 'image': {
        return <img className={classes.image} onClick={() => handleOpenImage('src' in data.element ? data.element?.src :'')} src={'src' in data.element ? data.element?.src : ''} alt='image' />;
      }
      case 'video': {

        if ('video' in data.element && data.element.video.includes('vk.com')) {
          return <iframe src={data.element?.video} height="360" width="640"
                         className={clsx(classes.image, 'player')} allow="autoplay; encrypted-media; fullscreen; picture-in-picture;"
                         frameBorder="0" allowFullScreen/>
        }

        return <ReactPlayer controls={true} className={clsx(classes.image, 'player-details')}
                            url={'video' in data.element ? data.element?.video : ''} />;
      }
      case 'html': {
        return <div className='html-details'
                    dangerouslySetInnerHTML={{ __html: 'html' in data.element ? data.element?.html : '' }} />;
      }
      case 'file': {
        return <div className='file-details'>
          <div className='file-details-content'>
            <div className='file-details-info'>
              <div className='file-details-top'>{'name' in data.element ? data.element?.name : ''}</div>
              <span>{size}</span>
            </div>
            <Iconify onClick={() => downloadFile('file' in data.element ? data.element.file : '', 'name' in data.element ? data.element?.name : '')} sx={{ cursor: 'pointer' }} icon='material-symbols:download' />
          </div>
        </div>;
      }

      default: {
        return <div></div>;
      }
    }
  };

  return (
    <>
      <Box className={classes.row}>
        {renderRow(type)}
        <Lightbox
          index={selectedImage}
          slides={imagesLightbox} disabledZoom={!isMobile} disabledCaptions disabledFullscreen disabledVideo disabledThumbnails
          open={selectedImage >= 0}
          close={handleCloseLightbox} disabledTotal={false} disabledSlideshow={false}
          onGetCurrentIndex={undefined} />
      </Box>
    </>
  );
};

export default RowElement;