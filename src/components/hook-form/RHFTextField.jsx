import {useController} from 'react-hook-form';
import { TextField} from '@mui/material';

const RHFTextField = ({name, custom,  ...other}) => {
    const { field, fieldState: {error}} = useController({name});

    return <TextField {...field} fullWidth error={!!error}  {...other} type={other?.type ||
        "text"} helperText={error?.message} />;
}

export default RHFTextField
