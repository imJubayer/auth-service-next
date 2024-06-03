import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useState, FormEventHandler } from 'react'

import * as React from 'react'
import Box from '@mui/joy/Box'
import Button from '@mui/joy/Button'
import FormControl from '@mui/joy/FormControl'
import FormLabel, { formLabelClasses } from '@mui/joy/FormLabel'
import IconButton from '@mui/joy/IconButton'
import Input from '@mui/joy/Input'
import Typography from '@mui/joy/Typography'
import Stack from '@mui/joy/Stack'
import PlaylistAddCheckCircleRoundedIcon from '@mui/icons-material/PlaylistAddCheckCircleRounded'
import { Alert } from '@mui/joy'
import WarningIcon from '@mui/icons-material/Warning'
import CloseIcon from '@mui/icons-material/Close'
import AuthLayout from '@/components/Layouts/AuthLayout'

export default function ForgotPassword() {
    const { forgotPassword } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    })

    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState<any>([])
    const [status, setStatus] = useState(null)
    const [loading, setLoading] = useState(false)

    const submitForm: FormEventHandler = event => {
        event.preventDefault()

        forgotPassword({ email, setErrors, setStatus, setLoading })
    }
    return (
        <AuthLayout head="Forgot Password" loading={loading}>
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
                        <Typography level="h3">Forgot Password</Typography>
                    </Stack>
                </Stack>
                {status && (
                    <Alert
                        variant="soft"
                        color="success"
                        startDecorator={<PlaylistAddCheckCircleRoundedIcon />}
                        endDecorator={
                            <IconButton
                                variant="solid"
                                size="sm"
                                color="success"
                                onClick={() => setStatus(null)}>
                                <CloseIcon />
                            </IconButton>
                        }>
                        {status}
                    </Alert>
                )}
                {errors && errors.msg && (
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
                <Stack gap={4} sx={{ mt: 1 }}>
                    <form onSubmit={submitForm}>
                        <FormControl required>
                            <FormLabel>Email</FormLabel>
                            <Input
                                type="email"
                                name="email"
                                placeholder="Your email"
                                value={email}
                                onChange={event => setEmail(event.target.value)}
                            />
                            <Typography
                                level="body-sm"
                                sx={{ textAlign: 'right', pt: 1 }}>
                                Go to{' '}
                                <Link
                                    href="/login
                                        ">
                                    Login
                                </Link>
                            </Typography>
                        </FormControl>
                        <Stack gap={4} sx={{ mt: 2 }}>
                            <Button type="submit" fullWidth disabled={loading}>
                                Email Password Reset Link
                            </Button>
                        </Stack>
                    </form>
                </Stack>
            </Box>
        </AuthLayout>
    )
}
