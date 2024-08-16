import { Chip, Table, Typography } from '@mui/joy'
import FadeModalDialog from '@/components/Common/Modal'
import { IService } from '@/types/common'

type serviceDetailsPropsType = {
    service: IService
    serviceDetailsModalOpen: boolean
    setServiceDetailsModalOpen: (value: boolean) => void
}
const ServiceDetails = ({
    service,
    serviceDetailsModalOpen,
    setServiceDetailsModalOpen,
}: serviceDetailsPropsType) => {
    const content = (
        <Table
            borderAxis="none"
            stripe="odd"
            hoverRow
            sx={{ textAlign: 'center' }}>
            <tbody style={{ wordWrap: 'break-word' }}>
                <tr>
                    <td>
                        <Typography
                            level="title-md"
                            sx={{ fontWeight: 'bold' }}>
                            Service Name
                        </Typography>
                    </td>
                    <td>:</td>
                    <td>
                        <Typography level="body-md">
                            {service.service_name}
                        </Typography>
                    </td>
                </tr>
                <tr>
                    <td>
                        <Typography
                            level="title-md"
                            sx={{ fontWeight: 'bold' }}>
                            Service Description
                        </Typography>
                    </td>
                    <td>:</td>
                    <td>
                        <Typography level="body-md">
                            {service.service_description}
                        </Typography>
                    </td>
                </tr>
                <tr>
                    <td>
                        <Typography
                            level="title-md"
                            sx={{ fontWeight: 'bold' }}>
                            Homepage URL
                        </Typography>
                    </td>
                    <td>:</td>
                    <td>
                        <Typography level="body-md">
                            {service.homepage_url}
                        </Typography>
                    </td>
                </tr>
                <tr>
                    <td>
                        <Typography
                            level="title-md"
                            sx={{ fontWeight: 'bold' }}>
                            Callback URL
                        </Typography>
                    </td>
                    <td>:</td>
                    <td>
                        <Typography level="body-md">
                            {service.callback_url}
                        </Typography>
                    </td>
                </tr>
                <tr>
                    <td>
                        <Typography
                            level="title-md"
                            sx={{ fontWeight: 'bold' }}>
                            Webhook URL
                        </Typography>
                    </td>
                    <td>:</td>
                    <td>
                        <Typography level="body-md">
                            {service.webhook_url}
                        </Typography>
                    </td>
                </tr>
                <tr>
                    <td>
                        <Typography
                            level="title-md"
                            sx={{ fontWeight: 'bold' }}>
                            Active Status
                        </Typography>
                    </td>
                    <td>:</td>
                    <td>
                        <Chip
                            color={service.is_active ? 'success' : 'danger'}
                            variant="soft">
                            {service.is_active ? 'Active' : 'Inactive'}
                        </Chip>
                    </td>
                </tr>
                <tr>
                    <td>
                        <Typography
                            level="title-md"
                            sx={{ fontWeight: 'bold' }}>
                            Health Status
                        </Typography>
                    </td>
                    <td>:</td>
                    <td>
                        <Chip
                            color={service.is_alive ? 'primary' : 'warning'}
                            variant="soft">
                            {service.is_alive ? 'Alive' : 'Not reachable'}
                        </Chip>
                    </td>
                </tr>
            </tbody>
        </Table>
    )
    return (
        <FadeModalDialog
            title="Service Details"
            content={content}
            open={serviceDetailsModalOpen}
            setOpen={(value: boolean) => setServiceDetailsModalOpen(value)}
            size="md"
        />
    )
}

export default ServiceDetails
