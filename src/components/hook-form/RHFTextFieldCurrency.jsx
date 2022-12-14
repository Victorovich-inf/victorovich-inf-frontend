import {useController} from 'react-hook-form';
import {InputAdornment, TextField} from '@mui/material';

const RHFTextFieldCurrency = ({name, valueName, ...other}) => {
    const {field, fieldState: {error}} = useController({name});
    const {field: { value }} = useController({name: valueName});
    return <TextField InputProps={{
        startAdornment: <InputAdornment position="start">{value}</InputAdornment>
    }
    }
                      {...field} fullWidth error={!!error}  {...other} type={other?.type ||
        "text"}/>;
}

export default RHFTextFieldCurrency
