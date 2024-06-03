'use client'

import { useGetUsersQuery } from '@/modules/UserManager/Store/UserManagerApiSlice'
import Dump from '@/components/Dump'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
    setAuthUserAuthorizationData,
    setAuthUserData,
} from '@/modules/UserManager/Store/UserManagerSlice'

export default function TableUsersList() {
    const dispatch = useDispatch()

    const {
        data: usersListData,
        isLoading: userListIsLoading,
        isFetching: userListIsFetching,
        isError: userListIsError,
        error: userListFetchError,
        isSuccess: userListFetchSuccess,
    } = useGetUsersQuery()

    useEffect(() => {
        if (usersListData?.length > 0) {
            const authUser = usersListData[0]
            const roles = ['SystemAdmin']
            const authorization = {
                roles: roles,
                permissions: ['GGWP'],
            }

            dispatch(
                setAuthUserData({
                    authUser,
                }),
            )
            dispatch(
                setAuthUserAuthorizationData({
                    authorization,
                }),
            )
        }
    }, [usersListData])

    return (
        <>
            {/*<Dump data={{*/}
            {/*    userListIsLoading,*/}
            {/*    userListIsFetching,*/}
            {/*    userListIsError,*/}
            {/*    userListFetchError,*/}
            {/*    userListFetchSuccess,*/}
            {/*    usersListData*/}
            {/*}} />*/}

            {userListIsLoading || (userListIsFetching && <div>Loading</div>)}

            {!userListIsLoading && userListIsError && (
                <Dump data={userListFetchError} />
            )}

            {!userListIsLoading &&
                !userListIsError &&
                !usersListData?.length && <div>Not Data</div>}

            {!userListIsLoading &&
                !userListIsError &&
                usersListData?.length > 0 && (
                    <div>
                        <Dump data={usersListData} />
                    </div>
                )}
        </>
    )
}
