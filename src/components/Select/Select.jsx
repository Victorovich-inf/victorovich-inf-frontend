import {MenuItem, Select as Select2} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import React, {useCallback, useMemo} from 'react';

const Select = ({
                    options, margin, fullWidth, label, onChange, value,
                    optionValueKey, optionLabelKey, getOptionLabel,
                    required, filterOptions, ...props
                }) => {
    const _options = useMemo(() => {
        if (filterOptions) return (options || []).filter(filterOptions);
        return options || [];
    }, [options, filterOptions]);

    const optionsMap = useMemo(() => {
        return _options.reduce((acc, opt, i) => {
            acc[opt[optionValueKey]] = i;
            return acc;
        }, {});
    }, [_options, optionValueKey]);

    const _getOptionLabel = useCallback((item) => {
        if (getOptionLabel) return getOptionLabel(item);
        return item[optionLabelKey];
    }, [optionLabelKey, getOptionLabel])


    return <FormControl fullWidth={fullWidth}>
        {label && <InputLabel id={`select`}>{label}</InputLabel>}
        <Select2
            label={label}
            value={value || ""}
            onChange={(e) => {
                onChange(e.target.value, _options[optionsMap[e.target.value]])
            }}
        >
            {_options.map(_ => (
                <MenuItem key={_[optionValueKey]} value={_[optionValueKey]}>
                    {_getOptionLabel(_)}
                </MenuItem>
            ))}
        </Select2>
    </FormControl>
};

Select.defaultProps = {
    optionValueKey: 'value',
    optionLabelKey: 'label',
};

export default Select;
