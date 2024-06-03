import DashboardLayout from '@/components/Layouts/DashboardLayout'
import BasicDataTable from '@/components/Table/BasicDatatable'
import axios from '@/lib/axios'
import { Breadcrumb, ColumnType, IService } from '@/types/common'
import Add from '@mui/icons-material/Add'
import { Button, Chip, Grid, IconButton, Tooltip, Typography } from '@mui/joy'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import InfoIcon from '@mui/icons-material/Info'
import { useState, useEffect } from 'react'
import { showConfirmationAlert } from '@/utils/helper'
import { toast } from 'react-hot-toast'
import AddService from './AddService'
import EditService from './Edit'
import ServiceDetails from './Details'
import Zoom from '@mui/material/Zoom'
import {
    BlockOutlined,
    CloudOff,
    CheckRounded,
    CloudQueue,
} from '@mui/icons-material'
const breadcrumbs: Breadcrumb[] = [
    { label: 'Home', link: '/home', isLast: false },
    { label: 'Service', link: '#some-link', isLast: true },
]
export default function Service() {
    const [loading, setLoading] = useState(false)
    const [services, setServices] = useState<IService[]>([])
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [addServiceModalOpen, setAddServiceModalOpen] = useState(false)
    const [serviceDetailsModalOpen, setServiceDetailsModalOpen] = useState(
        false,
    )
    const [editServiceModalOpen, setEditServiceModalOpen] = useState(false)
    const [selectedService, setSelectedService] = useState<IService | null>()
    const [updateService, setUpdateService] = useState(false)

    const handleServiceClick = (service: IService) => {
        setSelectedService(service)
    }

    const handleDelete = async (id: number) => {
        const isDeletionConfirmed = await showConfirmationAlert(
            'Are you sure?',
            'Delete this service?',
            'Yes, delete!',
            'Cancel',
        )

        if (isDeletionConfirmed) {
            try {
                await axios.delete(`api/services/${id}`).then(resp => {
                    if (resp.data.success === true) {
                        toast.success(resp.data.msg)
                        setUpdateService(!updateService)
                        setLoading(false)
                    }
                })
            } catch (e) {
                setLoading(false)
            }
        }
    }

    const handleStatus = async (id: number) => {
        try {
            await axios.get(`api/service-status/${id}`).then(resp => {
                if (resp.data.success === true) {
                    toast.success(resp.data.msg)
                    setUpdateService(!updateService)
                    setLoading(false)
                }
            })
        } catch (e) {
            toast.error(e.response.data.msg)
            setLoading(false)
        }
    }

    const columns: ColumnType[] = [
        { header: 'Service Name', accessor: 'service_name', width: '30%' },
        {
            header: 'Description',
            accessor: 'service_description',
        },
        // { header: 'Homepage Url', accessor: 'homepage_url' },
        // { header: 'Callback Url', accessor: 'callback_url' },
        // { header: 'Webhook Name', accessor: 'webhook_url' },
        {
            header: 'Service Status',
            content: (service: IService) => {
                return (
                    <Tooltip
                        title="Click to change"
                        arrow
                        size="sm"
                        variant="solid"
                        placement="right">
                        <Chip
                            color={service.is_active ? 'success' : 'danger'}
                            variant="soft"
                            onClick={() => handleStatus(service.id)}
                            startDecorator={
                                service.is_active ? (
                                    <CheckRounded fontSize="small" />
                                ) : (
                                    <BlockOutlined fontSize="small" />
                                )
                            }>
                            {service.is_active ? 'Active' : 'Inactive'}
                        </Chip>
                    </Tooltip>
                )
            },
        },
        {
            header: 'Health Status',
            content: (service: IService) => {
                return (
                    <Chip
                        color={service.is_alive ? 'primary' : 'warning'}
                        variant="soft"
                        startDecorator={
                            service.is_alive ? <CloudQueue /> : <CloudOff />
                        }>
                        {service.is_alive ? 'Reachable' : 'Unreachable'}
                    </Chip>
                )
            },
        },
        {
            header: 'Actions',
            content: (service: IService) => {
                return (
                    <div>
                        <Tooltip title="Info">
                            <IconButton
                                type="primary"
                                color="primary"
                                onClick={() => {
                                    handleServiceClick(service)
                                    setServiceDetailsModalOpen(true)
                                }}>
                                <InfoIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit">
                            <IconButton
                                type="primary"
                                color="primary"
                                onClick={() => {
                                    handleServiceClick(service)
                                    setEditServiceModalOpen(true)
                                }}>
                                <EditIcon />
                            </IconButton>
                        </Tooltip>

                        {/* Delete Icon Button */}
                        <Tooltip title="Delete">
                            <IconButton
                                type="danger"
                                color="danger"
                                onClick={() => handleDelete(service.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                )
            },
        },
    ]

    useEffect(() => {
        const init = async () => {
            setLoading(true)
            try {
                await axios.get('api/services').then(resp => {
                    if (resp.data.success === true) {
                        setServices(resp.data.data)
                        setLoading(false)
                    }
                })
            } catch (e) {
                setLoading(false)
            }
        }
        init()
    }, [updateService])

    return (
        <DashboardLayout
            head="Service"
            breadcrumbs={breadcrumbs}
            title="Services"
            requiredRole={'SystemAdmin'}
            secondary={
                <Button
                    startDecorator={<Add />}
                    onClick={() => setAddServiceModalOpen(true)}>
                    Add Service
                </Button>
            }>
            <Zoom in style={{ transitionDelay: '100ms' }}>
                <Grid container>
                    <Grid>
                        <BasicDataTable
                            columns={columns}
                            rows={services}
                            count={services.length}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            showSL={true}
                            setPage={setPage}
                            setRowsPerPage={setRowsPerPage}
                        />
                    </Grid>
                </Grid>
            </Zoom>
            <AddService
                addServiceModalOpen={addServiceModalOpen}
                setAddServiceModalOpen={(value: boolean) =>
                    setAddServiceModalOpen(value)
                }
                updateService={updateService}
                setUpdateService={(value: boolean) => setUpdateService(value)}
            />
            {selectedService && (
                <ServiceDetails
                    service={selectedService}
                    serviceDetailsModalOpen={serviceDetailsModalOpen}
                    setServiceDetailsModalOpen={(value: boolean) =>
                        setServiceDetailsModalOpen(value)
                    }
                />
            )}
            {selectedService && (
                <EditService
                    service={selectedService}
                    editServiceModalOpen={editServiceModalOpen}
                    setEditServiceModalOpen={(value: boolean) =>
                        setEditServiceModalOpen(value)
                    }
                    updateService={updateService}
                    setUpdateService={(value: boolean) =>
                        setUpdateService(value)
                    }
                />
            )}
        </DashboardLayout>
    )
}
