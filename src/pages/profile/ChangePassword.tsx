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
import { makeFormData } from '@/utils/helper'
import PasswordInput from '@/components/ui-component/Input/PasswordInput'

type ChangePasswordPropsType = {
    setLoading: (value: boolean) => void
}

const ChangePassword = ({ setLoading }: ChangePasswordPropsType) => {
    return (
        <Formik
            initialValues={{
                oldPassword: '',
                password: '',
                confirmPassword: '',
                submit: null,
            }}
            enableReinitialize
            validationSchema={Yup.object().shape({
                oldPassword: Yup.string().required('Old password is required'),
                password: Yup.string()
                    .min(8, 'Password must be at least 8 characters')
                    .required('New password is required'),
                confirmPassword: Yup.string()
                    .oneOf([Yup.ref('password'), null], 'Passwords must match')
                    .required('Confirm password is required'),
            })}
            onSubmit={async (values, { resetForm }) => {
                setLoading(true)
                const formDataArray = [
                    { key: 'oldPassword', value: values.oldPassword },
                    { key: 'password', value: values.password },
                ]
                try {
                    await axios
                        .post(
                            '/api/users/change-password',
                            makeFormData(formDataArray),
                        )
                        .then(response => {
                            if (response.data.success) {
                                resetForm()
                                toast.success(response.data.msg)
                            } else {
                                toast.error(response.data.msg)
                            }
                            setLoading(false)
                        })
                        .catch(error => {
                            setLoading(false)
                            toast.error(error.response.data.data)
                        })
                } catch (error) {
                    if (error.response.data) {
                        toast.error(error.response.data.data)
                    }
                    setLoading(false)
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
                    <Card>
                        <Box sx={{ mb: 1 }}>
                            <Typography level="h4">Change Password</Typography>
                            {/* <Typography level="body-sm">
                                
                            </Typography> */}
                        </Box>
                        <Divider />
                        {/* <Divider inset="none" /> */}
                        <Grid
                            container
                            justifyContent="center"
                            alignItems="center"
                            spacing={2}>
                            <Grid item xs={6}>
                                <FormLabel
                                    sx={{
                                        py: 1,
                                        color:
                                            touched.oldPassword &&
                                            errors.oldPassword &&
                                            '#c41c1c',
                                    }}>
                                    Old Password
                                </FormLabel>
                                <FormControl
                                    error={Boolean(
                                        touched.oldPassword &&
                                            errors.oldPassword,
                                    )}>
                                    <PasswordInput
                                        value={values.oldPassword}
                                        onChange={handleChange}
                                        name="oldPassword"
                                        placeholder="Old password"
                                    />
                                    {touched.oldPassword && errors.oldPassword && (
                                        <FormHelperText>
                                            <InfoOutlined />
                                            {errors.oldPassword}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} />
                            <Grid item xs={12} md={6}>
                                <FormLabel
                                    sx={{
                                        py: 1,
                                        color:
                                            touched.password &&
                                            errors.password &&
                                            '#c41c1c',
                                    }}>
                                    New Password
                                </FormLabel>
                                <FormControl
                                    error={Boolean(
                                        touched.password && errors.password,
                                    )}>
                                    <PasswordInput
                                        value={values.password}
                                        onChange={handleChange}
                                        name="password"
                                        placeholder="New password"
                                    />
                                    {touched.password && errors.password && (
                                        <FormHelperText>
                                            <InfoOutlined />
                                            {errors.password}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormLabel
                                    sx={{
                                        py: 1,
                                        color:
                                            touched.confirmPassword &&
                                            errors.confirmPassword &&
                                            '#c41c1c',
                                    }}>
                                    Confirm Password
                                </FormLabel>
                                <FormControl
                                    error={Boolean(
                                        touched.confirmPassword &&
                                            errors.confirmPassword,
                                    )}>
                                    <PasswordInput
                                        value={values.confirmPassword}
                                        onChange={handleChange}
                                        name="confirmPassword"
                                        placeholder="Confirm password"
                                    />
                                    {touched.confirmPassword &&
                                        errors.confirmPassword && (
                                            <FormHelperText>
                                                <InfoOutlined />
                                                {errors.confirmPassword}
                                            </FormHelperText>
                                        )}
                                </FormControl>
                            </Grid>
                        </Grid>

                        <CardOverflow
                            sx={{
                                borderTop: '1px solid',
                                borderColor: 'divider',
                                mt: 2,
                            }}>
                            <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                                <Button size="sm" variant="solid" type="submit">
                                    Update
                                </Button>
                            </CardActions>
                        </CardOverflow>
                    </Card>
                </form>
            )}
        </Formik>
    )
}

export default ChangePassword
