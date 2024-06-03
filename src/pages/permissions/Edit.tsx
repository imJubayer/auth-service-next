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
    Autocomplete,
} from '@mui/joy'
import FadeModalDialog from '@/components/Common/Modal'
import { InfoOutlined } from '@mui/icons-material'
import toast from 'react-hot-toast'
import { IPermission, IRole } from '@/types/common'

type editPermissionPropsType = {
    editPermissionModalOpen: boolean
    setEditPermissionModalOpen: (value: boolean) => void
    updatePermission: boolean
    setUpdatePermission: (value: boolean) => void
    permissionData: IPermission
    roles: IRole[]
}
const EditPermission = ({
    editPermissionModalOpen,
    setEditPermissionModalOpen,
    updatePermission,
    setUpdatePermission,
    permissionData,
    roles,
}: editPermissionPropsType) => {
    // const scriptedRef = useScriptRef();
    // const matchDownSM = useMediaQuery(theme.breakpoints.down('md'))

    const content = (
        <Formik
            initialValues={{
                name: permissionData?.name,
                roles: permissionData?.roles || [],
                submit: null,
            }}
            enableReinitialize
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
                        .patch(
                            `api/permissions/${permissionData.id}`,
                            transformedValues,
                        )
                        .then(response => {
                            if (response.data.success === true) {
                                toast.success(response.data.msg)
                                resetForm()
                                setSubmitting(false)
                                setEditPermissionModalOpen(false)
                                setUpdatePermission(!updatePermission)
                            } else {
                                toast.error(response.data.msg)
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
                                options={
                                    roles
                                        ? roles.filter(
                                              role =>
                                                  !values.roles.some(
                                                      selectedRole =>
                                                          selectedRole.id ===
                                                          role.id,
                                                  ),
                                          )
                                        : []
                                }
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
            title="Edit Permission"
            content={content}
            open={editPermissionModalOpen}
            setOpen={(value: boolean) => setEditPermissionModalOpen(value)}
            size="md"
        />
    )
}

export default EditPermission
