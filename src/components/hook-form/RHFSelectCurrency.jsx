import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextField } from '@mui/material';

// ----------------------------------------------------------------------

RHFSelectCurrency.propTypes = {
  name: PropTypes.string,
  options: PropTypes.array,
};

export default function RHFSelectCurrency({ setSeeItem, name, options, ...other }) {
  const { control } = useFormContext();

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
          onChange={(event) => {
            field.onChange(event.target.value);
            setSeeItem(event.target.value)
          }}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </TextField>
      )}
    />
  );
}
