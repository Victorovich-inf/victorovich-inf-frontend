import { Button, Dialog, DialogContent, Divider, Stack } from '@mui/material';
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import OptionsCRUDTable from '../CRUD/table/OptionsCRUDTable';

export default function OptionsField({
                                          label,
                                          value,
                                          onChange,
                                          extraFilter,
                                          disabled,
                                          sx,
                                          object
                                      }) {
    const [open, setOpen] = useState(false);
    return (
        <>
          <Stack direction="row" alignItems="center">
            <Button disabled={disabled} onClick={() => setOpen(true)} variant={"outlined"} style={{ marginLeft: "10px", outline: 'none' }}>Добавить</Button>
          </Stack>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                fullWidth
                PaperProps={{sx: {maxHeight: '85%'}}}
                maxWidth={"80%"}
            >
                <DialogTitle>Выбор опции</DialogTitle>
                <Divider />
                <DialogContent>
                    <OptionsCRUDTable
                        extraFilter={extraFilter}
                        onClickCreateButton={undefined} // что бы не показывать кнопку создания
                        onRowClick={(record, rowIndex) => {
                            onChange(record);
                            setOpen(false);
                        }}
                    />
                </DialogContent>
                <Divider />
                <DialogActions>
                    <Button
                        variant={"text"}
                        style={{ marginLeft: "auto" }}
                        onClick={() => setOpen(false)}
                    >
                        Отменить
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
