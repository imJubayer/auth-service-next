// joy-ui
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    Grid,
    Typography,
    Input,
    FormLabel,
    Card,
    CardActions,
    CardOverflow,
    Divider,
    Select,
    Option,
    Autocomplete,
    IconButton,
} from '@mui/joy'
import toast from 'react-hot-toast'
// third party
import * as Yup from 'yup'
import { Formik } from 'formik'
import { useEffect, useState } from 'react'
import {
    Breadcrumb,
    IBusinessAccount,
    IRole,
    ITeam,
    SnackBarType,
} from '@/types/common'
import axios from '@/lib/axios'
import { makeFormData } from '@/utils/helper'
import { useRouter } from 'next/router'
import DashboardLayout from '@/components/Layouts/DashboardLayout'
import InfoOutlined from '@mui/icons-material/InfoOutlined'
import { useAuth } from '@/hooks/auth'

const breadcrumbs: Breadcrumb[] = [
    { label: 'Users', link: '/users' },
    { label: 'Add New User', link: '#', isLast: true },
]

export default function register() {
    const router = useRouter()
    const [roles, setRoles] = useState<IRole[]>([])
    const [countries, setCountries] = useState<any[]>([])
    const [regions, setRegions] = useState<any[]>([])
    const [branches, setBranches] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const [teams, setTeams] = useState<ITeam[]>([])
    const { user } = useAuth({ middleware: 'auth' })
    const [regionDisable, setRegionDisable] = useState(true)
    const [branchDisable, setBranchDisable] = useState(true)

    const getRoles = async () => {
        await axios
            .get(`/api/roles`)
            .then((response: any) => {
                if (response.data.success) {
                    setRoles(response.data.data)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    const getCountries = async () => {
        await axios
            .get(`/api/countries`)
            .then((response: any) => {
                if (response.data.success) {
                    setCountries(response.data.data)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    const getRegions = async (countryId: string) => {
        if (countryId) {
            await axios
                .get(`/api/regions?country=${countryId}`)
                .then((response: any) => {
                    if (response.data.success) {
                        setRegions(response.data.data)
                        setRegionDisable(false)
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    const getBranches = async (regionId: string) => {
        if (regionId) {
            await axios
                .get(`/api/branches?region=${regionId}`)
                .then((response: any) => {
                    if (response.data.success) {
                        setBranches(response.data.data)
                        setBranchDisable(false)
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    const getTeams = async () => {
        await axios
            .get(`/api/teams`)
            .then((response: any) => {
                if (response.data.success) {
                    setTeams(response.data.data)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        getRoles()
        getCountries()
        getTeams()
    }, [])

    const [snackbar, setSnackbar] = useState<SnackBarType>({
        open: false,
        message: '',
    })
    return (
        <DashboardLayout
            head="Register"
            breadcrumbs={breadcrumbs}
            snackbar={snackbar}
            loading={loading}
            snackbarClose={() => setSnackbar({ open: false, message: '' })}
            title="Add User">
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    name: '',
                    // country: { name: '' },
                    country: '',
                    region: '',
                    branch: '',
                    // team_id: user?.current_team_id,
                    roles: [],
                    submit: null,
                }}
                validationSchema={Yup.object().shape({
                    name: Yup.string().max(255).required('Name is required'),
                    email: Yup.string()
                        .email('Must be a valid email')
                        .max(255)
                        .required('Email is required'),
                    password: Yup.string()
                        .max(255)
                        .required('Password is required'),
                    // country: Yup.object()
                    //     .shape({
                    //         name: Yup.string().required(
                    //             'Country name is required',
                    //         ),
                    //     })
                    //     .required('Country is required'),
                    country: Yup.string()
                        .max(255)
                        .required('Country is required'),
                })}
                onSubmit={async (values, { resetForm }) => {
                    setLoading(true)
                    const formDataArray = [
                        { key: 'name', value: values.name },
                        { key: 'email', value: values.email },
                        { key: 'password', value: values.password },
                        { key: 'country_id', value: values.country },
                        { key: 'region_id', value: values.region },
                        { key: 'branch_id', value: values.branch },
                        // { key: 'team_id', value: values.team_id },
                    ]
                    values.roles.forEach((role: IRole, index) => {
                        formDataArray.push({
                            key: `role_ids[${index}]`,
                            value: `${role.id}`,
                        })
                    })
                    try {
                        await axios
                            .post('/api/register', makeFormData(formDataArray))
                            .then(response => {
                                if (response.data.success) {
                                    setLoading(false)
                                    resetForm()
                                    toast.success(response.data.msg)
                                    // setSnackbar({
                                    //     open: true,
                                    //     message: response.data.msg,
                                    //     alert: 'success',
                                    // })
                                    setTimeout(() => {
                                        router.push('/users')
                                    }, 2000)
                                } else {
                                    setLoading(false)
                                    toast.error(response.data.msg)
                                }
                            })
                    } catch (error) {
                        if (error.response.data) {
                            setLoading(false)
                            toast.error(error.response.data.data)
                            // setSnackbar({
                            //     open: true,
                            //     message: error.response.data.data,
                            //     alert: 'danger',
                            // })
                        }
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
                }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container>
                            <Grid xs={12}>
                                <Card>
                                    <Box sx={{ mb: 1 }}>
                                        <Typography level="h4">
                                            Sign up with Email address
                                        </Typography>
                                    </Box>
                                    <Divider inset="none" />
                                    <Grid
                                        container
                                        justifyContent="flex-start"
                                        spacing={4}>
                                        <Grid xs={6}>
                                            <FormLabel
                                                sx={{
                                                    py: 1,
                                                    color:
                                                        touched.name &&
                                                        errors.name &&
                                                        '#c41c1c',
                                                }}>
                                                Name*
                                            </FormLabel>
                                            <FormControl
                                                error={Boolean(
                                                    touched.name && errors.name,
                                                )}>
                                                <Input
                                                    size="md"
                                                    type="text"
                                                    name="name"
                                                    placeholder="Name"
                                                    value={values.name}
                                                    onChange={handleChange}
                                                />
                                                {touched.name && errors.name && (
                                                    <FormHelperText>
                                                        <InfoOutlined />
                                                        {errors.name}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>
                                        <Grid xs={6}>
                                            <FormLabel
                                                sx={{
                                                    py: 1,
                                                    color:
                                                        touched.email &&
                                                        errors.email &&
                                                        '#c41c1c',
                                                }}>
                                                Email*
                                            </FormLabel>
                                            <FormControl
                                                error={Boolean(
                                                    touched.email &&
                                                        errors.email,
                                                )}>
                                                <Input
                                                    size="md"
                                                    type="email"
                                                    name="email"
                                                    placeholder="Email"
                                                    value={values.email}
                                                    onChange={handleChange}
                                                />
                                                {touched.email && errors.email && (
                                                    <FormHelperText>
                                                        <InfoOutlined />
                                                        {errors.email}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>
                                        <Grid xs={6}>
                                            <FormLabel
                                                sx={{
                                                    py: 1,
                                                    color:
                                                        touched.password &&
                                                        errors.password &&
                                                        '#c41c1c',
                                                }}>
                                                Password*
                                            </FormLabel>
                                            <FormControl
                                                error={Boolean(
                                                    touched.password &&
                                                        errors.password,
                                                )}>
                                                <Input
                                                    size="md"
                                                    name="password"
                                                    type="password"
                                                    placeholder="Password"
                                                    value={values.password}
                                                    onChange={handleChange}
                                                />
                                                {touched.password &&
                                                    errors.password && (
                                                        <FormHelperText>
                                                            <InfoOutlined />
                                                            {errors.password}
                                                        </FormHelperText>
                                                    )}
                                            </FormControl>
                                        </Grid>
                                        <Grid xs={6}>
                                            <FormLabel
                                                sx={{
                                                    py: 1,
                                                    color:
                                                        touched.country &&
                                                        errors.country &&
                                                        '#c41c1c',
                                                }}>
                                                Country*
                                            </FormLabel>
                                            <FormControl
                                                error={Boolean(
                                                    touched.country &&
                                                        errors.country,
                                                )}>
                                                {/* <Autocomplete
                                                    options={countries}
                                                    placeholder="Select Country"
                                                    // value={values.country}
                                                    getOptionLabel={(
                                                        country: any,
                                                    ) => country.name}
                                                    onChange={(e, value) =>
                                                        setFieldValue(
                                                            'country',
                                                            value,
                                                        )
                                                    }
                                                /> */}
                                                <Select
                                                    color={
                                                        touched.country &&
                                                        errors.country
                                                            ? 'danger'
                                                            : 'neutral'
                                                    }
                                                    placeholder="Select country"
                                                    value={values.country}
                                                    name="country"
                                                    onChange={(e, value) => {
                                                        setFieldValue(
                                                            'country',
                                                            value,
                                                        )
                                                        getRegions(value)
                                                    }}
                                                    size="md"
                                                    variant="outlined">
                                                    {countries.map(country => (
                                                        <Option
                                                            value={country.id}
                                                            key={country.name}>
                                                            {country.name}
                                                        </Option>
                                                    ))}
                                                </Select>
                                                {touched.country &&
                                                    errors.country && (
                                                        <FormHelperText>
                                                            <InfoOutlined />
                                                            {errors.country}
                                                        </FormHelperText>
                                                    )}
                                            </FormControl>
                                        </Grid>
                                        <Grid xs={6}>
                                            <FormLabel
                                                sx={{
                                                    py: 1,
                                                    color:
                                                        touched.region &&
                                                        errors.region &&
                                                        '#c41c1c',
                                                }}>
                                                Region
                                            </FormLabel>
                                            <FormControl
                                                error={Boolean(
                                                    touched.region &&
                                                        errors.region,
                                                )}>
                                                <Select
                                                    disabled={regionDisable}
                                                    color={
                                                        touched.region &&
                                                        errors.region
                                                            ? 'danger'
                                                            : 'neutral'
                                                    }
                                                    placeholder="Select region"
                                                    value={values.region}
                                                    name="region"
                                                    onChange={(e, value) => {
                                                        setFieldValue(
                                                            'region',
                                                            value,
                                                        )
                                                        getBranches(value)
                                                    }}
                                                    size="md"
                                                    variant="outlined">
                                                    {regions.map(region => (
                                                        <Option
                                                            value={region.id}
                                                            key={region.name}>
                                                            {region.name}
                                                        </Option>
                                                    ))}
                                                </Select>
                                                {touched.region &&
                                                    errors.region && (
                                                        <FormHelperText>
                                                            <InfoOutlined />
                                                            {errors.region}
                                                        </FormHelperText>
                                                    )}
                                            </FormControl>
                                        </Grid>
                                        <Grid xs={6}>
                                            <FormLabel
                                                sx={{
                                                    py: 1,
                                                    color:
                                                        touched.branch &&
                                                        errors.branch &&
                                                        '#c41c1c',
                                                }}>
                                                Branch
                                            </FormLabel>
                                            <FormControl
                                                error={Boolean(
                                                    touched.branch &&
                                                        errors.branch,
                                                )}>
                                                <Select
                                                    disabled={branchDisable}
                                                    color={
                                                        touched.branch &&
                                                        errors.branch
                                                            ? 'danger'
                                                            : 'neutral'
                                                    }
                                                    placeholder="Select branch"
                                                    value={values.branch}
                                                    name="branch"
                                                    onChange={(e, value) => {
                                                        setFieldValue(
                                                            'branch',
                                                            value,
                                                        )
                                                    }}
                                                    size="md"
                                                    variant="outlined">
                                                    {branches.map(branch => (
                                                        <Option
                                                            value={branch.id}
                                                            key={branch.name}>
                                                            {branch.name}
                                                        </Option>
                                                    ))}
                                                </Select>
                                                {touched.branch &&
                                                    errors.branch && (
                                                        <FormHelperText>
                                                            <InfoOutlined />
                                                            {errors.branch}
                                                        </FormHelperText>
                                                    )}
                                            </FormControl>
                                        </Grid>
                                        <Grid xs={6}>
                                            <FormLabel
                                                sx={{
                                                    py: 1,
                                                }}>
                                                Select Role
                                            </FormLabel>
                                            <FormControl>
                                                <Autocomplete
                                                    multiple
                                                    options={roles}
                                                    placeholder="Select roles"
                                                    value={values.roles}
                                                    getOptionLabel={(
                                                        role: IRole,
                                                    ) => role.name}
                                                    onChange={(e, value) =>
                                                        setFieldValue(
                                                            'roles',
                                                            value,
                                                        )
                                                    }
                                                />
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                    {/* <Divider>
                                        <Typography level="h4">
                                            Business Account
                                        </Typography>
                                    </Divider> */}
                                    {/* <Grid container spacing={2}>
                                        <FieldArray name="businessAccounts">
                                            {({ push, remove }) => (
                                                <>
                                                    {values.businessAccounts.map(
                                                        (
                                                            account: IBusinessAccount,
                                                            index,
                                                        ) => {
                                                            const accountErrors = errors
                                                                .businessAccounts?.[
                                                                index
                                                            ] as FormikErrors<IBusinessAccount>
                                                            const accountTouched = touched
                                                                .businessAccounts?.[
                                                                index
                                                            ] as FormikTouched<IBusinessAccount>
                                                            return (
                                                                <BusinessAccountFormComponent
                                                                    key={index}
                                                                    account={
                                                                        account
                                                                    }
                                                                    index={
                                                                        index
                                                                    }
                                                                    errors={
                                                                        accountErrors
                                                                    }
                                                                    handleChange={
                                                                        handleChange
                                                                    }
                                                                    touched={
                                                                        accountTouched
                                                                    }
                                                                    onRemove={() =>
                                                                        remove(
                                                                            index,
                                                                        )
                                                                    }
                                                                />
                                                            )
                                                        },
                                                    )}
                                                    <Grid
                                                        xs={6}
                                                        textAlign="center">
                                                        <IconButton
                                                            aria-label="Add Business Account"
                                                            onClick={() =>
                                                                push({
                                                                    first_name:
                                                                        '',
                                                                    last_name:
                                                                        '',
                                                                    email: '',
                                                                    phone: '',
                                                                    address: '',
                                                                    longitude:
                                                                        '',
                                                                    latitude:
                                                                        '',
                                                                })
                                                            }
                                                            sx={{
                                                                width: '64px',
                                                                height: '64px',
                                                                backgroundColor:
                                                                    '#4caf50', // Green color as an example
                                                                borderRadius:
                                                                    '50%',
                                                            }}>
                                                            <AddIcon
                                                                style={{
                                                                    fontSize:
                                                                        '36px',
                                                                    color:
                                                                        '#fff',
                                                                }}
                                                            />
                                                        </IconButton>
                                                    </Grid>
                                                </>
                                            )}
                                        </FieldArray>
                                    </Grid> */}

                                    <CardOverflow
                                        sx={{
                                            borderTop: '1px solid',
                                            borderColor: 'divider',
                                        }}>
                                        <CardActions
                                            sx={{
                                                alignSelf: 'flex-end',
                                                pt: 2,
                                            }}>
                                            <Button
                                                size="sm"
                                                variant="outlined"
                                                color="neutral">
                                                Cancel
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="solid"
                                                type="submit ">
                                                Save
                                            </Button>
                                        </CardActions>
                                    </CardOverflow>
                                </Card>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
        </DashboardLayout>
    )
}
