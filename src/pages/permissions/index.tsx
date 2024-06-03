import { useEffect, useState } from 'react'
import { Breadcrumb, IPermission, IRole } from 'types/common'
import {
    Grid,
    Table,
    Stack,
    Button,
    Sheet,
    IconButton,
    Tooltip,
    Typography,
} from '@mui/joy'
import axios from '@/lib/axios'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import DashboardLayout from '@/components/Layouts/DashboardLayout'
import AddPermission from './Add'
import Add from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import router from 'next/router'
import toast from 'react-hot-toast'
import { showConfirmationAlert } from '@/utils/helper'
import EditPermission from './Edit'

const breadcrumbs: Breadcrumb[] = [
    { label: 'Permissions', link: '#some-link', isLast: true },
]
const Permission = () => {
    const [loading, setLoading] = useState(false)
    const [roles, setRoles] = useState<IRole[]>()
    const [permissions, setPermissions] = useState<IPermission[]>()
    const [addPermissionModalOpen, setAddPermissionModalOpen] = useState(false)
    const [editPermissionModalOpen, setEditPermissionModalOpen] = useState(
        false,
    )
    const [selectedPermission, setSelectedPermission] = useState<IPermission>()
    const [permissionUpdate, setPermissionUpdate] = useState<boolean>(false)

    const handleDelete = async (id: number) => {
        const isDeletionConfirmed = await showConfirmationAlert(
            'Are you sure?',
            'Delete this permission?',
            'Yes, delete!',
            'Cancel',
        )
        if (isDeletionConfirmed) {
            try {
                await axios.delete(`/api/permissions/${id}`).then(response => {
                    if (response.data.success) {
                        toast.success(response.data.msg)
                        // setSnackbar({ open: true, message: response.data.msg })
                        setPermissionUpdate(!permissionUpdate)
                    } else {
                        toast.error(response.data.msg)
                    }
                })
            } catch (error) {
                toast.success(error.response.data.msg)
            }
        }
    }

    useEffect(() => {
        const init = async () => {
            setLoading(true)
            try {
                const resp = await axios.get('api/roles')
                if (resp.data.success === true) {
                    setRoles(resp.data.data)
                }
            } catch (e) {
                // Handle error
            }
            setLoading(false)
        }
        init()
    }, [permissionUpdate])

    useEffect(() => {
        const init = async () => {
            setLoading(true)
            try {
                const resp = await axios.get('api/permissions')
                if (resp.data.success === true) {
                    setPermissions(resp.data.data)
                }
            } catch (e) {
                // Handle error
            }
            setLoading(false)
        }
        init()
    }, [permissionUpdate])

    return (
        <DashboardLayout
            head="Permission"
            title="Permisison Management"
            breadcrumbs={breadcrumbs}
            secondary={
                <Button
                    // variant="outlined"
                    startDecorator={<Add />}
                    onClick={() => setAddPermissionModalOpen(true)}>
                    Add Permission
                </Button>
            }>
            <Grid container>
                <Stack sx={{ width: '100%' }}>
                    <Sheet sx={{ height: 400, overflow: 'scroll' }}>
                        <Table
                            aria-label="basic table"
                            stripe="odd"
                            stickyHeader
                            hoverRow
                            borderAxis="both">
                            <thead>
                                <tr className="sticky-header">
                                    <th
                                        scope="row"
                                        style={{
                                            textAlign: 'center',
                                            verticalAlign: 'middle',
                                        }}
                                        rowSpan={2}>
                                        PERMISSION NAME
                                    </th>
                                    <th
                                        scope="row"
                                        style={{
                                            textAlign: 'center',
                                        }}
                                        colSpan={roles?.length}>
                                        ROLE NAME
                                    </th>
                                    <th
                                        scope="row"
                                        rowSpan={2}
                                        style={{
                                            textAlign: 'center',
                                            verticalAlign: 'middle',
                                        }}>
                                        Action
                                    </th>
                                </tr>
                                <tr>
                                    {roles?.length &&
                                        roles.map(role => (
                                            <th
                                                key={role.name}
                                                scope="row"
                                                style={{
                                                    textAlign: 'center',
                                                }}>
                                                <Typography level="body-sm">
                                                    {role.name.toUpperCase()}
                                                </Typography>
                                            </th>
                                        ))}
                                </tr>
                            </thead>
                            <tbody>
                                {permissions?.length &&
                                    permissions.map(
                                        (permission: any, index) => (
                                            <tr key={permission.name}>
                                                <td
                                                    scope="row"
                                                    style={{
                                                        overflow: 'hidden',
                                                        wordWrap: 'break-word',
                                                    }}>
                                                    {permission.name}
                                                </td>
                                                {roles?.length &&
                                                    roles.map(role => (
                                                        <td
                                                            key={role.name}
                                                            scope="row"
                                                            style={{
                                                                textAlign:
                                                                    'center',
                                                            }}>
                                                            {permission.roles.some(
                                                                permissionRole =>
                                                                    permissionRole.id ===
                                                                    role.id,
                                                            ) ? (
                                                                <CheckCircleIcon color="success" />
                                                            ) : (
                                                                <CancelIcon color="error" />
                                                            )}
                                                        </td>
                                                    ))}
                                                <td
                                                    scope="row"
                                                    style={{
                                                        textAlign: 'center',
                                                    }}>
                                                    <>
                                                        <Tooltip title="Edit">
                                                            <IconButton
                                                                type="primary"
                                                                color="primary"
                                                                onClick={() => {
                                                                    setSelectedPermission(
                                                                        permission,
                                                                    )
                                                                    setEditPermissionModalOpen(
                                                                        true,
                                                                    )
                                                                }}>
                                                                <EditIcon />
                                                            </IconButton>
                                                        </Tooltip>

                                                        {/* Delete Icon Button */}
                                                        <Tooltip title="Delete">
                                                            <IconButton
                                                                type="danger"
                                                                color="danger"
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        permission.id,
                                                                    )
                                                                }>
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </>
                                                </td>
                                            </tr>
                                        ),
                                    )}
                            </tbody>
                        </Table>
                    </Sheet>
                </Stack>
                <Grid>
                    <AddPermission
                        addPermissionModalOpen={addPermissionModalOpen}
                        setAddPermissionModalOpen={(value: boolean) =>
                            setAddPermissionModalOpen(value)
                        }
                        updatePermission={permissionUpdate}
                        setUpdatePermission={(value: boolean) =>
                            setPermissionUpdate(value)
                        }
                        roles={roles}
                    />
                </Grid>
                <Grid>
                    <EditPermission
                        editPermissionModalOpen={editPermissionModalOpen}
                        setEditPermissionModalOpen={(value: boolean) =>
                            setEditPermissionModalOpen(value)
                        }
                        updatePermission={permissionUpdate}
                        setUpdatePermission={(value: boolean) =>
                            setPermissionUpdate(value)
                        }
                        permissionData={selectedPermission}
                        roles={roles}
                    />
                </Grid>
            </Grid>
        </DashboardLayout>
    )
}

export default Permission
