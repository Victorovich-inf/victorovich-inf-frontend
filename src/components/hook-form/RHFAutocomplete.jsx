import PropTypes from 'prop-types';
// form
import {useController} from 'react-hook-form';
// @mui
import {Box, Chip, FormHelperText, TextField} from '@mui/material';
import {Autocomplete} from "@mui/lab";
import {useEffect, useMemo, useState} from "react";
import {throttle} from "lodash";
import {getOptions} from "../../redux/actions/optionsActions";
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { convertValidation } from '../../utils/utils';

// ----------------------------------------------------------------------

RHFAutocomplete.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    options: PropTypes.array,
};

export function RHFAutocomplete({name, options, label, model, lang, keyValue, ...other}) {
    const {field, fieldState: {error}} = useController({name});
    const [optionsLocal, setOptionsLocal] = useState(options?.length ? options : [])
    const [open, setOpen] = useState(false);
    const loading = open && optionsLocal?.length === 0;
    const {lang: languages} = useSelector((state) => state.lang);

    const [stopList] = ['dormitoryRoomsAvailable']

    const fetch = useMemo(
        () =>
            throttle(async () => {
                // eslint-disable-next-line no-return-await
                return getOptions(keyValue, model, lang)
            }),
        [model, keyValue, lang]
    );
    const {t} = useTranslation()


    useEffect(() => {
        let active = true;
        if (stopList.includes(keyValue)) {
            return;
        }
        if (!loading) {
            return;
        }
        (async function () {
            if (active) {
                const data = await fetch({});
                setOptionsLocal(data)
            }
        }())

        return () => {
            active = false;
        };
    }, [fetch, loading]);

    return (
        <Box>
            <Autocomplete
                {...field}
                {...other}
                multiple
                onOpen={() => {
                    setOpen(true);
                }}
                onClose={() => {
                    setOpen(false);
                }}
                freeSolo
                onChange={(event, newValue) => field.onChange(newValue)}
                options={optionsLocal.map((option) => option)}
                renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                        <Chip {...getTagProps({index})} keyValue={option} size="small"
                              label={option}/>
                    ))
                }
                renderInput={(params) => <TextField fullWidth
                                                    label={label} {...params} />}
            />
            {error?.message && <FormHelperText error sx={{px: 2,}}>
                {t(`validation${convertValidation(languages, name)}`)}
            </FormHelperText>}
        </Box>

    );
}
