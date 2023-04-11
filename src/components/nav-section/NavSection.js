import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';
import { Box, List, ListItemText } from '@mui/material';
import { StyledNavItem, StyledNavItemIcon } from './styles';
import { connect } from 'react-redux';
import { getUserData } from '../../store/reducers/userReducer';
import { useMemo } from 'react';

NavSection.propTypes = {
  data: PropTypes.array,
};

function NavSection({ data = [], user, ...other }) {

  const _data = useMemo(() => {
    return data.filter(el => el.role.includes(user.role))
  }, [data, user])

  return (
    <Box sx={{mt: 5}} {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {_data.map((item) => (
          <NavItem key={item.title} item={item} />
        ))}
      </List>
    </Box>
  );
}
export default connect(
  (state) => ({
    user: getUserData(state),
  }),
)(NavSection);

NavItem.propTypes = {
  item: PropTypes.object,
};

function NavItem({ item }) {
  const { title, path, icon, info } = item;

  return (
    <StyledNavItem
      component={RouterLink}
      to={path}
      sx={{
        '&.active': {
          color: 'text.primary',
          bgcolor: 'action.selected',
          fontWeight: 'fontWeightBold',
        },
      }}
    >
      <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

      <ListItemText disableTypography primary={title} />

      {info && info}
    </StyledNavItem>
  );
}
