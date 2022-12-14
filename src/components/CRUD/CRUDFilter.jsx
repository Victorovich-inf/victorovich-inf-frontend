import {Collapse, Divider} from "@mui/material";
import React, { useState} from "react";

const CRUDFilter = ({children, open})=>{
    return (
      <Collapse in={open} timeout="auto" unmountOnExit>
          <Divider/>
          {children}
      </Collapse>
    )
}

export default CRUDFilter