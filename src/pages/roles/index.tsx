import { Button, IconButton, Tooltip } from '@mui/joy'
import { useEffect, useState } from 'react'
import { showConfirmationAlert } from '@/utils/helper'
// import AlertDialogSlide from 'components/common/SlideInDialog';
import AddRole from './AddRole'
import { Breadcrumb, IRole } from 'types/common'
import EditRole from './Edit'
import axios from '@/lib/axios'
import BasicDataTable from '@/components/Table/BasicDatatable'
import DashboardLayout from '@/components/Layouts/DashboardLayout'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import Add from '@mui/icons-material/Add'
import toast from 'react-hot-toast'

const breadcrumbs: Breadcrumb[] = [
    { label: 'Roles', link: '#some-link', isLast: true },
]

const Roles = () => {
    const [loading, setLoading] = useState(false)
    const [roles, setRoles] = useState<IRole[]>([])
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [addRoleModalOpen, setAddRoleModalOpen] = useState(false)
    const [editRoleModalOpen, setEditRoleModalOpen] = useState(false)
    const [editSelectedRole, setEditSelectedRole] = useState<IRole | null>()
    const [updateRole, setUpdateRole] = useState(false)

    const handleDelete = async (id: number) => {
        const isDeletionConfirmed = await showConfirmationAlert(
            'Are you sure?',
            'Delete this role?',
            'Yes, delete!',
            'Cancel',
        )

        if (isDeletionConfirmed) {
            try {
                await axios.delete(`api/roles/${id}`).then(resp => {
                    if (resp.data.success === true) {
                        toast.success(resp.data.msg)
                        setUpdateRole(!updateRole)
                        setLoading(false)
                    }
                })
            } catch (e) {
                setLoading(false)
            }
        }
    }

    const handleEditClick = (role: IRole) => {
        setEditSelectedRole(role)
    }
    const columns: any[] = [
        { header: 'Name', accessor: 'name' },
        {
            header: 'Actions',
            content: (role: IRole) => {
                return (
                    <div>
                        <Tooltip title="Edit">
                            <IconButton
                                disabled={!role.is_modifiable}
                                type="primary"
                                color="primary"
                                onClick={() => {
                                    handleEditClick(role)
                                    setEditRoleModalOpen(true)
                                }}>
                                <EditIcon />
                            </IconButton>
                        </Tooltip>

                        {/* Delete Icon Button */}
                        <Tooltip title="Delete">
                            <IconButton
                                disabled={!role.is_modifiable}
                                type="danger"
                                color="danger"
                                onClick={() => handleDelete(role.id)}>
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
                await axios.get('api/roles').then(resp => {
                    if (resp.data.success === true) {
                        setRoles(resp.data.data)
                        setLoading(false)
                    }
                })
            } catch (e) {
                setLoading(false)
            }
        }
        init()
    }, [updateRole])

    return (
        <>
            <DashboardLayout
                head="Role"
                breadcrumbs={breadcrumbs}
                title="Role Management"
                secondary={
                    <Button
                        startDecorator={<Add />}
                        onClick={() => setAddRoleModalOpen(true)}>
                        Add Role
                    </Button>
                }>
                <BasicDataTable
                    columns={columns}
                    rows={roles}
                    count={roles.length}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    showSL={true}
                    setPage={setPage}
                    setRowsPerPage={setRowsPerPage}
                />
                <AddRole
                    addRoleModalOpen={addRoleModalOpen}
                    setAddRoleModalOpen={(value: boolean) =>
                        setAddRoleModalOpen(value)
                    }
                    updateRole={updateRole}
                    setUpdateRole={(value: boolean) => setUpdateRole(value)}
                />
                {editSelectedRole && (
                    <EditRole
                        role={editSelectedRole}
                        editRoleModalOpen={editRoleModalOpen}
                        setEditRoleModalOpen={(value: boolean) => {
                            setEditRoleModalOpen(value)
                            // Making null otherwise it is always rendering same components and value remails same
                            setEditSelectedRole(null)
                        }}
                        updateRole={updateRole}
                        setUpdateRole={(value: boolean) => setUpdateRole(value)}
                    />
                )}
            </DashboardLayout>
        </>
    )
}

export default Roles
