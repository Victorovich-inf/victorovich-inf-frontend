import {useController} from 'react-hook-form';
import { TextField} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {styled} from "@mui/material/styles";

const TextFieldCustom = styled(TextField)((props) => ({
    width: props?.width,
    marginTop: props?.marginTop || 0,
    alignSelf: props?.self || 'flex-start',
    height: props?.height,
    color: props?.textColor,
    borderColor: '#fff',
}));

const RHFTextFieldFront = ({name, custom,  ...other}) => {
    const { field, fieldState: {error}} = useController({name});
    const {t} = useTranslation()

    return <TextFieldCustom {...field} fullWidth error={!!error}  {...other} type={other?.type ||
        "text"}  />;
}

export default RHFTextFieldFront
