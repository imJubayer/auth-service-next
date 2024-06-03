import * as React from 'react'
import Box from '@mui/joy/Box'
import Button from '@mui/joy/Button'
import Divider from '@mui/joy/Divider'
import FormHelperText from '@mui/joy/FormHelperText'
import Textarea from '@mui/joy/Textarea'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'
import Tabs from '@mui/joy/Tabs'
import TabList from '@mui/joy/TabList'
import Tab, { tabClasses } from '@mui/joy/Tab'
import Card from '@mui/joy/Card'
import CardActions from '@mui/joy/CardActions'
import CardOverflow from '@mui/joy/CardOverflow'
import DashboardLayout from '@/components/Layouts/DashboardLayout'
import { useAuth } from '@/hooks/auth'
import { Breadcrumb } from '@/types/common'
import UserEditForm from '@/components/User/EditForm'
import { Grid, TabPanel } from '@mui/joy'
import ChangePassword from './ChangePassword'

const breadcrumbs: Breadcrumb[] = [
    { label: 'Users', link: '/users' },
    { label: 'Add New User', link: '#', isLast: true },
]

export default function MyProfile() {
    const { user } = useAuth({ middleware: 'auth' })
    const [loading, setLoading] = React.useState(false)

    const tabs = (
        // <Tabs
        //     defaultValue={0}
        //     sx={{
        //         bgcolor: 'transparent',
        //         marginLeft: 1,
        //     }}>

        // </Tabs>
        <>
            <TabList
                tabFlex={1}
                size="sm"
                sx={{
                    ml: {
                        xs: 3,
                        md: 8,
                    },
                    pl: {
                        xs: 0,
                        md: 4,
                    },
                    justifyContent: 'left',
                    [`&& .${tabClasses.root}`]: {
                        flex: 'initial',
                        bgcolor: 'transparent',
                        [`&.${tabClasses.selected}`]: {
                            fontWeight: '900',
                            '&::after': {
                                height: '2px',
                                bgcolor: 'primary.500',
                            },
                        },
                    },
                }}>
                <Tab
                    sx={{ borderRadius: '6px 6px 0 0' }}
                    indicatorInset
                    value={0}>
                    Settings
                </Tab>
                <Tab
                    sx={{ borderRadius: '6px 6px 0 0' }}
                    indicatorInset
                    value={1}>
                    Change Password
                </Tab>
                <Tab
                    sx={{ borderRadius: '6px 6px 0 0' }}
                    indicatorInset
                    value={2}>
                    Team
                </Tab>
            </TabList>
        </>
    )
    return (
        <Tabs
            defaultValue={0}
            sx={{
                bgcolor: 'transparent',
                margin: 0,
            }}>
            <DashboardLayout
                head="Profile"
                breadcrumbs={breadcrumbs}
                title="Profile"
                loading={loading}
                tabs={tabs}>
                <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    direction="column"
                    spacing={2}>
                    {/* <Grid xs={12}>{tabs}</Grid> */}

                    <TabPanel value={0} sx={{ width: '100%' }}>
                        <Grid xs={12}>
                            <UserEditForm user={user} isProfileUpdate={true} />
                        </Grid>
                        <Grid xs={12}>
                            <Card>
                                <Box sx={{ mb: 1 }}>
                                    <Typography level="title-md">
                                        Bio
                                    </Typography>
                                    <Typography level="body-sm">
                                        Write a short introduction to be
                                        displayed on your profile
                                    </Typography>
                                </Box>
                                <Divider />
                                <Stack spacing={2} sx={{ my: 1 }}>
                                    {/* <EditorToolbar /> */}
                                    <Textarea
                                        size="sm"
                                        minRows={4}
                                        sx={{ mt: 1.5 }}
                                        defaultValue="I'm a software developer based in Bangkok, Thailand. My goal is to solve UI problems with neat CSS without using too much JavaScript."
                                    />
                                    <FormHelperText
                                        sx={{ mt: 0.75, fontSize: 'xs' }}>
                                        275 characters left
                                    </FormHelperText>
                                </Stack>
                                <CardOverflow
                                    sx={{
                                        borderTop: '1px solid',
                                        borderColor: 'divider',
                                    }}>
                                    <CardActions
                                        sx={{ alignSelf: 'flex-end', pt: 2 }}>
                                        <Button
                                            size="sm"
                                            variant="outlined"
                                            color="neutral">
                                            Cancel
                                        </Button>
                                        <Button size="sm" variant="solid">
                                            Save
                                        </Button>
                                    </CardActions>
                                </CardOverflow>
                            </Card>
                        </Grid>
                    </TabPanel>
                    <TabPanel value={1}>
                        <ChangePassword
                            setLoading={(value: boolean) => setLoading(value)}
                        />
                        {/* <Grid xs={12}>
                            <Typography level="h4">Password</Typography>
                        </Grid> */}
                    </TabPanel>
                    <TabPanel value={2}>
                        <Grid xs={12}>
                            <Typography level="h4">Team panel</Typography>
                        </Grid>
                    </TabPanel>
                </Grid>
            </DashboardLayout>
        </Tabs>
    )
}
