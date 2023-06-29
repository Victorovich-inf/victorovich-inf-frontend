import { useNavigate } from 'react-router-dom';
import { List, Typography } from '@mui/material';
import useResponsive from '../../../../hooks/useResponsive';
import { SkeletonConversationItem } from '../../../../components/skeleton';
import ChatNavItem from './ChatNavItem';
import React from 'react';
import { ChatData } from '../../../../@types/chat';
import { PATH_DASHBOARD } from '../../../../paths';
import { useParams } from 'react-router';

interface ChatNavListProps {
  conversations: ChatData[];
  openNav: boolean;
  loading: boolean;
  courseId: number;
  onCloseNav: () => void;
  selected: (el: ChatData) => boolean;
  sx: any;
}

export default function ChatNavList({
                                      conversations,
                                      openNav,
                                      courseId,
                                      onCloseNav,
                                      selected,
                                      sx,
                                      loading = false,
                                      ...other
                                    }: ChatNavListProps) {
  const navigate = useNavigate();
  const params = useParams();

  const isDesktop = useResponsive('up', 'md');

  const handleSelectConversation = (el: ChatData) => {
    navigate(PATH_DASHBOARD.chat.detail(el.id, courseId));
  };

  return (
    <List disablePadding sx={sx} {...other}>
      {loading ? [...Array(12)].map((_, idx: number) => <SkeletonConversationItem key={idx}
                                                                                  sx={undefined} />) : conversations?.length ? conversations.map((el, idx: number) => {

        return <ChatNavItem
          key={idx}
          openNav={openNav}
          lastActivity={el?.Messages?.slice(-1)[0]?.createdAt || ''}
          conversation={el}
          isSelected={params?.id === el?.id?.toString()}
          onSelect={() => {
            if (!isDesktop) {
              onCloseNav();
            }
            handleSelectConversation(el);
          }}
        />;
      }) : <Typography mt={3} textAlign='center' variant='h6' gutterBottom component='div'>
        Список пуст
      </Typography>}
    </List>
  );
}
