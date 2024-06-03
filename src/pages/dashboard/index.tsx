import DashboardLayout from '@/components/Layouts/DashboardLayout'
import Typography from '@mui/joy/Typography'
import * as React from 'react'
import { Breadcrumb } from '@/types/common'
import RevenueCard from '@/components/ui-component/DashboardCard1'
import MonetizationOnTwoToneIcon from '@mui/icons-material/MonetizationOnTwoTone'
import { Grid } from '@mui/material'

const breadcrumbs: Breadcrumb[] = [
    { label: 'Dashboard', link: '#some-link', isLast: true },
]

export default function DashboardIndex() {
    return (
        <DashboardLayout breadcrumbs={breadcrumbs} title="Dashboard">
            <Grid
                container
                justifyContent="center"
                alignItems="center"
                spacing={4}>
                <Grid item xs={4}>
                    <RevenueCard
                        primary="Deposit"
                        secondary={`৳2`}
                        content={`৳2 last month`}
                        iconPrimary={MonetizationOnTwoToneIcon}
                        color="#673ab7"
                    />
                </Grid>
                <Grid item xs={4}>
                    <RevenueCard
                        primary="Deposit"
                        secondary={`৳2`}
                        content={`৳2 last month`}
                        iconPrimary={MonetizationOnTwoToneIcon}
                        color="#1e88e5"
                    />
                </Grid>
                <Grid item xs={4}>
                    <RevenueCard
                        primary="Deposit"
                        secondary={`৳2`}
                        content={`৳2 last month`}
                        iconPrimary={MonetizationOnTwoToneIcon}
                        color="#d84315"
                    />
                </Grid>
            </Grid>
        </DashboardLayout>
    )
}

//
// const DashboardIndex = () => {
//     return (
//         <AppLayout
//             header={
//                 <h2 className="font-semibold text-xl text-gray-800 leading-tight">
//                     Dashboard
//                 </h2>
//             }>
//             <Head>
//                 <title>Laravel - Dashboard</title>
//             </Head>
//
//             <div className="py-12">
//                 <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
//                     <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
//                         <div className="p-6 bg-white border-b border-gray-200">
//                             You're logged in!
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </AppLayout>
//     )
// }
