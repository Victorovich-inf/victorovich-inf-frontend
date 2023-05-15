import { formatDistanceToNowStrict } from 'date-fns';
import { ru } from 'date-fns/locale'
import {
  Stack,
  Typography,
  ListItemText,
  ListItemButton,
  ListItemAvatar,
} from '@mui/material';
import { CustomAvatar } from '../../../../components/custom-avatar';
import BadgeStatus from '../../../../components/badge-status';
import { ChatData } from '../../../../@types/chat';

interface ChatNavItemProps {
  conversation: ChatData;
  openNav: boolean;
  isSelected: boolean;
  onSelect: () => void;
}

export default function ChatNavItem({ conversation, openNav, isSelected, onSelect }: ChatNavItemProps) {
  const lastActivity = conversation.createdAt;

  const isUnread = true;

  return (
    <ListItemButton
      disableGutters
      onClick={onSelect}
      sx={{
        py: 1.5,
        px: 2.5,
        ...(isSelected && {
          bgcolor: 'action.selected',
        }),
      }}
    >
      <ListItemAvatar>
        <CustomAvatar
          key={conversation.id}
          // @ts-ignore
          name={`${conversation.user?.firstName}${conversation.user?.lastName}`}
          BadgeProps={{
            badgeContent: <BadgeStatus status={'send'} />,
          }}
          sx={{ width: 48, height: 48 } as any}
        />
      </ListItemAvatar>

      {openNav && (
        <>
          <ListItemText
            primary={`${conversation.user?.firstName} ${conversation.user?.lastName}`}
            primaryTypographyProps={{ noWrap: true, variant: 'subtitle2' }}
            secondary={`Куратор`}
            secondaryTypographyProps={{
              noWrap: true,
              variant: isUnread ? 'subtitle2' : 'body2',
              color: isUnread ? 'text.primary' : 'text.secondary',
            }}
          />

          <Stack alignItems='flex-end' sx={{ ml: 2, height: 44 }}>
            <Typography
              noWrap
              variant='body2'
              component='span'
              sx={{
                mb: 1.5,
                fontSize: 12,
                color: 'text.disabled',
              }}
            >
              {formatDistanceToNowStrict(new Date(lastActivity), {
                addSuffix: false,
                locale: ru
              })}
            </Typography>

            {isUnread && <BadgeStatus status='unread' size='small' />}
          </Stack>
        </>
      )}
    </ListItemButton>
  );
}