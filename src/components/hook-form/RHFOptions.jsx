import React, {useState} from 'react';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {useController, useFieldArray, useFormContext} from "react-hook-form";
import {  Card, FormHelperText, Stack } from '@mui/material';
import OptionsField from '../Fields/OptionsField';
import Iconify from '../iconify';

function RHFOptions({label, disabled, subServiceId}) {
    const {control} = useFormContext();
    const {fieldState: {error}} = useController({name: 'options'});

    const {fields, append, remove} = useFieldArray({
        control,
        name: 'options',
    });


    const deleteColumnStyles = {
            position: "sticky",
            right: 0,
        },
        cellHeadStyles = {fontWeight: "bold"};

    function deleteActHandler(id) {
        const index = fields.findIndex(el => el.actId === id)
        remove(index);
    }

    const [open, setOpen] = useState(false)

  const onClickDeleteButton = (item) => {
    const index = fields.findIndex(el => el.optionId === item.optionId);
    remove(index);
  };

    return (
      <Grid container sx={{ mt: 2 }}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Stack justifyContent='space-between' direction='row'>
              <Typography variant='h4' gutterBottom>
                Опции
              </Typography>
              <OptionsField
                extraFilter={{
                  service: subServiceId,
                }}
                onChange={val => {
                  append({ ...val, optionId: val.id });
                }
                }
              />
            </Stack>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell variant={'head'} style={cellHeadStyles}>
                    № n/n
                  </TableCell>
                  <TableCell variant={'head'} style={cellHeadStyles}>
                    Название
                  </TableCell>
                  <TableCell variant={'head'} style={cellHeadStyles}>
                    Кол-во чел. от
                  </TableCell>
                  <TableCell variant={'head'} style={cellHeadStyles}>
                    Кол-во чел. до
                  </TableCell>
                  <TableCell variant={'head'} style={cellHeadStyles}>
                    Длительность
                  </TableCell>
                  <TableCell variant={'head'} style={cellHeadStyles}>
                    Цена
                  </TableCell>
                  <TableCell style={deleteColumnStyles} />
                </TableRow>
              </TableHead>
              <TableBody>
                {(fields || []).map((item) => {
                  return (
                    <TableRow>
                      <TableCell variant={'head'} style={cellHeadStyles}>
                        {item.optionId}
                      </TableCell>
                      <TableCell variant={'head'} style={cellHeadStyles}>
                        {item.optionsName}
                      </TableCell>
                      <TableCell variant={'head'} style={cellHeadStyles}>
                        {item.optionsCount1}
                      </TableCell>
                      <TableCell variant={'head'} style={cellHeadStyles}>
                        {item.optionsCount2}
                      </TableCell>
                      <TableCell variant={'head'} style={cellHeadStyles}>
                        {item.duration}
                      </TableCell>
                      <TableCell variant={'head'} style={cellHeadStyles}>
                        {item.optionsNewPrice}
                      </TableCell>
                      <TableCell variant={'head'} align={'right'} style={cellHeadStyles}>
                        <Iconify color="error" icon={'material-symbols:delete-outline'}
                                 style={{ fontSize: '1.5rem', cursor: 'pointer' }}
                                 onClick={() => onClickDeleteButton(item)} />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            <FormHelperText error sx={{p: 2}}>
              {error?.message ? error?.message : null}
            </FormHelperText>
          </Card>
        </Grid>
      </Grid>
    );
}

export default RHFOptions;
