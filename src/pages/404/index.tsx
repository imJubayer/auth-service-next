// // material-ui
// import { useTheme, styled } from '@mui/material/styles'
// import { Button, Card, CardContent, Grid, Typography } from '@mui/joy'

// // project imports

// // assets
// import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone'

// import imageBackground from 'assets/images/maintenance/img-bg-grid.svg'
// import { useRouter } from 'next/router'

// // styles
// const CardMediaWrapper = styled('div')({
//     maxWidth: 720,
//     margin: '0 auto',
//     position: 'relative',
// })

// const PageContentWrapper = styled('div')({
//     maxWidth: 350,
//     margin: '0 auto',
//     textAlign: 'center',
// })

// const ConstructionCard = styled(Card)({
//     minHeight: '100vh',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
// })

// const CardMediaBuild = styled('img')({
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     width: '100%',
//     animation: '5s bounce ease-in-out infinite',
// })

// const CardMediaParts = styled('img')({
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     width: '100%',
//     animation: '10s blink ease-in-out infinite',
// })

// // ========================|| UNDER CONSTRUCTION PAGE ||======================== //

// const UnderConstruction = () => {
//     const theme = useTheme()
//     const router = useRouter()

//     return (
//         <ConstructionCard>
//             <CardContent>
//                 <Grid container justifyContent="center" spacing={2}>
//                     <Grid xs={12}>
//                         <CardMediaWrapper>
//                             {/* <CardMedia
//                                 component="img"
//                                 image={
//                                     theme.palette.mode === 'dark'
//                                         ? imageDarkBackground
//                                         : imageBackground
//                                 }
//                                 title="Slider 3 image"
//                             /> */}
//                             <img
//                                 src={imageBackground}
//                                 srcSet={imageBackground}
//                                 loading="lazy"
//                                 alt=""
//                             />
//                         </CardMediaWrapper>
//                     </Grid>
//                     <Grid xs={12}>
//                         <PageContentWrapper>
//                             <Grid container spacing={2}>
//                                 <Grid xs={12}>
//                                     <Typography level="body-md" component="div">
//                                         Under Construction
//                                     </Typography>
//                                 </Grid>
//                                 <Grid xs={12}>
//                                     <Typography level="body-md">
//                                         This site is on under construction!!
//                                         Please check after some time
//                                     </Typography>
//                                 </Grid>
//                                 <Grid xs={12}>
//                                     <Button
//                                         onClick={() => router.push('/home')}>
//                                         <HomeTwoToneIcon
//                                             sx={{
//                                                 fontSize: '1.3rem',
//                                                 mr: 0.75,
//                                             }}
//                                         />{' '}
//                                         Home
//                                     </Button>
//                                 </Grid>
//                             </Grid>
//                         </PageContentWrapper>
//                     </Grid>
//                 </Grid>
//             </CardContent>
//         </ConstructionCard>
//     )
// }

// export default UnderConstruction

// material-ui
import { useRouter } from 'next/router'
import { useTheme, styled } from '@mui/material/styles'
import {
    Button,
    Card,
    CardContent,
    CardMedia,
    Grid,
    Typography,
} from '@mui/material'

// project imports
// import config from 'config'
// import AnimateButton from 'ui-component/extended/AnimateButton'
// import { gridSpacing } from 'store/constant'
import Image from 'next/image'

// assets
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone'

import imageBackground from '../../assets/images/maintenance/img-error-bg.svg'
import imageDarkBackground from '@/assets/images/maintenance/img-error-bg-dark.svg'
import imageBlue from '@/assets/images/maintenance/img-error-blue.svg'
import imageText from '@/assets/images/maintenance/img-error-text.svg'
import imagePurple from '@/assets/images/maintenance/img-error-purple.svg'

import Img from '@/assets/images/maintenance/img-error-bg.svg'

// styles
const CardMediaWrapper = styled('div')({
    maxWidth: 720,
    margin: '0 auto',
    position: 'relative',
})

const ErrorWrapper = styled('div')({
    maxWidth: 350,
    margin: '0 auto',
    textAlign: 'center',
})

const ErrorCard = styled(Card)({
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
})

const CardMediaBlock = styled(Image)({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    animation: '3s bounce ease-in-out infinite',
})

const CardMediaBlue = styled(Image)({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    animation: '15s wings ease-in-out infinite',
})

const CardMediaPurple = styled(Image)({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    animation: '12s wings ease-in-out infinite',
})

// ==============================|| ERROR PAGE ||============================== //

const UnderConstruction = () => {
    const theme = useTheme()
    const router = useRouter()

    return (
        <ErrorCard>
            <CardContent>
                <Grid container justifyContent="center" spacing={2}>
                    <Grid item xs={12}>
                        <CardMediaWrapper>
                            {/* <CardMedia
                                component="img"
                                image={imageBackground}
                                title="Slider5 image"
                            /> */}
                            <Image
                                src={imageBackground}
                                alt="Picture of the author"
                                // width={500} automatically provided
                                // height={500} automatically provided
                                // blurDataURL="data:..." automatically provided
                                // placeholder="blur" // Optional blur-up while loading
                            />
                            <CardMediaBlock
                                src={imageText}
                                alt="Slider 1"
                                title="Slider 1 image"
                            />
                            <CardMediaBlue
                                src={imageBlue}
                                alt="Slider 2"
                                title="Slider 2 image"
                            />
                            <CardMediaPurple
                                src={imagePurple}
                                alt="Slider 3"
                                title="Slider 3 image"
                            />
                        </CardMediaWrapper>
                    </Grid>
                    <Grid item xs={12}>
                        <ErrorWrapper>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant="h4" component="div">
                                        Something is wrong
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body2">
                                        The page you are looking was moved,
                                        removed, renamed, or might never exist!{' '}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        variant="contained"
                                        onClick={() => router.push('/home')}>
                                        <HomeTwoToneIcon
                                            sx={{
                                                fontSize: '1.3rem',
                                                mr: 0.75,
                                            }}
                                        />{' '}
                                        Home
                                    </Button>
                                </Grid>
                            </Grid>
                        </ErrorWrapper>
                    </Grid>
                </Grid>
            </CardContent>
        </ErrorCard>
    )
}

export default UnderConstruction
