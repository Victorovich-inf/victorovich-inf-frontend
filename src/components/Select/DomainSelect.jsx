import { useEffect, useMemo } from "react";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import Select from "./Select";

const DomainSelect = ({
                          reducerArrayKey,
                          reducerKey,
                          reducerAction,
                          isNullable,
                          filter,
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
    return (
            <Select options={options} {...props} />
    );
};

DomainSelect.defaultProps = {
    optionValueKey: "id",
    optionLabelKey: "name",
};

export default DomainSelect;
