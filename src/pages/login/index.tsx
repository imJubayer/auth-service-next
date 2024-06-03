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
import { Alert, IconButton } from '@mui/joy'

export default function Login() {
    const { query } = useRouter()

    const { login } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/home',
    })

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [shouldRemember, setShouldRemember] = useState(false)
    const [errors, setErrors] = useState<any>([])
    const [status, setStatus] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const reset = query && query.reset ? (query.reset as string) : ''
        if (reset.length > 0 && errors.length === 0) {
            setStatus(atob(reset))
        } else {
            setStatus(null)
        }
    })

    const submitForm = async event => {
        event.preventDefault()

        await login({
            email,
            password,
            remember: shouldRemember,
            setErrors,
            setStatus,
            setLoading,
        })
    }
    return (
        <AuthLayout head="Login" loading={loading}>
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
                        <Typography level="h3">Sign in</Typography>
                        <Typography level="body-sm">
                            New to company?{' '}
                            <Link href="/register">Sign up!</Link>
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
                            <FormLabel>Email</FormLabel>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Your email"
                                value={email}
                                onChange={event => setEmail(event.target.value)}
                                startDecorator={<EmailRoundedIcon />}
                                autoFocus
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
                        <Stack gap={4} sx={{ mt: 2 }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}>
                                <Checkbox
                                    size="sm"
                                    label="Remember me"
                                    name="persistent"
                                    // value={shouldRemember}
                                    onChange={event =>
                                        setShouldRemember(
                                            // event.target.checked
                                            !shouldRemember,
                                        )
                                    }
                                />
                                <Typography
                                    level="body-sm"
                                    sx={{ textDecoration: 'bold' }}>
                                    <Link
                                        href="forgot-password
                                        ">
                                        Forgot your password?
                                    </Link>
                                </Typography>
                            </Box>
                            <Button type="submit" fullWidth disabled={loading}>
                                Sign in
                            </Button>
                        </Stack>
                    </form>
                </Stack>
            </Box>
        </AuthLayout>
    )
}
