import PropTypes from 'prop-types';
import { Paper, Typography } from '@mui/material';

SearchNotFound.propTypes = {
  query: PropTypes.string,
  sx: PropTypes.object,
};

interface SearchNotFoundProps {
  query: string;
  sx: object;
}

export default function SearchNotFound({ query, sx, ...other }: SearchNotFoundProps) {
  return query ? (
    <Paper
      sx={{
        textAlign: 'center',
        ...sx,
      }}
      {...other}
    >
      <Typography variant="h6" paragraph>
        Не найдено
      </Typography>

      <Typography variant="body2">
        Нет результатов для &nbsp;
        <strong>&quot;{query}&quot;</strong>.
        <br />.
      </Typography>
    </Paper>
  ) : (
    <Typography variant="body2" sx={sx}>
      Пожалуйста, введите текст
    </Typography>
  );
}
