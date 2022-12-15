import {useFormContext, Controller} from 'react-hook-form';
import {TextField} from '@mui/material';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';



export default function RHFDate({name, label, ...other}) {
  const {control} = useFormContext();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Controller
        name={name}
        control={control}
        render={({field, fieldState: {error}}) => (
          <DatePicker
            label={label}
            value={field.value}
            disabled={other?.disabled}
            onChange={(newValue) => {
              field.onChange(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} fullWidth error={!!error} {...other}
                         helperText={error?.message ? error?.message : other?.helperText}/>
            )}
          />
        )}
      />
    </LocalizationProvider>
  );
}
