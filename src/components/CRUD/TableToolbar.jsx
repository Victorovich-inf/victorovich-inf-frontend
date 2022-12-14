import PropTypes from 'prop-types';
import {Tooltip, IconButton, Stack} from '@mui/material';
import CRUDFilter from '../CRUD/CRUDFilter';
import React, {useCallback, useState} from 'react';
import Iconify from '../iconify';


TableToolbar.propTypes = {
    filterName: PropTypes.string,
    onFilterName: PropTypes.func,
    filters: PropTypes.node,
};

export default function TableToolbar({children, filters}) {

    const [open, setOpen] = useState(false)

    const openHandler = useCallback(() => {
        setOpen(!open)
    }, [open])
    return (
        <Stack direction="column">
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{py: 2, px: 2}}>
                {filters ? <Tooltip sx={{marginLeft: 'auto'}} title={'Фильтры'}>
                    <IconButton onClick={openHandler}>
                        <Iconify icon={'ic:round-filter-list'}/>
                    </IconButton>
                </Tooltip> : null}
            </Stack>
            <CRUDFilter open={open}>
                {children}
            </CRUDFilter>
        </Stack>

    );
}
