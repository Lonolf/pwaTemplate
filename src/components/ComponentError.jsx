import React from 'react'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import translator from 'utility/translator'

import useCall from 'hooks/callHook'
import { createError } from 'sagas/errorSagas'

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    zIndex: 10000,
    backgroundColor: 'darkred',
    color: 'white',
    padding: 30,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    minHeight: '100vh',
  },
  spacing: {
    height: 10,
    width: '100%',
  },
  stack: {
    maxWidth: 500,
    margin: 10,
    textAlign: 'left',
  },
}),
)

const ComponentPassedDownError = ({ props: { passedDownError, passedDownError: { name, message }, info: { componentStack } } }) => {
  const call = useCall
  const classes = useStyles()

  const error = new Error(message)
  error.name = name
  error.stack = componentStack
  error.code = 'runtimeError'
  call(createError, error)

  return (
    <div className={classes.container}>
      <Typography variant='h3'>{translator.fromLabel('error_passedDownError_title')}</Typography>
      <div className={classes.spacing} />
      <Typography variant='h4'>{translator.fromLabel('error_passedDownError_text')}</Typography>
      <div className={classes.spacing} />
      <Toolbar style={{ justifyContent: 'space-evenly', width: '50%' }}>
        <Button
          variant='contained'
          onClick={() => window.location.reload(true)}
        >
          {translator.fromLabel('error_reload_button')}
        </Button>
      </Toolbar>
      <div className={classes.spacing} />
      <Typography variant='h6'>{name + ': ' + message}</Typography>
      <div className={classes.stack}>
        <Typography variant='body1'>{componentStack}</Typography>
      </div>
    </div>
  )
}

export default ComponentPassedDownError
