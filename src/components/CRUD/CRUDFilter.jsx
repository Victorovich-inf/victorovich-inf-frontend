import {Collapse, Divider, ListItem} from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import React, {useCallback, useState} from "react";
import { Grid} from "@mui/material";
import Iconify from '../iconify';

const CRUDFilter = ({children, rightChildren})=>{
    const [open, setOpen] = useState(false)
    const openHandler = useCallback(()=>{
        setOpen(!open)
    },[open])
    return (
        <>
            <Grid container xs={12}>
                <Grid item xs={4}>
                    <ListItem button onClick={openHandler} style={{"maxWidth": "150px"}}>
                        <ListItemText primary={"Фильтры"}/>
                        {open ? <Iconify icon="material-symbols:expand-less"/> : <Iconify icon="ic:baseline-expand-more"/>}
                    </ListItem>
                </Grid>
                <Grid item xs={8}>
                    <div style={{"float":"right"}}>
                        {rightChildren && rightChildren}
                    </div>
                </Grid>
            </Grid>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <Divider/>
                {children}
            </Collapse>
        </>
    )
}

export default CRUDFilter