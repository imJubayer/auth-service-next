import useSWR from 'swr'
import axios, { csrf } from '@/lib/axios'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { hasRole } from '@/utils/helper'
import { setAuthUserAuthorizationData } from '@/modules/UserManager/Store/UserManagerSlice'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'

declare type AuthMiddleware = 'auth' | 'guest'

interface IUseAuth {
    middleware: AuthMiddleware
    redirectIfAuthenticated?: string
}

export interface User {
    id?: number
    name?: string
    email?: string
    email_verified_at?: string
    must_verify_email?: boolean // this is custom attribute
    created_at?: string
    updated_at?: string
}

export const useAuth = ({ middleware, redirectIfAuthenticated }: IUseAuth) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const [systemAdmin, setSystemAdmin] = useState(false)
    const roles: string[] = useSelector(
        (state: any) => state.userManagerSlice.authorization.roles,
    )

    const { data: user, error, mutate } = useSWR('/api/user', () =>
        axios
            .get('/api/profile')
            .then(res => {
                if (res.data.success) {
                    !roles.length && handleAclAccess()
                    return res.data.data
                } else {
                    // logout()
                    router.push('/login')
                }
            })
            .catch(error => {
                router.push('/login')
                // router.pathname !== '/' && router.push('/login')
                // if (error.response.status !== 409) throw error
                // router.push('/verify-email')
            }),
    )

    // const csrf = () => axios.get('/sanctum/csrf-cookie')

    const register = async ({ setErrors, setLoading, ...props }) => {
        setLoading(true)
        await csrf()

        setErrors([])

        axios
            .post('/register', props)
            .then(() => {
                mutate()
                setLoading(false)
                router.push('/login')
            })
            .catch(error => {
                setErrors({ msg: error.response.data.msg })
                setLoading(false)
                // if (error.response.status !== 422) throw error

                // setErrors(error.response.data.errors)
            })
    }

    const login = async ({ setErrors, setStatus, setLoading, ...props }) => {
        setLoading(true)

        // Check if JWT_TOKEN cookie exists
        const existingToken = getCookie('JWT_TOKEN')

        if (existingToken) {
            // Remove the existing JWT_TOKEN cookie
            document.cookie =
                'JWT_TOKEN=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
        }

        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('api/auth/token', props)
            .then(response => {
                if (response.data.success) {
                    document.cookie = `JWT_TOKEN=${response.data.data.token.access_token}`
                }
                setLoading(false)
                mutate()
            })
            .catch(error => {
                // if (error.response.status !== 422) throw error

                setErrors({ msg: error.response.data.msg })
                setLoading(false)
            })
    }

    const forgotPassword = async ({
        setErrors,
        setStatus,
        setLoading,
        email,
    }) => {
        setLoading(true)
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/forgot-password', { email })
            .then(response => {
                setStatus(response.data.status)
                setLoading(false)
            })
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors({ msg: error.response.data.msg })
                setLoading(false)
            })
    }

    const resetPassword = async ({
        setErrors,
        setStatus,
        setLoading,
        ...props
    }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/reset-password', { token: router.query.token, ...props })
            .then(response => {
                setLoading(false)
                setStatus(response.data.status)
                setTimeout(() => {
                    router.push('/login?reset=' + btoa(response.data.status))
                }, 2000)
            })
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors({ msg: error.response.data.msg })
                setLoading(false)
            })
    }

    const resendEmailVerification = ({ setStatus }) => {
        axios
            .post('/email/verification-notification')
            .then(response => setStatus(response.data.status))
    }

    const logout = async () => {
        if (!error) {
            try {
                await axios.post('/api/logout').then(() => mutate())
            } catch (error) {
                toast.error(error.response.data.msg)
            }
        }

        window.location.pathname = '/login'
    }

    useEffect(() => {
        if (middleware === 'auth' && redirectIfAuthenticated && user) {
            // if (hasRole(user, 'SystemAdmin')) {
            //     setSystemAdmin(true)
            // }
            router.push(redirectIfAuthenticated)
        }
        if (middleware === 'guest' && redirectIfAuthenticated && user) {
            router.push(redirectIfAuthenticated)
        }
        if (
            window.location.pathname === '/verify-email' &&
            user?.email_verified_at
        )
            router.push(redirectIfAuthenticated)
        if (middleware === 'auth' && error) logout()
        if (user && hasRole(user, 'SystemAdmin')) {
            setSystemAdmin(true)
        }
    }, [user, error])

    const handleAclAccess = async () => {
        axios
            .get('/api/acl-access')
            .then(res => {
                if (res.data.success) {
                    const roles = res.data.data.roles
                    const permissions = res.data.data.permissions
                    const authorization = {
                        roles: roles,
                        permissions: permissions,
                    }

                    dispatch(
                        setAuthUserAuthorizationData({
                            authorization,
                        }),
                    )
                } else {
                }
            })
            .catch(error => {
                router.pathname !== '/' && router.push('/login')
                // if (error.response.status !== 409) throw error

                // router.push('/verify-email')
            })
    }

    function getCookie(cname: string) {
        let name = cname + '='
        let decodedCookie = decodeURIComponent(document.cookie)
        let ca = decodedCookie.split(';')
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i]
            while (c.charAt(0) == ' ') {
                c = c.substring(1)
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length)
            }
        }
        return ''
    }

    return {
        user,
        systemAdmin,
        register,
        login,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        logout,
    }
}
