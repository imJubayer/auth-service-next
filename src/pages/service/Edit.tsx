// third party
import * as Yup from 'yup'
import { Formik } from 'formik'

// material-ui
import axios from '@/lib/axios'
import {
    Button,
    FormControl,
    FormHelperText,
    FormLabel,
    Input,
    Stack,
    Select,
    Option,
} from '@mui/joy'
import FadeModalDialog from '@/components/Common/Modal'
import { InfoOutlined } from '@mui/icons-material'
import { IService } from '@/types/common'
import toast from 'react-hot-toast'

type editServicePropsType = {
    service: IService
    editServiceModalOpen: boolean
    setEditServiceModalOpen: (value: boolean) => void
    updateService: boolean
    setUpdateService: (value: boolean) => void
}
const EditService = ({
    service,
    editServiceModalOpen,
    setEditServiceModalOpen,
    setUpdateService,
    updateService,
}: editServicePropsType) => {
    const content = (
        <Formik
            initialValues={{
                service_name: service?.service_name || '',
                service_description: service?.service_description || '',
                homepage_url: service?.homepage_url || '',
                callback_url: service?.callback_url || '',
                webhook_url: service?.webhook_url || '',
                is_active: service?.is_active,
                submit: null,
            }}
            enableReinitialize
            validationSchema={Yup.object().shape({
                service_name: Yup.string().required('Service name is required'),
                service_description: Yup.string().required(
                    'Service description is required',
                ),
                homepage_url: Yup.string()
                    .url('Homepage URL must be a valid URL')
                    .required('Homepage URL is required'),
                callback_url: Yup.string()
                    .url('Callback URL must be a valid URL')
                    .required('Callback URL is required'),
                webhook_url: Yup.string()
                    .url('Webhook URL must be a valid URL')
                    .required('Webhook URL is required'),
            })}
            onSubmit={async (
                values,
                { setErrors, setStatus, setSubmitting, resetForm },
            ) => {
                try {
                    await axios
                        .patch(`api/services/${service.id}`, values)
                        .then(response => {
                            if (response.data.success === true) {
                                toast.success(response.data.msg)
                                // resetForm()
                                setSubmitting(false)
                                setEditServiceModalOpen(false)
                                setUpdateService(!updateService)
                            } else {
                            }
                        })
                        .catch(error => {
                            toast.error(error.response.data.msg)
                        })
                } catch (err: any) {}
            }}>
            {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                isSubmitting,
                touched,
                values,
                resetForm,
            }) => (
                <form noValidate onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <FormControl error={Boolean(errors.service_name)}>
                            <FormLabel>Service Name</FormLabel>
                            <Input
                                autoFocus
                                required
                                size="sm"
                                type="text"
                                name="service_name"
                                placeholder="Service Name"
                                value={values.service_name}
                                onChange={handleChange}
                            />
                            {errors.service_name && (
                                <FormHelperText>
                                    <InfoOutlined />
                                    {errors.service_name}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl
                            error={Boolean(errors.service_description)}>
                            <FormLabel>Service description</FormLabel>
                            <Input
                                required
                                size="sm"
                                type="text"
                                name="service_description"
                                placeholder="Service Description"
                                value={values.service_description}
                                onChange={handleChange}
                            />
                            {errors.service_description && (
                                <FormHelperText>
                                    <InfoOutlined />
                                    {errors.service_description}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl error={Boolean(errors.homepage_url)}>
                            <FormLabel>Homepage URL</FormLabel>
                            <Input
                                required
                                size="sm"
                                type="url"
                                name="homepage_url"
                                placeholder="Homepage URL"
                                value={values.homepage_url}
                                onChange={handleChange}
                            />
                            {errors.homepage_url && (
                                <FormHelperText>
                                    <InfoOutlined />
                                    {errors.homepage_url}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl error={Boolean(errors.callback_url)}>
                            <FormLabel>Callback URL</FormLabel>
                            <Input
                                required
                                size="sm"
                                type="url"
                                name="callback_url"
                                placeholder="Callback URL"
                                value={values.callback_url}
                                onChange={handleChange}
                            />
                            {errors.callback_url && (
                                <FormHelperText>
                                    <InfoOutlined />
                                    {errors.callback_url}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl error={Boolean(errors.webhook_url)}>
                            <FormLabel>Webhook URL</FormLabel>
                            <Input
                                required
                                size="sm"
                                type="url"
                                name="webhook_url"
                                placeholder="Webhook URL"
                                value={values.webhook_url}
                                onChange={handleChange}
                            />
                            {errors.webhook_url && (
                                <FormHelperText>
                                    <InfoOutlined />
                                    {errors.webhook_url}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl>
                            <FormLabel>Active Status</FormLabel>
                            <Select
                                value={values.is_active}
                                name="is_active"
                                onChange={(e, value) =>
                                    setFieldValue('is_active', value)
                                }>
                                <Option value={1}>Active</Option>
                                <Option value={0}>Inactive</Option>
                            </Select>
                        </FormControl>
                        <Button type="submit" variant="solid">
                            Update
                        </Button>
                    </Stack>
                </form>
            )}
        </Formik>
    )
    return (
        <FadeModalDialog
            title="Edit Service"
            content={content}
            open={editServiceModalOpen}
            setOpen={(value: boolean) => setEditServiceModalOpen(value)}
            size="md"
        />
    )
}

export default EditService
