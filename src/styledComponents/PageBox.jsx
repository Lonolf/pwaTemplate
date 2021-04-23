import { styled } from '@material-ui/core/styles'
import { Paper } from '@material-ui/core'

const PageBox = styled(Paper)(({ padded = true, theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: padded ? `${theme.spacing(3)}px` : 0,
  marginBottom: theme.spacing(2),
  overflow: 'hidden',
}))

export default PageBox
