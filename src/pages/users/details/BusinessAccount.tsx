import FadeModalDialog from '@/components/Common/Modal'
import BasicDataTable from '@/components/Table/BasicDatatable'
import { IBusinessAccount, IUser } from '@/types/common'
import { InfoOutlined, Add, Edit, Delete } from '@mui/icons-material'
import {
    Button,
    Card,
    Divider,
    Grid,
    IconButton,
    Tooltip,
    Typography,
} from '@mui/joy'
import router from 'next/router'
import { useState } from 'react'
import BusinessAccount from './Account'
import { showConfirmationAlert } from '@/utils/helper'
import axios from '@/lib/axios'
import toast from 'react-hot-toast'

type businessAccountProps = {
    userId: number
    businessAccounts: Array<IBusinessAccount>
    updateUser: boolean
    setUpdateUser: (value: boolean) => void
}
export default function BusinessAccounts({
    userId,
    businessAccounts,
    updateUser,
    setUpdateUser,
}: businessAccountProps) {
    const [addModalOpen, setAddModalOpen] = useState(false)
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [
        selectedBusinessAccount,
        setSelectedBusinessAccount,
    ] = useState<IBusinessAccount>()

    const handleDelete = async (id: number) => {
        const isDeletionConfirmed = await showConfirmationAlert(
            'Are you sure?',
            'Delete this account?',
            'Yes, delete!',
            'Cancel',
        )
        if (isDeletionConfirmed) {
            try {
                await axios
                    .delete(`/api/users/business-accounts/${id}`)
                    .then(response => {
                        if (response.data.success) {
                            toast.success(response.data.msg)
                            setUpdateUser(!updateUser)
                        } else {
                            toast.success(response.data.msg)
                        }
                    })
            } catch (error) {
                toast.error(error.response.data.msg)
            }
        }
        setUpdateUser(!updateUser)
    }

    const businessAccountColumns: any[] = [
        { header: 'Firstname', accessor: 'first_name' },
        { header: 'Lastname', accessor: 'last_name' },
        { header: 'Email', accessor: 'email' },
        { header: 'Phone', accessor: 'phone' },
        // { header: 'Address', accessor: 'address' },
        // { header: 'Latitude', accessor: 'latitude' },
        // { header: 'Longitude', accessor: 'longitude' },
        {
            header: 'Actions',
            content: (businessAccount: IBusinessAccount) => {
                return (
                    <div>
                        <Tooltip title="Edit">
                            <IconButton
                                type="primary"
                                color="primary"
                                onClick={() => {
                                    setSelectedBusinessAccount(businessAccount)
                                    setEditModalOpen(true)
                                }}>
                                <Edit />
                            </IconButton>
                        </Tooltip>

                        {/* Delete Icon Button */}
                        <Tooltip title="Delete">
                            <IconButton
                                type="danger"
                                color="danger"
                                onClick={() =>
                                    handleDelete(businessAccount.id)
                                }>
                                <Delete />
                            </IconButton>
                        </Tooltip>
                    </div>
                )
            },
        },
    ]
    return (
        <Card>
            <Grid container justifyContent="space-between" marginTop={1}>
                <Grid>
                    <Typography level="h4" startDecorator={<InfoOutlined />}>
                        Business Accounts
                    </Typography>
                </Grid>
                <Grid>
                    <Button
                        startDecorator={<Add />}
                        onClick={() => setAddModalOpen(true)}>
                        Add Account
                    </Button>
                </Grid>
            </Grid>
            <Divider inset="none" />
            <BasicDataTable
                columns={businessAccountColumns}
                rows={businessAccounts?.length ? businessAccounts : []}
                count={businessAccounts?.length || 0}
                page={page}
                rowsPerPage={rowsPerPage}
                showSL={true}
                setPage={setPage}
                setRowsPerPage={setRowsPerPage}
            />
            <FadeModalDialog
                title="Add Business Account"
                open={addModalOpen}
                setOpen={(value: boolean) => setAddModalOpen(value)}
                size="md"
                content={
                    <BusinessAccount
                        userId={userId}
                        submitType="add"
                        updateUser={updateUser}
                        setUpdateUser={(value: boolean) => {
                            setUpdateUser(value)
                            setAddModalOpen(false)
                        }}
                    />
                }
            />
            <FadeModalDialog
                title="Edit Business Account"
                open={editModalOpen}
                setOpen={(value: boolean) => setEditModalOpen(value)}
                size="md"
                content={
                    <BusinessAccount
                        userId={userId}
                        submitType="edit"
                        businessAccount={selectedBusinessAccount}
                        updateUser={updateUser}
                        setUpdateUser={(value: boolean) => {
                            setUpdateUser(value)
                            setEditModalOpen(false)
                        }}
                    />
                }
            />
        </Card>
    )
}
