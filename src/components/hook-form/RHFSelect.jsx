import PropTypes from 'prop-types';
import { useFormContext, Controller } from 'react-hook-form';
import { Divider, MenuItem, TextField } from '@mui/material';
import { useCallback } from 'react';

RHFSelect.propTypes = {
  name: PropTypes.string,
  options: PropTypes.array,
};

export default function RHFSelect({ name, options, optionValueKey, getOptionLabel, optionLabelKey, ...other }) {
  const { control } = useFormContext();

  const _getOptionLabel = useCallback((item) => {
    if (getOptionLabel) return getOptionLabel(item);
    if (optionLabelKey) return item[optionLabelKey];
    return item
  }, [optionLabelKey, getOptionLabel])


  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          select
          fullWidth
          SelectProps={{
            MenuProps: {
              PaperProps: {
                sx: {
                  px: 1,
                  '& .MuiMenuItem-root': {
                    px: 1,
                    borderRadius: 0.75,
                    typography: 'body2',
                    textTransform: 'capitalize',
                  },
                },
              },
            },
            sx: { textTransform: 'capitalize' },
          }}
          error={!!error}
          helperText={error ? error?.message : null}
          {...other}
        >
          <MenuItem value="">Пусто</MenuItem>
          <Divider sx={{ borderStyle: 'dashed' }} />
          {options.map((option) => (
            <MenuItem key={optionValueKey ? option[optionValueKey] :  option} value={optionValueKey ? option[optionValueKey] :  option}>
              {_getOptionLabel(option)}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
}
