import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Stack,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material'
import React, { ReactNode } from 'react'
import { BackButton, SaveButton } from './Buttons'

export const PageContainer = ({ children, sx }: { children: ReactNode | ReactNode[]; sx?: any }) => {
  return <Box sx={{ display: 'flex', flexDirection: 'column', p: 4, ...(sx ?? {}) }}>{children}</Box>
}

export const Panel = ({ children, sx }: any) => {
  return (
    <Box
      sx={{
        backgroundColor: theme => theme.palette.panel.main,
        p: 3,
        borderRadius: theme => theme.constants.radius,
        width: '100%',
        ...sx,
      }}
    >
      {children}
    </Box>
  )
}

export const AccordionContainer = ({
  text,
  accordionContent,
  background,
  conditionalRendering,
}: {
  text?: string
  background?: string
  accordionContent: React.ReactNode
  conditionalRendering?: boolean
}) => {
  const [expanded, setExpanded] = React.useState<boolean>(false)
  const theme = useTheme()
  return (
    <Accordion
      elevation={0}
      expanded={expanded}
      onChange={() => setExpanded(!expanded)}
      sx={{
        border: '1px solid lightGrey',
        margin: '10px 0px',
        borderRadius: '4px',
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <SectionSubtitle text={text || ''} margin='0px' />
      </AccordionSummary>
      <AccordionDetails
        sx={{
          background: background || theme.palette.background.default,
          paddingTop: '20px',
          paddingBottom: '20px',
        }}
      >
        <Stack sx={{ alignItems: 'center' }}>{expanded || !conditionalRendering ? accordionContent : null}</Stack>
      </AccordionDetails>
    </Accordion>
  )
}

export const PageHeader = ({ showBackButton, pageTitle, children, button, toolbarSx }: any) => {
  return (
    <Toolbar
      disableGutters
      sx={{
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 64,
        bgcolor: 'background.paper',
        zIndex: 1200,
        py: 3,
        mb: 0,
        flexShrink: 0,
        flexBasis: 0,
        flexGrow: 0,
        boxSizing: 'border-box',
        ...(toolbarSx ?? {}),
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          flexBasis: 0,
          flexGrow: 1,
        }}
      >
        {showBackButton ? <BackButton edit={false} setEdit={(edit: boolean) => {}} /> : <Box />}
      </Box>
      {pageTitle ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            flexBasis: 0,
            flexGrow: 1,
          }}
        >
          <Typography variant='h4' sx={{ width: '100%', textAlign: 'center', whiteSpace: 'nowrap' }}>
            {pageTitle}
          </Typography>
        </Box>
      ) : null}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          flexBasis: 0,
          flexGrow: 1,
          justifyContent: 'flex-end',
        }}
      >
        {children}
        {button}
      </Box>
    </Toolbar>
  )
}

export const FooterButtonsContainer = ({
  edit,
  setEdit,
  disabled,
  type,
  onClick,
  button,
}: {
  edit: boolean
  setEdit: React.Dispatch<React.SetStateAction<boolean>>
  onClick?: () => void
  button?: React.ReactNode
  type?: string
  disabled?: boolean
}) => {
  return (
    <>
      <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}></Grid>
        <Grid
          item
          xs={4}
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '60px',
          }}
        >
          {edit ? <SaveButton {...{ setEdit, onClick, type, disabled }} /> : button}
        </Grid>
      </Grid>
    </>
  )
}

export const SectionTitle = ({ text, margin }: any) => {
  return (
    <Typography
      variant='h6'
      sx={{
        width: '100%',
        textAlign: 'center',
        m: margin || 'inherit',
        mt: 2,
        mb: 0,
      }}
    >
      {text}
    </Typography>
  )
}

export const SectionSubtitle = ({ text, margin }: { text: string; margin?: string }) => {
  return (
    <Typography
      variant='body1'
      sx={{
        width: '100%',
        textAlign: 'center',
        margin: margin ? { margin } : '20px 0px 10px 0px',
        fontWeight: '600',
      }}
    >
      {text}
    </Typography>
  )
}

export const Space10 = () => {
  return <Box sx={{ width: '100%', height: theme => theme.spacing(1), flexShrink: 0 }} />
}
export const Space20 = () => {
  return <Box sx={{ width: '100%', height: theme => theme.spacing(2), flexShrink: 0 }} />
}
export const Space40 = () => {
  return <Box sx={{ width: '100%', height: theme => theme.spacing(4), flexShrink: 0 }} />
}
