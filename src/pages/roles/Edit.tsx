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
} from '@mui/joy'
import FadeModalDialog from '@/components/Common/Modal'
import { InfoOutlined } from '@mui/icons-material'
import { IRole } from '@/types/common'
import toast from 'react-hot-toast'

type editRolesPropsType = {
    role: IRole
    editRoleModalOpen: boolean
    setEditRoleModalOpen: (value: boolean) => void
    updateRole: boolean
    setUpdateRole: (value: boolean) => void
}
const EditRole = ({
    role,
    editRoleModalOpen,
    setEditRoleModalOpen,
    setUpdateRole,
    updateRole,
}: editRolesPropsType) => {
    // const scriptedRef = useScriptRef();
    // const matchDownSM = useMediaQuery(theme.breakpoints.down('md'))

    const content = (
        <Formik
            initialValues={{
                name: role?.name,
                submit: null,
            }}
            validationSchema={Yup.object().shape({
                name: Yup.string().required('Role name is required'),
            })}
            onSubmit={async (
                values,
                { setErrors, setStatus, setSubmitting, resetForm },
            ) => {
                try {
                    await axios
                        .patch(`api/roles/${role.id}`, values)
                        .then(response => {
                            if (response.data.success === true) {
                                toast.success(response.data.msg)
                                resetForm()
                                setSubmitting(false)
                                setEditRoleModalOpen(false)
                                setUpdateRole(!updateRole)
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
            title="Edit Role"
            content={content}
            open={editRoleModalOpen}
            setOpen={(value: boolean) => setEditRoleModalOpen(value)}
        />
    )
}

export default EditRole
