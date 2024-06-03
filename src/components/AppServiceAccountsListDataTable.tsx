'use client'

import { useState, useEffect } from 'react'
import MUIDataTable from 'mui-datatables'
import {showConfirmationAlert} from "@/utils/helper";
import axios from "@/lib/axios";
import {customTableOptions, dataTableOptions} from "@/utils/tableOptions";
import {Grid, IconButton, Tooltip, Typography} from "@mui/material";
import moment from "moment/moment";
import Link from "next/link";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteIcon from "@mui/icons-material/Delete";
import {IUser, SnackBarType} from "@/types/common";

export default function AppServiceAccountsListDataTable() {
    const [services, setServices] = useState<Array<IUser>>([])
    const [snackbar, setSnackbar] = useState<SnackBarType>({
        open: false,
        message: '',
    })
    const handleDelete = async (service: number) => {
        const isDeletionConfirmed = await showConfirmationAlert(
            'Are you sure?',
            'Delete this service?',
            'Yes, delete!',
            'Cancel',
        )
        if (isDeletionConfirmed) {
            await axios.delete(`/api/services/${service}`).then(response => {
                if (response.data.success) {
                    setSnackbar({ open: true, message: response.data.msg })
                    getServices()
                }
            })
        }
    }
    const columns = [
        {
            name: '#',
            options: {
                ...customTableOptions,
                filter: false,
                sort: false,
                customBodyRenderLite: (dataIndex: any, rowIndex: any) => (
                    <div style={{ textAlign: 'center' }}>
                        <Typography variant="overline" gutterBottom>
                            {(dataIndex + 1).toLocaleString('en-US', {
                                minimumIntegerDigits: 2,
                                useGrouping: false,
                            })}
                        </Typography>
                    </div>
                ),
            },
        },
        {
            name: 'Action',
            label: 'Action',
            options: {
                ...customTableOptions,
                filter: false,
                sort: false,
                customBodyRenderLite: (dataIndex: any, rowData: any) => (
                    <div style={{ textAlign: 'center',width:'100px' }}>
                        <Tooltip title="Edit">
                            <Link href={`/dashboard/appServiceManager/update/${services[dataIndex].id}`}>
                                <IconButton color="secondary" size="large">
                                    <EditTwoToneIcon
                                        sx={{ fontSize: '1.3rem' }}
                                    />
                                </IconButton>
                            </Link>
                        </Tooltip>
                        <Tooltip title="Delete">
                            <IconButton color="error" size="large">
                                <DeleteIcon
                                    sx={{ fontSize: '1.3rem' }}
                                    onClick={() =>
                                        handleDelete(services[dataIndex].id)
                                    }
                                />
                            </IconButton>
                        </Tooltip>
                    </div>
                ),
            },
        },
        {
            name: 'service_name',
            label: 'Service Name',
            options: {
                ...customTableOptions,
                filter: false,
                sort: false,
                customBodyRender: (value: string) => (
                    <div>{value}</div>
                ),
            },
        },
        {
            name: 'service_description',
            label: 'Service Description',
            options: {
                ...customTableOptions,
                filter: false,
                sort: false,
                customBodyRender: (value: string) => (
                    <div style={{ textAlign: 'left' }}>{value}</div>
                ),
            },
        },
        {
            name: 'homepage_url',
            label: 'Homepage URL',
            options: {
                ...customTableOptions,
                filter: false,
                sort: false,
                customBodyRender: (value: string) => (
                    <div style={{ textAlign: 'left' }}>{value}</div>
                ),
            },
        },
        {
            name: 'callback_url',
            label: 'Callback URL',
            options: {
                ...customTableOptions,
                filter: false,
                sort: false,
                customBodyRender: (value: string) => (
                    <div>{value}</div>
                ),
            },
        },
        {
            name: 'webhook_url',
            label: 'Webhook URL',
            options: {
                ...customTableOptions,
                filter: false,
                sort: false,
                customBodyRender: (value: string) => (
                    <div>{value}</div>
                ),
            },
        },
        {
            name: 'created_at',
            label: 'Created At',
            options: {
                ...customTableOptions,
                filter: false,
                sort: false,
                customBodyRender: (value: string) => (
                    <div style={{ textAlign: 'center' }}>
                        <Typography variant="overline">
                            {moment(value).format('D MMMM, YYYY')}
                        </Typography>
                    </div>
                ),
            },
        }
    ]
    const getServices = async () => {
        await axios
            .get('/api/services')
            .then((response: any) => {
                if (response.data.success) {
                    setServices(response.data.data)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    useEffect(() => {
        getServices()
    }, [])
    return (
                <MUIDataTable
                    title={'Services List'}
                    data={services}
                    columns={columns}
                    options={dataTableOptions}
                />
    )
}
