import { createTheme } from '@mui/material/styles'
import { ThemeProvider as MUIThemeProvider, CssBaseline } from '@mui/material'
import React, { ReactNode } from 'react'

// INSTALLATION: https://mui.com/customization/default-theme/#main-content

declare module '@mui/material/styles/createPalette' {
  export interface Palette {
    customColors: {
      [key: string]: string
    }
    panel: {
      main: string
    }
  }
  // allow configuration using `createTheme`
  export interface PaletteOptions {
    customColors?: {
      [key: string]: string
    }
    panel?: {
      main: string
    }
  }
}

declare module '@mui/material/styles/createTheme' {
  export interface Theme {
    constants: {
      radius: string
      boxShadow0: string
      boxShadow3: string
    }
  }
  // allow configuration using `createTheme`
  export interface ThemeOptions {
    constants?: {
      radius: string
      boxShadow0: string
      boxShadow3: string
    }
  }
}

let theme = createTheme({
  constants: {
    radius: '.5rem',
    boxShadow0: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
    boxShadow3: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#357BB7',
      light: '#c2d7e9',
      contrastText: '#fff',
    },
    secondary: {
      main: '#ba68c8',
      light: '#e3c2e9',
      contrastText: '#fff',
    },
    background: {
      default: '#fafafa',
      paper: '#fff',
    },
    panel: {
      main: '#ebf3f9',
    },
    customColors: {
      lightBackground: '#F0F3F5',
      divider: 'lightgrey',
      calendarHighlightSlot: 'lightyellow',
      defaultCaseColor: 'white',
    },
  },
  typography: {
    subtitle: { color: 'gray', fontSize: '14px' },
    h6: { fontWeight: '600' },
  },
} as any)

theme = createTheme(theme, {
  components: {
    MuiButton: {
      styleOverrides: {
        outlined: {
          padding: '6px 16px',
          backgroundColor: theme.palette.customColors.lightBackground,
          color: 'black',
          boxShadow: 'none',
          border: 'none',
          '&:hover': {
            backgroundColor: theme.palette.primary.light,
            border: 'none',
            boxShadow: 'none',
          },
        },
        text: {
          padding: '10px',
          color: 'black',
        },
      },
      defaultProps: {
        variant: 'outlined',
        disableElevation: true,
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fill: theme.palette.primary.main,
        },
      },
      variants: [
        {
          props: { variant: 'disabled' },
          style: {
            fill: 'gray',
          },
        },
      ],
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255,255,255,0.9)',
          borderRadius: '4px',
          padding: '8px 4px',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          input: {
            backgroundColor: '#fff',
          },
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          '&:before': {
            display: 'none',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
        },
      },
    },
  },
} as any)

// TODO find out why it was necessary to provide `children` as a generic argument, it should be injected by React.FC
export const ThemeProvider = ({ children }: { children: ReactNode | ReactNode[] }) => {
  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  )
}
