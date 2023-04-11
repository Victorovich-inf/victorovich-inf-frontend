import {useController} from 'react-hook-form';
import { TextField} from '@mui/material';

const RHFTextField = ({name,  ...other}) => {
    const { field, fieldState: {error}} = useController({name});

    return <TextField {...field} fullWidth error={!!error}  {...other} type={other?.type ||
        "text"} helperText={error?.message} />;
}

export default RHFTextField
