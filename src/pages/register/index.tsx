// import ApplicationLogo from '@/components/ApplicationLogo'
// import AuthCard from '@/components/AuthCard'
// import Button from '@/components/Button'
// import GuestLayout from '@/components/Layouts/GuestLayout'
// import Input from '@/components/Input'
// import InputError from '@/components/InputError'
// import Label from '@/components/Label'
// import Link from 'next/link'
// import { useAuth } from '@/hooks/auth'
// import { useState } from 'react'

// const Register = () => {
//     const { register } = useAuth({
//         middleware: 'guest',
//         redirectIfAuthenticated: '/dashboard',
//     })

//     const [name, setName] = useState('')
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')
//     const [passwordConfirmation, setPasswordConfirmation] = useState('')
//     const [errors, setErrors] = useState<any>([])

//     const submitForm = event => {
//         event.preventDefault()

//         register({
//             name,
//             email,
//             password,
//             password_confirmation: passwordConfirmation,
//             setErrors,
//         })
//     }

//     return (
//         <GuestLayout>
//             <AuthCard>
//                 <form onSubmit={submitForm}>
//                     {/* Name */}
//                     <div>
//                         <Label htmlFor="name">Name</Label>

//                         <Input
//                             id="name"
//                             type="text"
//                             value={name}
//                             className="block mt-1 w-full"
//                             onChange={event => setName(event.target.value)}
//                             required
//                             autoFocus
//                         />

//                         <InputError messages={errors.name} className="mt-2" />
//                     </div>

//                     {/* Email Address */}
//                     <div className="mt-4">
//                         <Label htmlFor="email">Email</Label>

//                         <Input
//                             id="email"
//                             type="email"
//                             value={email}
//                             className="block mt-1 w-full"
//                             onChange={event => setEmail(event.target.value)}
//                             required
//                         />

//                         <InputError messages={errors.email} className="mt-2" />
//                     </div>

//                     {/* Password */}
//                     <div className="mt-4">
//                         <Label htmlFor="password">Password</Label>

//                         <Input
//                             id="password"
//                             type="password"
//                             value={password}
//                             className="block mt-1 w-full"
//                             onChange={event => setPassword(event.target.value)}
//                             required
//                             autoComplete="new-password"
//                         />

//                         <InputError
//                             messages={errors.password}
//                             className="mt-2"
//                         />
//                     </div>

//                     {/* Confirm Password */}
//                     <div className="mt-4">
//                         <Label htmlFor="passwordConfirmation">
//                             Confirm Password
//                         </Label>

//                         <Input
//                             id="passwordConfirmation"
//                             type="password"
//                             value={passwordConfirmation}
//                             className="block mt-1 w-full"
//                             onChange={event =>
//                                 setPasswordConfirmation(event.target.value)
//                             }
//                             required
//                         />

//                         <InputError
//                             messages={errors.password_confirmation}
//                             className="mt-2"
//                         />
//                     </div>

//                     <div className="flex items-center justify-end mt-4">
//                         <Link
//                             href="/login"
//                             className="underline text-sm text-gray-600 hover:text-gray-900">
//                             Already registered?
//                         </Link>

//                         <Button className="ml-4">Register</Button>
//                     </div>
//                 </form>
//             </AuthCard>
//         </GuestLayout>
//     )
// }

// export default Register

import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import * as React from 'react'
import Box from '@mui/joy/Box'
import Button from '@mui/joy/Button'
import Checkbox from '@mui/joy/Checkbox'
import FormControl from '@mui/joy/FormControl'
import FormLabel, { formLabelClasses } from '@mui/joy/FormLabel'
import Input from '@mui/joy/Input'
import Typography from '@mui/joy/Typography'
import Stack from '@mui/joy/Stack'
import WarningIcon from '@mui/icons-material/Warning'
import CloseIcon from '@mui/icons-material/Close'
import AuthLayout from '@/components/Layouts/AuthLayout'
import PasswordInput from '@/components/ui-component/Input/PasswordInput'
import EmailRoundedIcon from '@mui/icons-material/EmailRounded'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import { Alert, IconButton } from '@mui/joy'

export default function Register() {
    const { query } = useRouter()

    const { register } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    })

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [errors, setErrors] = useState<any>([])
    const [loading, setLoading] = useState(false)

    const submitForm = event => {
        event.preventDefault()

        register({
            name,
            email,
            password,
            password_confirmation: passwordConfirmation,
            setErrors,
            setLoading,
        })
    }

    // useEffect(() => {
    //     const reset = query && query.reset ? (query.reset as string) : ''
    //     if (reset.length > 0 && errors.length === 0) {
    //         setStatus(atob(reset))
    //     } else {
    //         setStatus(null)
    //     }
    // })

    return (
        <AuthLayout head="Register" loading={loading}>
            <Box
                component="main"
                sx={{
                    my: 'auto',
                    py: 2,
                    pb: 5,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    width: 400,
                    maxWidth: '100%',
                    mx: 'auto',
                    borderRadius: 'sm',
                    '& form': {
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                    },
                    [`& .${formLabelClasses.asterisk}`]: {
                        visibility: 'hidden',
                    },
                }}>
                <Stack gap={4} sx={{ mb: 2 }}>
                    <Stack gap={1}>
                        <Typography level="h3">Sign Up</Typography>
                        <Typography level="body-sm">
                            Already have an account?{' '}
                            <Link href="/login">Sign in!</Link>
                        </Typography>
                    </Stack>
                </Stack>
                {/* <Divider
                            sx={theme => ({
                                [theme.getColorSchemeSelector('light')]: {
                                    color: { xs: '#FFF', md: 'text.tertiary' },
                                    '--Divider-lineColor': {
                                        xs: '#FFF',
                                        md: 'var(--joy-palette-divider)',
                                    },
                                },
                            })}>
                            or
                        </Divider> */}
                <Stack gap={4} sx={{ mt: 2 }}>
                    {errors && errors.msg && (
                        // <FormHelperText
                        //     variant="outlined"
                        //     sx={{ color: 'red' }}>
                        //     {errors.msg}
                        // </FormHelperText>
                        <Alert
                            startDecorator={<WarningIcon />}
                            variant="solid"
                            color="danger"
                            endDecorator={
                                <IconButton
                                    variant="solid"
                                    size="sm"
                                    color="danger"
                                    onClick={() => setErrors(null)}>
                                    <CloseIcon />
                                </IconButton>
                            }>
                            {errors.msg}
                        </Alert>
                    )}
                    <form onSubmit={submitForm}>
                        <FormControl required>
                            <FormLabel>Name</FormLabel>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Your name"
                                value={name}
                                onChange={event => setName(event.target.value)}
                                required
                                startDecorator={<PersonRoundedIcon />}
                                autoFocus
                            />
                        </FormControl>
                        <FormControl required>
                            <FormLabel>Email</FormLabel>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Your email"
                                value={email}
                                onChange={event => setEmail(event.target.value)}
                                startDecorator={<EmailRoundedIcon />}
                            />
                        </FormControl>
                        <FormControl required>
                            <FormLabel>Password</FormLabel>
                            <PasswordInput
                                value={password}
                                onChange={event =>
                                    setPassword(event.target.value)
                                }
                                name="password"
                                placeholder="Password"
                            />
                        </FormControl>
                        <FormControl required>
                            <FormLabel>Confirm Password</FormLabel>
                            <PasswordInput
                                value={passwordConfirmation}
                                onChange={event =>
                                    setPasswordConfirmation(event.target.value)
                                }
                                name="confirmPassword"
                                placeholder="Confirm password"
                            />
                        </FormControl>
                        <Stack gap={4} sx={{ mt: 2 }}>
                            <Button type="submit" fullWidth disabled={loading}>
                                Sign up
                            </Button>
                        </Stack>
                    </form>
                </Stack>
            </Box>
        </AuthLayout>
    )
}
