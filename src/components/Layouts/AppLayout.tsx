import { PropsWithChildren, ReactNode, useState } from 'react'
import Navigation from '@/components/Layouts/Navigation'
import { useAuth } from '@/hooks/auth'
import { SnackBarType } from '@/types/common'
import { Snackbar, Alert } from '@mui/material'
import CustomizedSnackbars from '../Basic/Snackbar'
interface Props {
    header?: ReactNode
    snackbar?: SnackBarType
    snackbarClose?: () => void
}

const AppLayout = ({
    header,
    children,
    snackbar,
    snackbarClose,
}: PropsWithChildren<Props>) => {
    const { user, systemAdmin } = useAuth({ middleware: 'auth' })

    return (
        <div className="min-h-screen bg-gray-100">
            <Navigation user={user} isSystemAdmin={systemAdmin} />

            {/* Page Heading */}
            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            {/* Page Content */}
            <main>{children}</main>
            {snackbar?.open && (
                <CustomizedSnackbars
                    open={snackbar.open}
                    setOpen={snackbarClose}
                    msg={snackbar.message}
                    type={snackbar.alert}
                />
                // <Snackbar
                //     open={snackbar.open}
                //     autoHideDuration={3000}
                //     onClose={snackbarClose}>
                //     <Alert
                //         onClose={snackbarClose}
                //         severity={snackbar.alert || 'error'}
                //         sx={{ width: '100%' }}>
                //         {snackbar.message || 'An Error Occured'}
                //     </Alert>
                // </Snackbar>
            )}
        </div>
    )
}

export default AppLayout
