import PropTypes from 'prop-types';
import { useFormContext, Controller } from 'react-hook-form';
import {TextField} from '@mui/material';
import {TimePicker} from "@mui/lab";

RHFTime.propTypes = {
  name: PropTypes.string,
};

export default function RHFTime({ name, label, ...other }) {
  const { control } = useFormContext();

  return (
      <Controller
          name={name}
          control={control}
          render={({ field, fieldState: { error } }) => (
              <TimePicker
                  label={label}
                  value={field.value}
                  onChange={(newValue) => {
                      field.onChange(newValue);
                  }}
                  renderInput={(params) => (
                      <TextField {...params} fullWidth error={!!error} helperText={error?.message ? error?.message : other?.helperText} />
                  )}
              />
          )}
      />
  );
}
