import { useState, useEffect } from 'react';
import { useTheme, styled } from '@mui/material/styles';
import { Drawer, IconButton } from '@mui/material';
import useResponsive from '../../../../hooks/useResponsive';
import Iconify from '../../../../components/iconify';
import Scrollbar from '../../../../components/scrollbar';
import ChatNavList from './ChatNavList';
import { ChatData } from '../../../../@types/chat';
import { useParams } from 'react-router';
import { useChatContext } from '../../../../utils/context/ChatContext';

const StyledToggleButton = styled((props) => <IconButton disableRipple {...props} />)(
  ({ theme }) => ({
    left: 0,
    zIndex: 9,
    width: 32,
    height: 32,
    position: 'absolute',
    top: theme.spacing(13),
    borderRadius: `0 12px 12px 0`,
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    // @ts-ignore
    boxShadow: theme.customShadows.primary,
    '&:hover': {
      // @ts-ignore
      backgroundColor: theme.palette.primary.darker,
    },
  })
);

const NAV_WIDTH = 320;

const NAV_COLLAPSE_WIDTH = 96;

interface ChatNavProps {
  conversations: ChatData[]
  courseId: number
}

export default function ChatNav({ conversations, courseId }: ChatNavProps) {
  const theme = useTheme();

  const {activeChat} = useChatContext()

  const isDesktop = useResponsive('up', 'md');

  const [openNav, setOpenNav] = useState(false);

  const isCollapse = isDesktop && !openNav;

  useEffect(() => {
    if (!isDesktop) {
      handleCloseNav();
    } else {
      handleOpenNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDesktop]);

  const handleToggleNav = () => {
    setOpenNav(!openNav);
  };

  const handleOpenNav = () => {
    setOpenNav(true);
  };

  const handleCloseNav = () => {
    setOpenNav(false);
  };

  const renderContent = (
    <>
      <Scrollbar sx={undefined}>
        <ChatNavList
          loading={false}
          openNav={openNav}
          courseId={courseId}
          onCloseNav={handleCloseNav}
          conversations={conversations}
          selected={(el) => {
            return false
          }} sx={undefined}        />
      </Scrollbar>
    </>
  );

  return (
    <>
      {!isDesktop && (
        // @ts-ignore
        <StyledToggleButton onClick={handleToggleNav}>
          <Iconify width={16} icon="eva:people-fill" />
        </StyledToggleButton>
      )}

      {isDesktop ? (
        <Drawer
          open={openNav}
          variant="persistent"
          PaperProps={{
            sx: {
              pb: 1,
              width: 1,
              position: 'static',
              ...(isCollapse && {
                transform: 'none !important',
                visibility: 'visible !important',
              }),
            },
          }}
          sx={{
            width: activeChat ? NAV_WIDTH : '100%',
            transition: theme.transitions.create('width'),
            ...(isCollapse && {
              width: NAV_COLLAPSE_WIDTH,
            }),
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={handleCloseNav}
          ModalProps={{ keepMounted: true }}
          PaperProps={{
            sx: {
              pb: 1,
              width: NAV_WIDTH,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </>
  );
}
