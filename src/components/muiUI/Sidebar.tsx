import * as React from 'react'
import GlobalStyles from '@mui/joy/GlobalStyles'
import Avatar from '@mui/joy/Avatar'
import Box from '@mui/joy/Box'
import Divider from '@mui/joy/Divider'
import IconButton from '@mui/joy/IconButton'
import Input from '@mui/joy/Input'
import List from '@mui/joy/List'
import ListItem from '@mui/joy/ListItem'
import ListItemButton, { listItemButtonClasses } from '@mui/joy/ListItemButton'
import ListItemContent from '@mui/joy/ListItemContent'
import Typography from '@mui/joy/Typography'
import Sheet from '@mui/joy/Sheet'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded'
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices'
import GroupRoundedIcon from '@mui/icons-material/GroupRounded'
import SecurityIcon from '@mui/icons-material/Security'
import SupportRoundedIcon from '@mui/icons-material/SupportRounded'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import BrightnessAutoRoundedIcon from '@mui/icons-material/BrightnessAutoRounded'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { useAuth } from '@/hooks/auth'

import ColorSchemeToggle from '@/components/muiUI/ColorSchemeToggle'
import { closeSidebar } from '@/utils/muiUtils'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { AppName } from '@/utils/constans'
import { useSelector } from 'react-redux'

function Toggler({
    defaultExpanded = false,
    renderToggle,
    children,
}: {
    defaultExpanded?: boolean
    children: React.ReactNode
    renderToggle: (params: {
        open: boolean
        setOpen: React.Dispatch<React.SetStateAction<boolean>>
    }) => React.ReactNode
}) {
    const [open, setOpen] = React.useState(defaultExpanded)
    return (
        <React.Fragment>
            {renderToggle({ open, setOpen })}
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateRows: open ? '1fr' : '0fr',
                    transition: '0.2s ease',
                    '& > *': {
                        overflow: 'hidden',
                    },
                }}>
                {children}
            </Box>
        </React.Fragment>
    )
}

export default function Sidebar() {
    const router = useRouter()
    const { user, systemAdmin, logout } = useAuth({ middleware: 'auth' })
    const roles: string[] = useSelector(
        (state: any) => state.userManagerSlice.authorization.roles,
    )
    const handleListItemClick = (href: string) => {
        router.push(href)
    }
    return (
        <Sheet
            className="Sidebar"
            sx={{
                position: {
                    xs: 'fixed',
                    md: 'sticky',
                },
                transform: {
                    xs:
                        'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
                    md: 'none',
                },
                transition: 'transform 0.4s, width 0.4s',
                zIndex: 'auto',
                height: '100dvh',
                width: 'var(--Sidebar-width)',
                top: 0,
                p: 2,
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                borderRight: '1px solid',
                borderColor: 'divider',
            }}>
            <GlobalStyles
                styles={theme => ({
                    ':root': {
                        '--Sidebar-width': '220px',
                        [theme.breakpoints.up('lg')]: {
                            '--Sidebar-width': '240px',
                        },
                    },
                })}
            />
            <Box
                className="Sidebar-overlay"
                sx={{
                    position: 'fixed',
                    zIndex: 9998,
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    opacity: 'var(--SideNavigation-slideIn)',
                    backgroundColor: 'var(--joy-palette-background-backdrop)',
                    transition: 'opacity 0.4s',
                    transform: {
                        xs:
                            'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))',
                        lg: 'translateX(-100%)',
                    },
                }}
                onClick={() => closeSidebar()}
            />
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <IconButton variant="soft" color="primary" size="sm">
                    <BrightnessAutoRoundedIcon />
                </IconButton>
                <Typography level="title-lg">{AppName}</Typography>
                <ColorSchemeToggle sx={{ ml: 'auto' }} />
            </Box>
            <Input
                size="sm"
                startDecorator={<SearchRoundedIcon />}
                placeholder="Search"
            />
            <Box
                sx={{
                    minHeight: 0,
                    overflow: 'hidden auto',
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    [`& .${listItemButtonClasses.root}`]: {
                        gap: 1.5,
                    },
                }}>
                <List
                    size="sm"
                    sx={{
                        gap: 1,
                        '--List-nestedInsetStart': '30px',
                        '--ListItem-radius': theme => theme.vars.radius.sm,
                    }}>
                    <ListItem>
                        <ListItemButton
                            onClick={() => handleListItemClick('/home')}
                            selected={router.pathname === '/home'}>
                            <HomeRoundedIcon />
                            <ListItemContent>
                                <Typography level="title-sm">Home</Typography>
                            </ListItemContent>
                        </ListItemButton>
                    </ListItem>

                    <ListItem>
                        <ListItemButton
                            onClick={() => handleListItemClick('/dashboard')}
                            selected={router.pathname === '/dashboard'}>
                            <DashboardRoundedIcon />
                            <ListItemContent>
                                <Typography level="title-sm">
                                    Dashboard
                                </Typography>
                            </ListItemContent>
                        </ListItemButton>
                    </ListItem>
                    {roles.includes('SystemAdmin') && (
                        <ListItem>
                            <ListItemButton
                                onClick={() => handleListItemClick('/service')}
                                selected={router.pathname === '/service'}>
                                <MiscellaneousServicesIcon />
                                <ListItemContent>
                                    <Typography level="title-sm">
                                        Service
                                    </Typography>
                                </ListItemContent>
                            </ListItemButton>
                        </ListItem>
                    )}

                    {/* <ListItem>
                        <ListItemButton>
                            <ShoppingCartRoundedIcon />
                            <ListItemContent>
                                <Typography level="title-sm">Orders</Typography>
                            </ListItemContent>
                        </ListItemButton>
                    </ListItem> */}

                    <ListItem nested>
                        <Toggler
                            renderToggle={({ open, setOpen }) => (
                                <ListItemButton onClick={() => setOpen(!open)}>
                                    <GroupRoundedIcon />
                                    <ListItemContent>
                                        <Typography level="title-sm">
                                            Users
                                        </Typography>
                                    </ListItemContent>
                                    <KeyboardArrowDownIcon
                                        sx={{
                                            transform: open
                                                ? 'rotate(180deg)'
                                                : 'none',
                                        }}
                                    />
                                </ListItemButton>
                            )}
                            defaultExpanded={
                                router.pathname === '/profile' ||
                                router.pathname === '/users' ||
                                router.pathname === '/users/register' ||
                                router.pathname.startsWith('/users/details')
                            }>
                            <List sx={{ gap: 0.5 }}>
                                <ListItem sx={{ mt: 0.5 }}>
                                    <ListItemButton
                                        role="menuitem"
                                        component="a"
                                        selected={
                                            router.pathname === '/profile'
                                        }
                                        onClick={() =>
                                            handleListItemClick('/profile')
                                        }>
                                        My profile
                                    </ListItemButton>
                                </ListItem>

                                {(roles.includes('SystemAdmin') ||
                                    roles.includes('GlobalAdmin')) && (
                                    <>
                                        <ListItem sx={{ mt: 0.5 }}>
                                            <ListItemButton
                                                role="menuitem"
                                                component="a"
                                                selected={
                                                    router.pathname ===
                                                        '/users' ||
                                                    router.pathname.startsWith(
                                                        '/users/details/',
                                                    )
                                                }
                                                onClick={() =>
                                                    handleListItemClick(
                                                        '/users',
                                                    )
                                                }>
                                                Users
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem sx={{ mt: 0.5 }}>
                                            <ListItemButton
                                                role="menuitem"
                                                component="a"
                                                selected={
                                                    router.pathname ===
                                                        '/users/register' ||
                                                    router.pathname.startsWith(
                                                        '/users/details/',
                                                    )
                                                }
                                                onClick={() =>
                                                    handleListItemClick(
                                                        '/users/register',
                                                    )
                                                }>
                                                Add User
                                            </ListItemButton>
                                        </ListItem>
                                    </>
                                )}
                            </List>
                        </Toggler>
                    </ListItem>

                    {(roles.includes('SystemAdmin') ||
                        roles.includes('GlobalAdmin')) && (
                        <ListItem nested>
                            <Toggler
                                renderToggle={({ open, setOpen }) => (
                                    <ListItemButton
                                        onClick={() => setOpen(!open)}>
                                        <SecurityIcon />
                                        <ListItemContent>
                                            <Typography level="title-sm">
                                                Roles & Permission
                                            </Typography>
                                        </ListItemContent>
                                        <KeyboardArrowDownIcon
                                            sx={{
                                                transform: open
                                                    ? 'rotate(180deg)'
                                                    : 'none',
                                            }}
                                        />
                                    </ListItemButton>
                                )}
                                defaultExpanded={
                                    router.pathname === '/roles' ||
                                    router.pathname === '/permissions'
                                }>
                                <List sx={{ gap: 0.5 }}>
                                    <ListItem sx={{ mt: 0.5 }}>
                                        <ListItemButton
                                            role="menuitem"
                                            component="a"
                                            selected={
                                                router.pathname === '/roles'
                                            }
                                            onClick={() =>
                                                handleListItemClick('/roles')
                                            }>
                                            Roles
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem sx={{ mt: 0.5 }}>
                                        <ListItemButton
                                            role="menuitem"
                                            component="a"
                                            selected={
                                                router.pathname ===
                                                '/permissions'
                                            }
                                            onClick={() =>
                                                handleListItemClick(
                                                    '/permissions',
                                                )
                                            }>
                                            Permissions
                                        </ListItemButton>
                                    </ListItem>
                                </List>
                            </Toggler>
                        </ListItem>
                    )}
                </List>

                <List
                    size="sm"
                    sx={{
                        mt: 'auto',
                        flexGrow: 0,
                        '--ListItem-radius': theme => theme.vars.radius.sm,
                        '--List-gap': '8px',
                        mb: 2,
                    }}>
                    <ListItem>
                        <ListItemButton>
                            <SupportRoundedIcon />
                            Support
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton>
                            <SettingsRoundedIcon />
                            Settings
                        </ListItemButton>
                    </ListItem>
                </List>
                {/* <Card
                    invertedColors
                    variant="soft"
                    color="warning"
                    size="sm"
                    sx={{ boxShadow: 'none' }}>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center">
                        <Typography level="title-sm">Used space</Typography>
                        <IconButton size="sm">
                            <CloseRoundedIcon />
                        </IconButton>
                    </Stack>
                    <Typography level="body-xs">
                        Your team has used 80% of your available space. Need
                        more?
                    </Typography>
                    <LinearProgress
                        variant="outlined"
                        value={80}
                        determinate
                        sx={{ my: 1 }}
                    />
                    <Button size="sm" variant="solid">
                        Upgrade plan
                    </Button>
                </Card> */}
            </Box>
            <Divider />
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Avatar
                    variant="outlined"
                    size="sm"
                    src={user?.profile_photo_url}
                />
                <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography level="title-sm">{user?.name}</Typography>
                    <Typography level="body-xs">{user?.email}</Typography>
                </Box>
                <IconButton size="sm" variant="plain" color="neutral">
                    <LogoutRoundedIcon onClick={logout} />
                </IconButton>
            </Box>
        </Sheet>
    )
}
