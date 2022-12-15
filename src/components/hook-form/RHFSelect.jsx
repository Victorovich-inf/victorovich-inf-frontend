import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextField } from '@mui/material';
import { useCallback } from 'react';

// ----------------------------------------------------------------------

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
          SelectProps={{ native: true }}
          error={!!error}
          helperText={error?.message}
          {...other}
        >
          {options.map((option) => (
            <option key={optionValueKey ? option[optionValueKey] :  option} value={optionValueKey ? option[optionValueKey] :  option}>
              {_getOptionLabel(option)}
            </option>
          ))}
        </TextField>
      )}
    />
  );
}
