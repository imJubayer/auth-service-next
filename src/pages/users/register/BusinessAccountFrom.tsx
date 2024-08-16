// BusinessAccountFormComponent.tsx

import React from 'react'
import { FormikErrors, FormikTouched } from 'formik'
import {
    Box,
    Card,
    Divider,
    FormControl,
    FormHelperText,
    FormLabel,
    Grid,
    IconButton,
    Input,
    Textarea,
    Typography,
} from '@mui/joy'
import { InfoOutlined } from '@mui/icons-material'
import CloseIcon from '@mui/icons-material/Close'
import { IBusinessAccount } from '@/types/common'

interface BusinessAccountFormProps {
    account: IBusinessAccount
    index: number
    errors: FormikErrors<IBusinessAccount>
    handleChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => void
    touched: FormikTouched<IBusinessAccount>
    onRemove: () => void
}

const BusinessAccountFormComponent: React.FC<BusinessAccountFormProps> = ({
    account,
    index,
    errors,
    touched,
    handleChange,
    onRemove,
}) => {
    return (
        <Grid key={index} xs={6}>
            <Card>
                {/* ... other components ... */}
                <Box sx={{ mb: 1 }}>
                    <Typography level="h4" startDecorator={<InfoOutlined />}>
                        Business Account - {index + 1}
                    </Typography>
                    <IconButton
                        aria-label="Remove"
                        onClick={onRemove}
                        sx={{
                            position: 'absolute',
                            top: '0.875rem',
                            right: '0.5rem',
                        }}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Divider inset="none" />
                <Grid container spacing={2}>
                    <Grid xs={6}>
                        <FormLabel
                            sx={{
                                py: 1,
                                color:
                                    touched?.first_name &&
                                    errors?.first_name &&
                                    '#c41c1c',
                            }}>
                            Firstname
                        </FormLabel>
                        <FormControl
                            error={Boolean(
                                touched?.first_name && errors?.first_name,
                            )}>
                            <Input
                                type="text"
                                name={`businessAccounts.${index}.first_name`}
                                placeholder="Firstname"
                                value={account.first_name}
                                onChange={handleChange}
                            />
                            {touched?.first_name && errors?.first_name && (
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
                                color:
                                    touched?.last_name &&
                                    errors?.last_name &&
                                    '#c41c1c',
                            }}>
                            Lastname
                        </FormLabel>
                        <FormControl
                            error={Boolean(
                                touched?.last_name && errors?.last_name,
                            )}>
                            <Input
                                type="text"
                                name={`businessAccounts.${index}.last_name`}
                                placeholder="LastName"
                                value={account.last_name}
                                onChange={handleChange}
                            />
                            {touched?.last_name && errors?.last_name && (
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
                                color:
                                    touched?.email &&
                                    errors?.email &&
                                    '#c41c1c',
                            }}>
                            Email
                        </FormLabel>
                        <FormControl
                            error={Boolean(touched?.email && errors?.email)}>
                            <Input
                                type="email"
                                name={`businessAccounts.${index}.email`}
                                placeholder="Email"
                                value={account.email}
                                onChange={handleChange}
                            />
                            {touched?.email && errors?.email && (
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
                                    touched?.phone &&
                                    errors?.phone &&
                                    '#c41c1c',
                            }}>
                            Phone
                        </FormLabel>
                        <FormControl
                            error={Boolean(touched?.phone && errors?.phone)}>
                            <Input
                                type="phone"
                                name={`businessAccounts.${index}.phone`}
                                placeholder="Phone"
                                value={account.phone}
                                onChange={handleChange}
                            />
                            {touched?.phone && errors?.phone && (
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
                                color:
                                    touched?.address &&
                                    errors?.address &&
                                    '#c41c1c',
                            }}>
                            Address
                        </FormLabel>
                        <FormControl
                            error={Boolean(
                                touched?.address && errors?.address,
                            )}>
                            <Textarea
                                name={`businessAccounts.${index}.address`}
                                placeholder="Address"
                                value={account.address}
                                onChange={handleChange}
                                minRows={3}
                            />
                            {touched?.address && errors?.address && (
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
                                color:
                                    touched?.longitude &&
                                    errors?.longitude &&
                                    '#c41c1c',
                            }}>
                            Longitude
                        </FormLabel>
                        <FormControl
                            error={Boolean(
                                touched?.longitude && errors?.longitude,
                            )}>
                            <Input
                                slotProps={{
                                    input: {
                                        min: -90,
                                        max: 90,
                                    },
                                }}
                                type="number"
                                name={`businessAccounts.${index}.longitude`}
                                placeholder="Longitude"
                                value={account.longitude}
                                onChange={handleChange}
                            />
                            {touched?.longitude && errors?.longitude && (
                                <FormHelperText>
                                    <InfoOutlined />
                                    {errors.longitude}
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid xs={6}>
                        <FormLabel
                            sx={{
                                py: 1,
                                color:
                                    touched?.latitude &&
                                    errors?.latitude &&
                                    '#c41c1c',
                            }}>
                            Latitude
                        </FormLabel>
                        <FormControl
                            error={Boolean(
                                touched?.latitude && errors?.latitude,
                            )}>
                            <Input
                                type="number"
                                name={`businessAccounts.${index}.latitude`}
                                placeholder="Latitude"
                                value={account.latitude}
                                onChange={handleChange}
                            />
                            {touched?.latitude && errors?.latitude && (
                                <FormHelperText>
                                    <InfoOutlined />
                                    {errors.latitude}
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Grid>
                </Grid>
            </Card>
        </Grid>
    )
}

export default BusinessAccountFormComponent
