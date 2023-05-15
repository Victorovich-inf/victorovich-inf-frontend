import { useNavigate } from 'react-router-dom';
import { List, Typography } from '@mui/material';
import useResponsive from '../../../../hooks/useResponsive';
import { SkeletonConversationItem } from '../../../../components/skeleton';
import ChatNavItem from './ChatNavItem';
import React from 'react';
import { ChatData } from '../../../../@types/chat';

interface ChatNavListProps {
  conversations: ChatData[]
  openNav: boolean
  loading: boolean
  onCloseNav: () => void
  selected: () => boolean
  sx: any
}

export default function ChatNavList({
  conversations,
  openNav,
  onCloseNav,
  selected,
  sx,
  loading = false,
  ...other
}: ChatNavListProps) {
  const navigate = useNavigate();

  const isDesktop = useResponsive('up', 'md');

  const handleSelectConversation = (el: ChatData) => {

  };

  return (
    <List disablePadding sx={sx} {...other}>
      {loading ? [...Array(12)].map((_, idx: number) => <SkeletonConversationItem key={idx} sx={undefined} />) : conversations?.length ? conversations.map((el, idx: number) => {
        return <ChatNavItem
          key={idx}
          openNav={openNav}
          conversation={el}
          isSelected={false}
          onSelect={() => {
            if (!isDesktop) {
              onCloseNav();
            }
            handleSelectConversation(el);
          }}
        />
      }) : <Typography mt={3} textAlign="center" variant="h6" gutterBottom component="div">
        Список пуст
      </Typography>}
    </List>
  );
}
