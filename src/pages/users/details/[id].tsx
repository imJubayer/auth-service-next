// joy-ui
import { Grid } from '@mui/joy'
import axios from '@/lib/axios'
import { Breadcrumb, IRole, IUser, SnackBarType } from '@/types/common'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import DashboardLayout from '@/components/Layouts/DashboardLayout'
import BusinessAccounts from './BusinessAccount'
import UserEditForm from '@/components/User/EditForm'

const breadcrumbs: Breadcrumb[] = [
    { label: 'Users', link: '/users' },
    { label: 'Edit User', link: '#', isLast: true },
]

export default function UserDetails() {
    const [user, setUser] = useState<IUser>()
    const [roles, setRoles] = useState<IRole[]>([])
    const [updateUser, setUpdateUser] = useState(false)
    const [snackbar, setSnackbar] = useState<SnackBarType>({
        open: false,
        message: '',
    })
    const router = useRouter()
    const { id } = router.query

    const getUser = async () => {
        try {
            await axios.get(`/api/users/${id}`).then(response => {
                if (response.data.success) {
                    response.data.data.roles.forEach(role => {
                        delete role.pivot
                    })
                    setUser(response.data.data)
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
    const getRoles = async () => {
        await axios
            .get(`/api/roles`)
            .then((response: any) => {
                if (response.data.success) {
                    setRoles(response.data.data)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        id && getUser()
    }, [id, updateUser])

    useEffect(() => {
        getRoles()
    }, [])

    return (
        <DashboardLayout
            head="User"
            breadcrumbs={breadcrumbs}
            snackbar={snackbar}
            snackbarClose={() => setSnackbar({ open: false, message: '' })}
            title="Edit User">
            <UserEditForm user={user} roles={roles} />
            <Grid container>
                <Grid>
                    <BusinessAccounts
                        userId={user?.id}
                        businessAccounts={user?.business_accounts || []}
                        updateUser={updateUser}
                        setUpdateUser={(value: boolean) => setUpdateUser(value)}
                    />
                </Grid>
            </Grid>
        </DashboardLayout>
    )
}
