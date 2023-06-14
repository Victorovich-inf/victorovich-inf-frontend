import {Column} from 'react-table'
import React from "react";
import { UserData } from '../../../../@types/user';
import Iconify from '../../../iconify';
import { Box, Button, IconButton } from '@mui/material';
import {
    useBanMutation, useMakeAdminMutation,
    useMakeСuratorMutation,
    useRemoveСuratorMutation,
    useUnbanMutation,
} from '../../../../store/api/admin/userApi';
import { useSelector } from 'react-redux';
import { confirmDialog } from '../../../dialogs/DialogDelete';

export const userColumns: Column<UserData>[] = [
    {
        Header: '#',
        accessor: 'id',
        disableSortBy: true
    },
    {
        Header: 'Почта',
        accessor: 'email',
        disableSortBy: true
    },
    {
        Header: 'Имя',
        accessor: 'firstName',
        disableSortBy: true,
        Cell: ({value}) => {
            return <span>{value ? value : 'Не задано'}</span>
        }
    },
    {
        Header: 'Фамилия',
        accessor: 'lastName',
        disableSortBy: true,
        Cell: ({value}) => {
            return <span>{value ? value : 'Не задано'}</span>
        }
    },
    {
        Header: 'Рег. завершена',
        accessor: 'confirmationCode',
        disableSortBy: true,
        Cell: ({value}) => {
            if (typeof value !== 'string') {
                return <IconButton >
                    <Iconify icon="material-symbols:check-circle-rounded"/>
                </IconButton>
            }
            return <IconButton  >
                <Iconify icon="material-symbols:cancel"/>
            </IconButton>
        }
    },
    {
        Header: 'Доступ',
        accessor: 'access',
        disableSortBy: true,
        Cell: ({row}) => {
            // @ts-ignore
            const { user } = useSelector((state: any) => state.user);
            const [ban] = useBanMutation()
            const [unban] = useUnbanMutation()
            const [makeСurator] = useMakeСuratorMutation()
            const [removeСurator] = useRemoveСuratorMutation()
            const [makeAdmin] = useMakeAdminMutation()

            const banHandler = async () => ban(row.original.id)
            const unbanHandler = async () => unban(row.original.id)
            const makeСuratorHandler = async () => makeСurator(row.original.id)
            const removeСuratorHandler = async () => removeСurator(row.original.id)
            const makeAdminHandler = async () => {
                return confirmDialog('Назначение администратором', `Вы действительно хотите назначить администратором ${row.original.firstName} ${row.original.lastName}`, async () => {
                    makeAdmin(row.original.id);
                })
            }

            if (user.id === row.original.id) {
                return null
            }

            return <Box sx={{display: 'flex', alignItems: 'center', columnGap: '5px'}}>
                {row.original.banned ? <Button onClick={unbanHandler} size="small" color={'info'}>Разбанить</Button>
                  : <Button onClick={banHandler} size="small" color={'error'}>Забанить</Button>}
                {row.original.role === 0 ? <Button onClick={makeСuratorHandler} size="small" color={'primary'}>Сд. куратором</Button>
                  : row.original.role === 2 ? <Button onClick={removeСuratorHandler} size="small" color={'secondary'}>Уб. из кураторов</Button> : null}
                {row.original.role !== 1 ? <Button onClick={makeAdminHandler} size="small" color={'info'}>Сд. админом</Button> : null}
            </Box>
        }
    },
]
