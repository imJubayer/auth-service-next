import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useState, FormEventHandler } from 'react'

import * as React from 'react'
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles'
import GlobalStyles from '@mui/joy/GlobalStyles'
import CssBaseline from '@mui/joy/CssBaseline'
import Box from '@mui/joy/Box'
import Button from '@mui/joy/Button'
import FormControl from '@mui/joy/FormControl'
import FormLabel, { formLabelClasses } from '@mui/joy/FormLabel'
import IconButton, { IconButtonProps } from '@mui/joy/IconButton'
import Input from '@mui/joy/Input'
import Typography from '@mui/joy/Typography'
import Stack from '@mui/joy/Stack'
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded'
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded'
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded'
import Head from 'next/head'
import PlaylistAddCheckCircleRoundedIcon from '@mui/icons-material/PlaylistAddCheckCircleRounded'
import { Alert } from '@mui/joy'
import WarningIcon from '@mui/icons-material/Warning'
import CloseIcon from '@mui/icons-material/Close'
import { Backdrop, CircularProgress } from '@mui/material'

interface FormElements extends HTMLFormControlsCollection {
    email: HTMLInputElement
    password: HTMLInputElement
    persistent: HTMLInputElement
}
interface SignInFormElement extends HTMLFormElement {
    readonly elements: FormElements
}

interface AuthLayoutProps {
    head?: string
    children: React.ReactNode
    loading?: boolean
}

function ColorSchemeToggle(props: IconButtonProps) {
    const { onClick, ...other } = props
    const { mode, setMode } = useColorScheme()
    const [mounted, setMounted] = React.useState(false)
    React.useEffect(() => {
        setMounted(true)
    }, [])
    if (!mounted) {
        return (
            <IconButton size="sm" variant="outlined" color="neutral" disabled />
        )
    }
    return (
        <IconButton
            id="toggle-mode"
            size="sm"
            variant="outlined"
            color="neutral"
            aria-label="toggle light/dark mode"
            {...other}
            onClick={event => {
                if (mode === 'light') {
                    setMode('dark')
                } else {
                    setMode('light')
                }
                onClick?.(event)
            }}>
            {mode === 'light' ? (
                <DarkModeRoundedIcon />
            ) : (
                <LightModeRoundedIcon />
            )}
        </IconButton>
    )
}

export default function AuthLayout({
    head,
    loading,
    children,
}: AuthLayoutProps) {
    return (
        <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
            <CssBaseline />
            <Head>
                <title>Soluta {head && `| ${head}`}</title>
            </Head>
            <GlobalStyles
                styles={{
                    ':root': {
                        '--Collapsed-breakpoint': '769px', // form will stretch when viewport is below `769px`
                        '--Cover-width': '50vw', // must be `vw` only
                        '--Form-maxWidth': '800px',
                        '--Transition-duration': '0.4s', // set to `none` to disable transition
                    },
                }}
            />
            <Box>
                <Backdrop
                    sx={{
                        color: '#fff',
                        zIndex: theme => theme.zIndex.drawer + 1,
                    }}
                    open={loading}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                <Box
                    sx={theme => ({
                        width:
                            'clamp(100vw - var(--Cover-width), (var(--Collapsed-breakpoint) - 100vw) * 999, 100vw)',
                        transition: 'width var(--Transition-duration)',
                        transitionDelay:
                            'calc(var(--Transition-duration) + 0.1s)',
                        position: 'relative',
                        zIndex: 1,
                        display: 'flex',
                        justifyContent: 'flex-end',
                        backdropFilter: 'blur(12px)',
                        backgroundColor: 'rgba(255 255 255 / 0.2)',
                        [theme.getColorSchemeSelector('dark')]: {
                            backgroundColor: 'rgba(19 19 24 / 0.4)',
                        },
                    })}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            minHeight: '100dvh',
                            width:
                                'clamp(var(--Form-maxWidth), (var(--Collapsed-breakpoint) - 100vw) * 999, 100%)',
                            maxWidth: '100%',
                            px: 2,
                        }}>
                        <Box
                            component="header"
                            sx={{
                                py: 3,
                                display: 'flex',
                                alignItems: 'left',
                                justifyContent: 'space-between',
                            }}>
                            <Box
                                sx={{
                                    gap: 2,
                                    display: 'flex',
                                    alignItems: 'center',
                                }}>
                                <IconButton
                                    variant="soft"
                                    color="primary"
                                    size="sm">
                                    <BadgeRoundedIcon />
                                </IconButton>
                                <Typography level="title-lg">Soluta</Typography>
                            </Box>
                            <ColorSchemeToggle />
                        </Box>
                        {/* <Box
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
                                    <Typography level="h3">
                                        Forgot Password
                                    </Typography>
                                </Stack>
                            </Stack>
                            {status && (
                                <Alert
                                    variant="soft"
                                    color="success"
                                    startDecorator={
                                        <PlaylistAddCheckCircleRoundedIcon />
                                    }
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
                                            onChange={event =>
                                                setEmail(event.target.value)
                                            }
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
                                        <Button
                                            type="submit"
                                            fullWidth
                                            disabled={loading}>
                                            Email Password Reset Link
                                        </Button>
                                    </Stack>
                                </form>
                            </Stack>
                        </Box> */}
                        {children}
                        <Box component="footer" sx={{ py: 3 }}>
                            <Typography level="body-xs" textAlign="center">
                                © Soluta-ag {new Date().getFullYear()}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Box
                    sx={theme => ({
                        height: '100%',
                        position: 'fixed',
                        right: 0,
                        top: 0,
                        bottom: 0,
                        left:
                            'clamp(0px, (100vw - var(--Collapsed-breakpoint)) * 999, 100vw - var(--Cover-width))',
                        transition:
                            'background-image var(--Transition-duration), left var(--Transition-duration) !important',
                        transitionDelay:
                            'calc(var(--Transition-duration) + 0.1s)',
                        backgroundColor: 'background.level1',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundImage:
                            'url(https://cdn.pixabay.com/photo/2016/11/14/04/19/for-pets-1822576_1280.jpg)',
                        [theme.getColorSchemeSelector('dark')]: {
                            backgroundImage:
                                'url(https://cdn.pixabay.com/photo/2020/07/12/02/34/moon-5395836_1280.jpg)',
                        },
                    })}
                />
            </Box>
        </CssVarsProvider>
    )
}
