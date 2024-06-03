// third party
import * as Yup from 'yup'
import { Formik } from 'formik'

// material-ui
import axios from '@/lib/axios'
import {
    Box,
    Button,
    Chip,
    FormControl,
    FormHelperText,
    FormLabel,
    Input,
    Select,
    Stack,
    Option,
    Autocomplete,
} from '@mui/joy'
import FadeModalDialog from '@/components/Common/Modal'
import { InfoOutlined } from '@mui/icons-material'
import toast from 'react-hot-toast'
import { IRole } from '@/types/common'

type addPermissionPropsType = {
    addPermissionModalOpen: boolean
    setAddPermissionModalOpen: (value: boolean) => void
    updatePermission: boolean
    setUpdatePermission: (value: boolean) => void
    roles: IRole[]
}
const AddPermission = ({
    addPermissionModalOpen,
    setAddPermissionModalOpen,
    updatePermission,
    setUpdatePermission,
    roles,
}: addPermissionPropsType) => {
    // const scriptedRef = useScriptRef();
    // const matchDownSM = useMediaQuery(theme.breakpoints.down('md'))

    const content = (
        <Formik
            initialValues={{
                name: '',
                roles: [],
                submit: null,
            }}
            validationSchema={Yup.object().shape({
                name: Yup.string().required('Permission name is required'),
            })}
            onSubmit={async (
                values,
                { setErrors, setStatus, setSubmitting, resetForm },
            ) => {
                const transformedValues = {
                    name: values.name,
                    role_ids: values.roles.map(role => role.id.toString()),
                }
                try {
                    await axios
                        .post(`api/permissions`, transformedValues)
                        .then(response => {
                            if (response.data.success === true) {
                                toast.success(response.data.msg)
                                resetForm()
                                setSubmitting(false)
                                setAddPermissionModalOpen(false)
                                setUpdatePermission(!updatePermission)
                            } else {
                            }
                        })
                        .catch(error => {
                            toast.error(error.response.data.msg)
                        })
                } catch (err: any) {
                    toast.error(err.response.data.msg)
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
                        <FormControl error={Boolean(errors.name)}>
                            <FormLabel>Name</FormLabel>
                            <Input
                                autoFocus
                                required
                                size="sm"
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={values.name}
                                onChange={handleChange}
                            />
                            {errors.name && (
                                <FormHelperText>
                                    <InfoOutlined />
                                    {errors.name}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl>
                            <FormLabel>Roles</FormLabel>
                            <Autocomplete
                                multiple
                                options={roles?.length ? roles : []}
                                placeholder="Select roles"
                                value={values.roles}
                                getOptionLabel={(role: IRole) => role.name}
                                onChange={(e, value) =>
                                    setFieldValue('roles', value)
                                }
                            />
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
            title="Add Permission"
            content={content}
            open={addPermissionModalOpen}
            setOpen={(value: boolean) => setAddPermissionModalOpen(value)}
            size="md"
        />
    )
}

export default AddPermission
