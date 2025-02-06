import * as React from 'react'
import { createTheme, ThemeOptions, ThemeProvider } from '@mui/material'

import './styles.css'
import './cards/cardStyles.css'
import RdDocButtons, { IRdDocButtonsProps } from './RdDocButtons'

const ThemeProviderWrapper: React.FC<IRdDocButtonsProps> = (props) => {
  const themeOptions: ThemeOptions = {
    palette: {
      mode: 'light',
      primary: {
        main: props.theme.palette?.themePrimary ?? '#f50057',
        contrastText: props.theme.semanticColors?.primaryButtonText
      },
      text: {
        primary: props.theme.semanticColors?.bodyText ?? 'rgba(0, 0, 0, 0.87)',
        secondary: props.theme.semanticColors?.inputPlaceholderText ?? 'rgba(0, 0, 0, 0.6)',
        disabled: props.theme.semanticColors?.disabledText ?? 'rgba(0, 0, 0, 0.38)'
      }
    },
  };

  const theme = createTheme(themeOptions);
  
  return (
    <ThemeProvider theme={theme}>
      <RdDocButtons {...props}/>
    </ThemeProvider>
  )
}

export default ThemeProviderWrapper
