// import 'tailwindcss/tailwind.css'
import { CssVarsProvider } from '@mui/joy/styles'
// import CssBaseline from '@mui/joy/CssBaseline'

import { StyledEngineProvider } from '@mui/joy/styles'

import {
    experimental_extendTheme as materialExtendTheme,
    Experimental_CssVarsProvider as MaterialCssVarsProvider,
    THEME_ID as MATERIAL_THEME_ID,
} from '@mui/material/styles'
import { CssVarsProvider as JoyCssVarsProvider } from '@mui/joy/styles'
import CssBaseline from '@mui/material/CssBaseline'

const materialTheme = materialExtendTheme()
// import { CssBaseline, ThemeProvider } from '@mui/material'
// import theme from './theme'
import '@/pages/assets/table.css'
import '@fontsource/inter'

// Add the Fontsource Roboto import statements here
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { ReduxStoreProvider } from '@/Redux/ReduxStoreProvider'

const App = ({ Component, pageProps }) => {
    return (
        <ReduxStoreProvider>
            <MaterialCssVarsProvider
                theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
                <JoyCssVarsProvider disableTransitionOnChange>
                    <CssBaseline enableColorScheme />
                    <Component {...pageProps} />
                </JoyCssVarsProvider>
            </MaterialCssVarsProvider>
        </ReduxStoreProvider>

        // <ThemeProvider theme={theme}>
        //     <CssBaseline />
        //     <Component {...pageProps} />
        // </ThemeProvider>
    )
}

export default App
