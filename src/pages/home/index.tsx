import DashboardLayout from '@/components/Layouts/DashboardLayout'
import { Breadcrumb } from '@/types/common'
import { Typography } from '@mui/joy'

const breadcrumbs: Breadcrumb[] = [
    { label: 'Home', link: '#some-link', isLast: true },
]

export default function Home() {
    return (
        <DashboardLayout head="Home" breadcrumbs={breadcrumbs} title="Home">
            <Typography level="h4">Welcome to SOLUTA-AG</Typography>
        </DashboardLayout>
    )
}
