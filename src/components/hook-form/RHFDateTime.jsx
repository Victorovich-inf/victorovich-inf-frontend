import {useFormContext, Controller} from 'react-hook-form';
import {TextField} from '@mui/material';
import 'dayjs/locale/ru';
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';



export default function RHFDateTime({name, label, ...other}) {
  const {control} = useFormContext();

  return (
    <LocalizationProvider locale="ru" dateAdapter={AdapterDayjs}>
      <Controller
        name={name}
        control={control}
        render={({field, fieldState: {error}}) => (
          <DateTimePicker
            label={label}
            value={field.value}
            disabled={other?.disabled}
            minDate={new Date()}
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
