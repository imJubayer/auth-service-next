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
    Select,
    Stack,
    Option,
    Switch,
} from '@mui/joy'
import FadeModalDialog from '@/components/Common/Modal'
import { InfoOutlined } from '@mui/icons-material'
import toast from 'react-hot-toast'

type addRolesPropsType = {
    addServiceModalOpen: boolean
    setAddServiceModalOpen: (value: boolean) => void
    updateService: boolean
    setUpdateService: (value: boolean) => void
}
const AddService = ({
    addServiceModalOpen,
    setAddServiceModalOpen,
    setUpdateService,
    updateService,
}: addRolesPropsType) => {
    // const scriptedRef = useScriptRef();
    // const matchDownSM = useMediaQuery(theme.breakpoints.down('md'))

    const content = (
        <Formik
            initialValues={{
                service_name: '',
                service_description: '',
                homepage_url: '',
                callback_url: '',
                webhook_url: '',
                is_active: 1,
                is_active_1: true,
                submit: null,
            }}
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
                        .post(`api/services`, values)
                        .then(response => {
                            if (response.data.success === true) {
                                toast.success(response.data.msg)
                                resetForm()
                                setSubmitting(false)
                                setAddServiceModalOpen(false)
                                setUpdateService(!updateService)
                            } else {
                            }
                        })
                        .catch(error => {
                            toast.error(error.response.data.msg)
                        })
                } catch (err: any) {
                    // dispatch({
                    //     type: SNACKBAR_OPEN,
                    //     open: true,
                    //     message: err.response.data.response,
                    //     variant: 'alert',
                    //     alertSeverity: 'error',
                    // })
                }
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
                        <FormControl
                            error={Boolean(
                                touched.service_name && errors.service_name,
                            )}>
                            <FormLabel>Service Name</FormLabel>
                            <Input
                                variant="outlined"
                                color={
                                    touched.service_name && errors.service_name
                                        ? 'danger'
                                        : 'primary'
                                }
                                autoFocus
                                required
                                size="sm"
                                type="text"
                                name="service_name"
                                placeholder="Service Name"
                                value={values.service_name}
                                onChange={handleChange}
                            />
                            {touched.service_name && errors.service_name && (
                                <FormHelperText>
                                    <InfoOutlined />
                                    {errors.service_name}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl
                            error={Boolean(
                                touched.service_description &&
                                    errors.service_description,
                            )}>
                            <FormLabel>Service description</FormLabel>
                            <Input
                                variant="outlined"
                                color={
                                    touched.service_description &&
                                    errors.service_description
                                        ? 'danger'
                                        : 'primary'
                                }
                                required
                                size="sm"
                                type="text"
                                name="service_description"
                                placeholder="Service Description"
                                value={values.service_description}
                                onChange={handleChange}
                            />
                            {touched.service_description &&
                                errors.service_description && (
                                    <FormHelperText>
                                        <InfoOutlined />
                                        {errors.service_description}
                                    </FormHelperText>
                                )}
                        </FormControl>
                        <FormControl
                            error={Boolean(
                                touched.homepage_url && errors.homepage_url,
                            )}>
                            <FormLabel>Homepage URL</FormLabel>
                            <Input
                                variant="outlined"
                                color={
                                    touched.homepage_url && errors.homepage_url
                                        ? 'danger'
                                        : 'primary'
                                }
                                required
                                size="sm"
                                type="url"
                                name="homepage_url"
                                placeholder="Homepage URL"
                                value={values.homepage_url}
                                onChange={handleChange}
                            />
                            {touched.homepage_url && errors.homepage_url && (
                                <FormHelperText>
                                    <InfoOutlined />
                                    {errors.homepage_url}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl
                            error={Boolean(
                                touched.callback_url && errors.callback_url,
                            )}>
                            <FormLabel>Callback URL</FormLabel>
                            <Input
                                variant="outlined"
                                color={
                                    touched.callback_url && errors.callback_url
                                        ? 'danger'
                                        : 'primary'
                                }
                                required
                                size="sm"
                                type="url"
                                name="callback_url"
                                placeholder="Callback URL"
                                value={values.callback_url}
                                onChange={handleChange}
                            />
                            {touched.callback_url && errors.callback_url && (
                                <FormHelperText>
                                    <InfoOutlined />
                                    {errors.callback_url}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl
                            error={Boolean(
                                touched.webhook_url && errors.webhook_url,
                            )}>
                            <FormLabel>Webhook URL</FormLabel>
                            <Input
                                variant="outlined"
                                color={
                                    touched.webhook_url && errors.webhook_url
                                        ? 'danger'
                                        : 'primary'
                                }
                                required
                                size="sm"
                                type="url"
                                name="webhook_url"
                                placeholder="Webhook URL"
                                value={values.webhook_url}
                                onChange={handleChange}
                            />
                            {touched.webhook_url && errors.webhook_url && (
                                <FormHelperText>
                                    <InfoOutlined />
                                    {errors.webhook_url}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl>
                            <FormLabel>Active Status</FormLabel>
                            <Select
                                variant="outlined"
                                color={errors.is_active ? 'danger' : 'primary'}
                                value={values.is_active}
                                name="is_active"
                                onChange={(e, value) =>
                                    setFieldValue('is_active', value)
                                }>
                                <Option value={1}>Active</Option>
                                <Option value={0}>Inactive</Option>
                            </Select>
                        </FormControl>
                        <Button type="submit" size="sm" variant="solid">
                            Submit
                        </Button>
                    </Stack>
                </form>
            )}
        </Formik>
    )
    return (
        <FadeModalDialog
            title="Add Service"
            content={content}
            open={addServiceModalOpen}
            setOpen={(value: boolean) => setAddServiceModalOpen(value)}
            size="md"
        />
    )
}

export default AddService
