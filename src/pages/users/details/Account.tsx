import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { IBusinessAccount, IRole } from '@/types/common'
import { InfoOutlined } from '@mui/icons-material'
import {
    Box,
    CardActions,
    CardOverflow,
    Divider,
    Textarea,
    Typography,
} from '@mui/joy'
import {
    FormControl,
    FormHelperText,
    FormLabel,
    Grid,
    Input,
    Button,
    Card,
} from '@mui/joy'
import axios from '@/lib/axios'
import toast from 'react-hot-toast'
import Maps from '@/components/Map/GoogleMaps'

interface BusinessAccountFormProps {
    userId: number
    businessAccount?: IBusinessAccount
    submitType: 'add' | 'edit'
    updateUser?: boolean
    setUpdateUser?: (value: boolean) => void
}

const BusinessAccount: React.FC<BusinessAccountFormProps> = ({
    userId,
    businessAccount,
    submitType,
    updateUser,
    setUpdateUser,
}) => {
    const initialValues = {
        user_id: userId,
        first_name: businessAccount?.first_name || '',
        last_name: businessAccount?.last_name || '',
        email: businessAccount?.email || '',
        phone: businessAccount?.phone || '',
        address: businessAccount?.address || '',
        latitude: businessAccount?.latitude || '',
        longitude: businessAccount?.longitude || '',
    }

    const initialCenter = {
        lat: 23.8041,
        lng: 90.4152,
    }
    const [currentPosition, setCurrentPosition] = useState(initialCenter)

    const handleUpdatePosition = newPosition => {
        initialValues.latitude = newPosition.lat
        setCurrentPosition(newPosition)
    }
    useEffect(() => {
        if (businessAccount?.latitude && businessAccount?.longitude) {
            setCurrentPosition({
                lat: parseFloat(businessAccount?.latitude),
                lng: parseFloat(businessAccount?.longitude),
            })
        }
    }, [businessAccount])
    return (
        <Formik
            initialValues={initialValues}
            enableReinitialize
            validationSchema={Yup.object().shape({
                first_name: Yup.string()
                    .max(255)
                    .required('Firstname is required'),
                last_name: Yup.string()
                    .max(255)
                    .required('Lastname is required'),
                email: Yup.string()
                    .email('Must be a valid email')
                    .max(255)
                    .required('Email is required'),
                latitude: Yup.number()
                    .min(-90, 'Latitude must be greater than or equal to -90')
                    .max(90, 'Latitude must be less than or equal to 90')
                    .required('Latitude is required'),
                longitude: Yup.number()
                    .min(
                        -180,
                        'Longitude must be greater than or equal to -180',
                    )
                    .max(180, 'Longitude must be less than or equal to 180')
                    .required('Longitude is required'),
            })}
            onSubmit={async (values, { resetForm }) => {
                if (submitType === 'add') {
                    try {
                        await axios
                            .post(`/api/users/business-accounts`, values)
                            .then(response => {
                                if (response.data.success) {
                                    resetForm()
                                    toast.success(response.data.msg)
                                    setUpdateUser(!updateUser)
                                } else {
                                    toast.error(response.data.msg)
                                }
                            })
                    } catch (error) {
                        toast.error(error.response.data.msg)
                    }
                } else {
                    try {
                        await axios
                            .patch(
                                `/api/business-accounts/${businessAccount.id}`,
                                values,
                            )
                            .then(response => {
                                if (response.data.success) {
                                    resetForm()
                                    toast.success(response.data.msg)
                                    setUpdateUser(!updateUser)
                                    // setUpdateUser(!updateUser)
                                } else {
                                    toast.error(response.data.msg)
                                    setUpdateUser(!updateUser)
                                }
                            })
                    } catch (error) {
                        toast.error(error.response.data.msg)
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
                <form
                    noValidate
                    onSubmit={handleSubmit}
                    style={{ width: '100%' }}>
                    <Card>
                        {/* <Box sx={{ mb: 1 }}>
                            <Typography
                                level="h4"
                                startDecorator={<InfoOutlined />}>
                                Business Account - {businessAccount.id}
                            </Typography>
                        </Box> */}
                        {/* <Divider inset="none" /> */}
                        <Grid container spacing={2}>
                            <Grid xs={6}>
                                <FormLabel
                                    sx={{
                                        py: 1,
                                        color: errors.first_name && '#c41c1c',
                                    }}>
                                    Firstname
                                </FormLabel>
                                <FormControl error={Boolean(errors.first_name)}>
                                    <Input
                                        type="text"
                                        name="first_name"
                                        placeholder="Firstname"
                                        value={values.first_name}
                                        onChange={handleChange}
                                    />
                                    {errors.first_name && (
                                        <FormHelperText>
                                            <InfoOutlined />
                                            {errors.first_name}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid xs={6}>
                                <FormLabel
                                    sx={{
                                        py: 1,
                                        color: errors.last_name && '#c41c1c',
                                    }}>
                                    Lastname
                                </FormLabel>
                                <FormControl error={Boolean(errors.last_name)}>
                                    <Input
                                        type="text"
                                        name="last_name"
                                        placeholder="Name"
                                        value={values.last_name}
                                        onChange={handleChange}
                                    />
                                    {errors.last_name && (
                                        <FormHelperText>
                                            <InfoOutlined />
                                            {errors.last_name}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid xs={6}>
                                <FormLabel
                                    sx={{
                                        py: 1,
                                        color: errors.email && '#c41c1c',
                                    }}>
                                    Email
                                </FormLabel>
                                <FormControl error={Boolean(errors.email)}>
                                    <Input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        value={values.email}
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
                            <Grid xs={6}>
                                <FormLabel
                                    sx={{
                                        py: 1,
                                        color: errors.phone && '#c41c1c',
                                    }}>
                                    Phone
                                </FormLabel>
                                <FormControl error={Boolean(errors.phone)}>
                                    <Input
                                        type="phone"
                                        name="phone"
                                        placeholder="Phone"
                                        value={values.phone}
                                        onChange={handleChange}
                                    />
                                    {errors.phone && (
                                        <FormHelperText>
                                            <InfoOutlined />
                                            {errors.phone}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid xs={12}>
                                <FormLabel
                                    sx={{
                                        py: 1,
                                        color: errors.address && '#c41c1c',
                                    }}>
                                    Address
                                </FormLabel>
                                <FormControl error={Boolean(errors.address)}>
                                    <Textarea
                                        name="address"
                                        placeholder="Address"
                                        value={values.address}
                                        onChange={handleChange}
                                        minRows={3}
                                    />
                                    {errors.address && (
                                        <FormHelperText>
                                            <InfoOutlined />
                                            {errors.address}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid xs={6}>
                                <FormLabel
                                    sx={{
                                        py: 1,
                                        color: errors.latitude && '#c41c1c',
                                    }}>
                                    Latitude
                                </FormLabel>
                                <FormControl error={Boolean(errors.latitude)}>
                                    <Input
                                        slotProps={{
                                            input: {
                                                min: -90,
                                                max: 90,
                                            },
                                        }}
                                        type="number"
                                        name="latitude"
                                        placeholder="Latitude"
                                        value={values.latitude}
                                        onChange={event => {
                                            setCurrentPosition({
                                                lat: parseFloat(
                                                    event.target.value,
                                                ),
                                                lng: parseFloat(
                                                    values.longitude,
                                                ),
                                            })
                                            setFieldValue(
                                                'latitude',
                                                event.target.value,
                                            )
                                        }}
                                    />
                                    {errors.latitude && (
                                        <FormHelperText>
                                            <InfoOutlined />
                                            {errors.latitude}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid xs={6}>
                                <FormLabel
                                    sx={{
                                        py: 1,
                                        color: errors.longitude && '#c41c1c',
                                    }}>
                                    Longitude
                                </FormLabel>
                                <FormControl error={Boolean(errors.longitude)}>
                                    <Input
                                        slotProps={{
                                            input: {
                                                min: -90,
                                                max: 90,
                                            },
                                        }}
                                        type="number"
                                        name="longitude"
                                        placeholder="Longitude"
                                        value={values.longitude}
                                        onChange={event => {
                                            setCurrentPosition({
                                                lat: parseFloat(
                                                    values.latitude,
                                                ),
                                                lng: parseFloat(
                                                    event.target.value,
                                                ),
                                            })
                                            setFieldValue(
                                                'longitude',
                                                event.target.value,
                                            )
                                        }}
                                    />
                                    {errors.longitude && (
                                        <FormHelperText>
                                            <InfoOutlined />
                                            {errors.longitude}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid>
                            <Maps
                                initialCenter={currentPosition}
                                onUpdatePosition={point => {
                                    setFieldValue('latitude', point.lat)
                                    setFieldValue('longitude', point.lng)
                                }}
                            />
                        </Grid>
                        <CardOverflow>
                            <CardActions
                            // sx={{
                            //     alignSelf: 'flex-end',
                            //     pt: 2,
                            // }}
                            >
                                <Button
                                    size="sm"
                                    variant="solid"
                                    type="submit"
                                    sx={{ paddingX: 6 }}>
                                    {submitType === 'add' ? 'Create' : 'Update'}
                                </Button>
                            </CardActions>
                        </CardOverflow>
                    </Card>
                </form>
            )}
        </Formik>
    )
}

export default BusinessAccount
