import { useAuth } from '@/hooks/auth'
import { useEffect, useState, FormEventHandler } from 'react'
import { useRouter } from 'next/router'
import AuthLayout from '@/components/Layouts/AuthLayout'
import {
    Alert,
    Box,
    FormControl,
    FormLabel,
    IconButton,
    Link,
    Stack,
    Typography,
    formLabelClasses,
    Input,
} from '@mui/joy'
import PlaylistAddCheckCircleRoundedIcon from '@mui/icons-material/PlaylistAddCheckCircleRounded'
import WarningIcon from '@mui/icons-material/Warning'
import CloseIcon from '@mui/icons-material/Close'
import Button from '@mui/joy/Button'
import { Grid } from '@mui/material'
import PasswordInput from '@/components/ui-component/Input/PasswordInput'

const PasswordReset = () => {
    const { query } = useRouter()

    const { resetPassword } = useAuth({ middleware: 'guest' })

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [errors, setErrors] = useState<any>([])
    const [status, setStatus] = useState(null)
    const [loading, setLoading] = useState(false)

    const submitForm: FormEventHandler = event => {
        event.preventDefault()

        resetPassword({
            email,
            password,
            password_confirmation: passwordConfirmation,
            setErrors,
            setStatus,
            setLoading,
        })
    }

    useEffect(() => {
        const email = query && query.email ? (query.email as string) : ''

        setEmail(email)
    }, [query.email])

    return (
        <AuthLayout head="Reset Password" loading={loading}>
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
                        <Typography level="h3">Reset Password</Typography>
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
                                disabled
                                name="email"
                                placeholder="Your email"
                                value={email}
                                onChange={event => setEmail(event.target.value)}
                            />
                        </FormControl>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
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
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl required>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <PasswordInput
                                        value={passwordConfirmation}
                                        onChange={event =>
                                            setPasswordConfirmation(
                                                event.target.value,
                                            )
                                        }
                                        name="Confirm password"
                                        placeholder="Confirm password"
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
                            </Grid>
                        </Grid>

                        <Stack gap={4} sx={{ mt: 2 }}>
                            <Button type="submit" fullWidth disabled={loading}>
                                Reset
                            </Button>
                        </Stack>
                    </form>
                </Stack>
            </Box>
        </AuthLayout>
    )
}

export default PasswordReset
