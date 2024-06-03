import useSWR from 'swr'
import axios from '@/lib/axios'
import { useCallback } from 'react'

export const useAuthorization = () => {
    // Fetch roles from the server
    const { data: roles, mutate: mutateRoles } = useSWR('/api/roles', url =>
        axios.get(url).then(res => res.data),
    )

    // Fetch permissions from the server
    const {
        data: permissions,
        mutate: mutatePermissions,
    } = useSWR('/api/permissions', url => axios.get(url).then(res => res.data))

    // Add a role
    const addRole = useCallback(
        async role => {
            const response = await axios.post('/api/roles', role)
            mutateRoles()
            return response.data
        },
        [mutateRoles],
    )

    // Add a permission
    const addPermission = useCallback(
        async permission => {
            const response = await axios.post('/api/permissions', permission)
            mutatePermissions()
            return response.data
        },
        [mutatePermissions],
    )

    // Assign a role to a user
    const assignRoleToUser = useCallback(async ({ userId, roleId }) => {
        const response = await axios.post('/api/assign-role', {
            userId,
            roleId,
        })
        // handle response and errors appropriately
        return response.data
    }, [])

    // Assign a permission to a role
    const assignPermissionToRole = useCallback(
        async ({ roleId, permissionId }) => {
            const response = await axios.post('/api/assign-permission', {
                roleId,
                permissionId,
            })
            // handle response and errors appropriately
            return response.data
        },
        [],
    )

    return {
        roles,
        permissions,
        addRole,
        addPermission,
        assignRoleToUser,
        assignPermissionToRole,
    }
}
