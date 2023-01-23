import { useEffect, useMemo } from "react";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import Select from "./Select";
import { useController } from 'react-hook-form';
import { FormHelperText } from '@mui/material';

const DomainSelect = ({
                          reducerArrayKey,
                          reducerKey,
                          reducerAction,
                          isNullable,
                          filter,
                        controller,
                          ...props
                      }) => {
    const dispatch = useDispatch();
    const keyRequestedCount = useMemo(
        () => `${reducerKey}RequestedCount`,
        [reducerKey]
    );
    let { [reducerArrayKey]: options, [keyRequestedCount]: requestedCount } =
        useSelector((state) => state[reducerKey]);
    useEffect(() => {
        if (requestedCount > 0) return;
        dispatch(
            reducerAction({
                paging: { skip: 0, limit: 100 },
                filter
            })
        );
    }, [dispatch, requestedCount, reducerAction, filter])
    if (isNullable) {
        const emptyOption = {};
        emptyOption[props.optionValueKey] = null;
        emptyOption[props.optionLabelKey] = 'Не указано';
        options = [emptyOption, ...options];
    }

  const {fieldState: {error}} = useController({name: controller});


  return (
      <>
        <Select options={options} {...props} />
        {error?.message ? <FormHelperText error sx={{p: 2}}>
          {error?.message ? error?.message : null}
        </FormHelperText> : null}
      </>
    );
};

DomainSelect.defaultProps = {
    optionValueKey: "id",
    optionLabelKey: "name",
};

export default DomainSelect;
