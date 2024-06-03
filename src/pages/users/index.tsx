import axios from '@/lib/axios'
import {
    Button,
    FormControl,
    FormLabel,
    Grid,
    IconButton,
    Input,
    Tooltip,
    Select,
    Option,
    Chip,
} from '@mui/joy'
import { Breadcrumb, IUser, SnackBarType } from '@/types/common'
import { useState, useEffect } from 'react'
import { showConfirmationAlert } from '@/utils/helper'
import DashboardLayout from '@/components/Layouts/DashboardLayout'
import BasicDataTable from '@/components/Table/BasicDatatable'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { BlockOutlined, CheckRounded } from '@mui/icons-material'
import InfoIcon from '@mui/icons-material/Info'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import SearchIcon from '@mui/icons-material/Search'
import { debounce } from 'lodash'
import { Add } from '@mui/icons-material'
import { useSelector } from 'react-redux'

const breadcrumbs: Breadcrumb[] = [
    { label: 'Users', link: '#some-link', isLast: true },
]
export default function User() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState<Array<IUser>>([])
    const [total, setTotal] = useState<number>()
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [search, setSearch] = useState('')
    const [adminType, setAdminType] = useState('')
    const [snackbar, setSnackbar] = useState<SnackBarType>({
        open: false,
        message: '',
    })
    const { roles, permissions } = useSelector(
        (state: any) => state.userManagerSlice.authorization,
    )

    const handleDelete = async (id: number) => {
        const isDeletionConfirmed = await showConfirmationAlert(
            'Are you sure?',
            'Delete this user?',
            'Yes, delete!',
            'Cancel',
        )
        if (isDeletionConfirmed) {
            try {
                await axios.delete(`/api/users/${id}`).then(response => {
                    if (response.data.success) {
                        toast.success(response.data.msg)
                        // setSnackbar({ open: true, message: response.data.msg })
                        getUsers()
                    } else {
                        toast.error(response.data.msg)
                    }
                })
            } catch (error) {
                toast.error(error.response.data.msg)
            }
        }
    }

    const getUsers = async () => {
        setLoading(true)
        await axios
            .get(
                `/api/users?page=${
                    page + 1
                }&limit=${rowsPerPage}&admin_type=${adminType}&search=${search}`,
            )
            .then((response: any) => {
                if (response.data.success) {
                    setUsers(response.data.data)
                    setTotal(response.data.meta.total)
                    setLoading(false)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleStatus = async (id: number) => {
        setLoading(true)
        try {
            await axios.get(`api/users/change-status/${id}`).then(resp => {
                if (resp.data.success === true) {
                    toast.success(resp.data.msg)
                    getUsers()
                    setLoading(false)
                } else {
                    toast.error(resp.data.msg)
                    setLoading(false)
                }
            })
        } catch (e) {
            toast.error(e.response.data.msg)
            setLoading(false)
        }
    }

    // Debounced version of getUsers
    const debouncedGetUsers = debounce(getUsers, 300)

    useEffect(() => {
        debouncedGetUsers()
        // Cleanup the debounce function on component unmount
        return () => debouncedGetUsers.cancel()
    }, [search, adminType, page, rowsPerPage])

    const columns: any[] = [
        { header: 'Name', accessor: 'name' },
        { header: 'Email', accessor: 'email' },
        {
            header: 'Status',
            content: (user: IUser) => {
                return (
                    <Tooltip
                        title="Click to toggle"
                        arrow
                        size="sm"
                        variant="solid"
                        placement="right">
                        <Chip
                            color={user.is_active ? 'success' : 'danger'}
                            variant="soft"
                            onClick={() => handleStatus(user.id)}
                            startDecorator={
                                user.is_active ? (
                                    <CheckRounded fontSize="small" />
                                ) : (
                                    <BlockOutlined fontSize="small" />
                                )
                            }>
                            {user.is_active ? 'Active' : 'Inactive'}
                        </Chip>
                    </Tooltip>
                )
            },
        },
        {
            header: 'Actions',
            content: (user: IUser) => {
                return (
                    <div>
                        <Tooltip title="Edit">
                            <IconButton
                                type="primary"
                                color="primary"
                                onClick={() =>
                                    router.push(`/users/details/${user.id}`)
                                }>
                                <EditIcon />
                            </IconButton>
                        </Tooltip>

                        {/* Delete Icon Button */}
                        <Tooltip title="Delete">
                            <IconButton
                                type="danger"
                                color="danger"
                                onClick={() => handleDelete(user.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                )
            },
        },
    ]
    return (
        <DashboardLayout
            head="User"
            breadcrumbs={breadcrumbs}
            title="Users"
            secondary={
                <>
                    {(roles.includes('SystemAdmin') ||
                        permissions.includes('add-user')) && (
                        <Button
                            // variant="outlined"
                            className="custom-button"
                            startDecorator={<Add />}
                            onClick={() => router.push('/users/register')}>
                            Add User
                        </Button>
                    )}
                </>
            }
            snackbar={snackbar}
            snackbarClose={() => setSnackbar({ open: false, message: '' })}>
            {/* <TableSortAndSelection /> */}
            <>
                <Grid container spacing={1}>
                    <Grid xs={12}>
                        <Grid container spacing={2} width="100%">
                            <Grid xs={4}>
                                <FormControl size="sm">
                                    <FormLabel>Search for users</FormLabel>
                                    <Input
                                        size="sm"
                                        placeholder="Search"
                                        value={search}
                                        onChange={e =>
                                            setSearch(e.target.value)
                                        }
                                        startDecorator={<SearchIcon />}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid xs={12} md={4}>
                                <FormControl sx={{ flex: 1 }} size="sm">
                                    <FormLabel>Users Type</FormLabel>
                                    <Select
                                        value={adminType}
                                        name="admin_type"
                                        onChange={(e, value) =>
                                            setAdminType(value)
                                        }
                                        sx={{ width: '100%' }}>
                                        <Option value="">All users</Option>
                                        <Option value="global">
                                            Global Admin
                                        </Option>
                                        <Option value="country">
                                            Country Admin
                                        </Option>
                                        <Option value="network">
                                            Network Manager
                                        </Option>
                                        <Option value="farmer">
                                            Farmer Hub
                                        </Option>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid xs={12}>
                        <BasicDataTable
                            loading={loading}
                            columns={columns}
                            rows={users}
                            count={total}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            showSL={true}
                            setPage={(value: number) => setPage(value)}
                            setRowsPerPage={(value: number) =>
                                setRowsPerPage(value)
                            }
                            serverSide={true}
                        />
                    </Grid>
                </Grid>
            </>
        </DashboardLayout>
    )
}
