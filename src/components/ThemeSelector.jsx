import React from 'react'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'

const headingFont = 'Tahoma, sans-serif'
const font = 'Nunito, sans-serif'

const theme = createMuiTheme({
  MuiContainer: {
    root: {
      padding: 8,
    },
  },
  MuiDialog: {
    paper: {
      padding: 24,
    },
    root: {
      backgroundColor: 'rgba(115, 139, 140, 0.1)',
    },
  },
  MuiToolbar: {
    root: {
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'stretch',
      textAlign: 'center',
    },
  },
  palette: {
    primary: { main: '#009688' },
    secondary: { main: '#00bcd4', contrastText: '#fff' },
  },
  typography: {
    fontFamily: font,
    h1: { fontSize: '2.5rem', fontFamily: headingFont },
    h2: { fontSize: '2.25rem', fontFamily: headingFont },
    h3: { fontSize: '2rem', fontFamily: headingFont },
    h4: { fontSize: '1.5rem', fontFamily: headingFont },
    h5: { fontSize: '1.25rem', fontFamily: headingFont },
    h6: { fontSize: '1rem', fontFamily: headingFont },
    subtitle1: { fontSize: '0.75rem', fontFamily: headingFont },
  },
})

const ThemeSelector = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}

export default ThemeSelector
