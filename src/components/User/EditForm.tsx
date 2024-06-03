// joy-ui
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    Typography,
    Input,
    FormLabel,
    Card,
    CardActions,
    CardOverflow,
    Divider,
    Autocomplete,
    AspectRatio,
    IconButton,
    Stack,
} from '@mui/joy'
import MuiInput, { TextField } from '@mui/material'
import axios from '@/lib/axios'
import React, { useRef, useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { IRole, IUser } from '@/types/common'
import toast from 'react-hot-toast'
import InfoOutlined from '@mui/icons-material/InfoOutlined'
import { EmailRounded } from '@mui/icons-material'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import { Grid } from '@mui/material'

type EditFormPropsType = {
    roles?: IRole[]
    user: IUser
    isProfileUpdate?: boolean
}

const UserEditForm = ({ user, roles, isProfileUpdate }: EditFormPropsType) => {
    const fileInputRef = useRef(null)
    const [avatarSrc, setAvatarSrc] = useState(null)
    const [profileImage, setProfileImage] = useState()

    const apiUrl = isProfileUpdate
        ? `/api/update-profile/${user?.id}`
        : `/api/users/${user?.id}`

    const handleFileChange = event => {
        const file = event.target.files[0]
        setProfileImage(file)

        if (file) {
            const reader = new FileReader()

            reader.onload = e => {
                setAvatarSrc(e.target.result)
            }

            reader.readAsDataURL(file)
        }
    }

    const handleEditButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    }

    return (
        <Formik
            initialValues={{
                email: user?.email || '',
                name: user?.name || '',
                roles: user?.roles || [],
                submit: null,
            }}
            enableReinitialize
            validationSchema={Yup.object().shape({
                name: Yup.string().max(255).required('Name is required'),
                email: Yup.string()
                    .email('Must be a valid email')
                    .max(255)
                    .required('Email is required'),
                roles: Yup.array()
                    .required('At least one role must be selected')
                    .min(1, 'At least one role must be selected'),
            })}
            onSubmit={async (values, { resetForm }) => {
                const formData = new FormData()
                formData.append('name', values.name)
                formData.append('email', values.email)
                profileImage && formData.append('profile_image', profileImage)
                values.roles.forEach((role: IRole, index) => {
                    formData.append(`role_ids[${index}]`, `${role.id}`)
                })
                try {
                    await axios
                        .post(apiUrl, formData, {
                            headers: {
                                'X-HTTP-Method-Override': 'PUT',
                            },
                        })
                        .then(response => {
                            if (response.data.success) {
                                // resetForm()
                                toast.success(response.data.msg)
                            } else {
                                toast.error(response.data.data)
                            }
                        })
                        .catch(error => {
                            console.log(error)
                        })
                } catch (error) {
                    if (error.response.data) {
                        toast.error(error.response.data.data)
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
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Card>
                                {/* <Box sx={{ mb: 1 }}>
                                    <Typography
                                        level="h4"
                                        startDecorator={<InfoOutlined />}>
                                        Update user information
                                    </Typography>
                                </Box> */}
                                <Box sx={{ mb: 1 }}>
                                    <Typography level="title-md">
                                        Personal Info
                                    </Typography>
                                    <Typography level="body-sm">
                                        Customize how your profile information
                                        will apper to the networks.
                                    </Typography>
                                </Box>
                                <Divider />
                                {/* <Divider inset="none" /> */}
                                <Grid
                                    container
                                    justifyContent="center"
                                    alignItems="center"
                                    spacing={1}>
                                    <Grid item xs={3}>
                                        <Stack
                                            direction="column"
                                            alignItems="center">
                                            <AspectRatio
                                                variant="solid"
                                                ratio="1"
                                                maxHeight={120}
                                                sx={{
                                                    flex: 1,
                                                    width: 90,
                                                    borderRadius: '100%',
                                                }}>
                                                <img
                                                    src={
                                                        avatarSrc ||
                                                        user?.profile_photo_url
                                                    }
                                                    srcSet={
                                                        avatarSrc ||
                                                        user?.profile_photo_url
                                                    }
                                                    loading="lazy"
                                                    alt=""
                                                />
                                            </AspectRatio>
                                            <input
                                                type="file"
                                                accept=".jpg, .jpeg, .png"
                                                ref={fileInputRef}
                                                name="profilePhotoUrl"
                                                onChange={handleFileChange}
                                                style={{ display: 'none' }}
                                            />
                                            <IconButton
                                                aria-label="upload new picture"
                                                size="sm"
                                                variant="outlined"
                                                color="neutral"
                                                onClick={handleEditButtonClick}
                                                sx={{
                                                    bgcolor: 'background.body',
                                                    position: 'absolute',
                                                    zIndex: 2,
                                                    borderRadius: '50%',
                                                    left: { md: 170, xs: 170 },
                                                    top: 130,
                                                    boxShadow: 'sm',
                                                }}>
                                                <EditRoundedIcon />
                                            </IconButton>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={9}>
                                        <Grid
                                            container
                                            spacing={2}
                                            sx={{ width: '100%' }}>
                                            <Grid item xs={12} md={6}>
                                                <FormLabel
                                                    sx={{
                                                        py: 1,
                                                        color:
                                                            errors.name &&
                                                            '#c41c1c',
                                                    }}>
                                                    Name
                                                </FormLabel>
                                                <FormControl
                                                    error={Boolean(
                                                        errors.name,
                                                    )}>
                                                    <Input
                                                        size="md"
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
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <FormLabel
                                                    sx={{
                                                        py: 1,
                                                        color:
                                                            errors.email &&
                                                            '#c41c1c',
                                                    }}>
                                                    Email
                                                </FormLabel>
                                                <FormControl
                                                    error={Boolean(
                                                        errors.email,
                                                    )}>
                                                    <Input
                                                        size="md"
                                                        disabled
                                                        type="email"
                                                        name="email"
                                                        placeholder="Email"
                                                        value={values.email}
                                                        startDecorator={
                                                            <EmailRounded />
                                                        }
                                                        onChange={handleChange}
                                                    />
                                                    {errors.email && (
                                                        <FormHelperText>
                                                            <InfoOutlined />
                                                            {errors.email}
                                                        </FormHelperText>
                                                    )}
                                                </FormControl>
                                            </Grid>

                                            {roles && roles.length && (
                                                <Grid item xs={12} md={6}>
                                                    <FormLabel
                                                        sx={{
                                                            py: 1,
                                                            color:
                                                                errors.roles &&
                                                                '#c41c1c',
                                                        }}>
                                                        Select Roles
                                                    </FormLabel>
                                                    <FormControl
                                                        error={Boolean(
                                                            errors.roles,
                                                        )}>
                                                        <Autocomplete
                                                            multiple
                                                            options={roles.filter(
                                                                role =>
                                                                    !values.roles.some(
                                                                        selectedRole =>
                                                                            selectedRole.id ===
                                                                            role.id,
                                                                    ),
                                                            )}
                                                            placeholder="Select roles"
                                                            value={values.roles}
                                                            getOptionLabel={(
                                                                role: IRole,
                                                            ) => role.name}
                                                            onChange={(
                                                                e,
                                                                value,
                                                            ) => {
                                                                setFieldValue(
                                                                    'roles',
                                                                    value,
                                                                )
                                                            }}
                                                        />
                                                        {errors.roles && (
                                                            <FormHelperText>
                                                                <InfoOutlined />
                                                                {Array.isArray(
                                                                    errors.roles,
                                                                )
                                                                    ? errors.roles.join(
                                                                          ', ',
                                                                      )
                                                                    : errors.roles}
                                                            </FormHelperText>
                                                        )}
                                                    </FormControl>
                                                </Grid>
                                            )}
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <CardOverflow
                                    sx={{
                                        borderTop: '1px solid',
                                        borderColor: 'divider',
                                        mt: 2,
                                    }}>
                                    <CardActions
                                        sx={{ alignSelf: 'flex-end', pt: 2 }}>
                                        <Button
                                            size="sm"
                                            variant="outlined"
                                            color="neutral">
                                            Cancel
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="solid"
                                            type="submit">
                                            Save
                                        </Button>
                                    </CardActions>
                                </CardOverflow>

                                {/* <CardOverflow>
                                    <CardActions
                                        sx={{
                                            alignSelf: 'flex-end',
                                            pt: 2,
                                            
                                        }}>
                                        <Button
                                            size="sm"
                                            variant="solid"
                                            type="submit"
                                            sx={{ paddingX: 6 }}>
                                            Update
                                        </Button>
                                    </CardActions>
                                </CardOverflow> */}
                            </Card>
                        </Grid>
                    </Grid>
                </form>
            )}
        </Formik>
    )
}

export default UserEditForm
