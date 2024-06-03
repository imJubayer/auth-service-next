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
import toast from 'react-hot-toast'

type addRolesPropsType = {
    addRoleModalOpen: boolean
    setAddRoleModalOpen: (value: boolean) => void
    updateRole: boolean
    setUpdateRole: (value: boolean) => void
}
const AddRole = ({
    addRoleModalOpen,
    setAddRoleModalOpen,
    setUpdateRole,
    updateRole,
}: addRolesPropsType) => {
    // const scriptedRef = useScriptRef();
    // const matchDownSM = useMediaQuery(theme.breakpoints.down('md'))

    const content = (
        <Formik
            initialValues={{
                name: '',
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
                        .post(`api/roles`, values)
                        .then(response => {
                            if (response.data.success === true) {
                                toast.success(response.data.msg)
                                resetForm()
                                setSubmitting(false)
                                setAddRoleModalOpen(false)
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
                                autoFocus={true}
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
            title="Add Role"
            content={content}
            open={addRoleModalOpen}
            setOpen={(value: boolean) => setAddRoleModalOpen(value)}
            size="sm"
        />
    )
}

export default AddRole
