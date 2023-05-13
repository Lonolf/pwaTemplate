import React, { ReactNode, SyntheticEvent, useEffect } from 'react'
import {
  Autocomplete,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Typography,
  InputLabel,
  Select,
  Stack,
  Grid,
  TextField,
  MenuItem,
  Checkbox,
  InputAdornment,
  useTheme,
  IconButton,
  Toolbar,
  TextFieldProps,
  SelectProps,
  AutocompleteChangeReason,
  AutocompleteChangeDetails,
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { BackButton, DefaultButton, EditButton, SaveButton, TextIconButton } from './Buttons'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import NavigateBeforeOutlinedIcon from '@mui/icons-material/NavigateBeforeOutlined'
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined'
import SearchIcon from '@mui/icons-material/Search'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import FolderOpenIcon from '@mui/icons-material/FolderOpen'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { routes } from 'routes/routes'
import CloseIcon from '@mui/icons-material/Close'
import {
  DatePicker,
  DatePickerProps,
  DateTimePicker,
  DesktopDatePicker,
  DesktopDateTimePicker,
  PickersDay,
  PickersDayProps,
  StaticDatePicker,
  StaticDatePickerProps,
  TimePicker,
} from '@mui/x-date-pickers'
import { endOfDay, format, isAfter, isBefore, isValid, startOfDay } from 'date-fns'
import { Role, IUser, getFullName, trlb } from '@empty/lib.constants'
import { useLocation, useNavigate } from 'react-router'
import { FormikErrors, FormikProps, FormikTouched } from 'formik'
import TimestampPicker from 'pages/CaseDetails/components/TimestampPicker'

interface ContainerProps {
  children: ReactNode | ReactNode[]
  sx?: any
}

export const PageContainer = ({ children, sx }: ContainerProps) => {
  return <Box sx={{ display: 'flex', flexDirection: 'column', p: 4, ...(sx ?? {}) }}>{children}</Box>
}

interface FormContainerProps extends ContainerProps {
  onSubmit: () => void
}

export const FormContainer = ({ children, onSubmit }: FormContainerProps) => {
  return (
    <form onSubmit={onSubmit}>
      <Box sx={{ display: 'flex', flexDirection: 'column', p: 4 }}>{children}</Box>
    </form>
  )
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

export const SchedulingHeader = ({
  showBackButton,
  pageTitle,
  edit,
  setEdit,
  openSidebar,
  setOpenSidebar,
  children,
}) => {
  return (
    <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <Grid item xs={4}>
        {showBackButton || (!showBackButton && edit) ? <BackButton {...{ edit, setEdit }} /> : null}
      </Grid>
      <Grid item xs={4}>
        <Typography variant='h4' sx={{ width: '100%', textAlign: 'center' }}>
          {pageTitle}
        </Typography>
      </Grid>
      <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        {children}
        <Button variant='contained' onClick={() => setOpenSidebar(!openSidebar)}>
          {openSidebar ? (
            <NavigateNextOutlinedIcon sx={{ fill: theme => theme.palette.primary.contrastText }} />
          ) : (
            <NavigateBeforeOutlinedIcon sx={{ fill: theme => theme.palette.primary.contrastText }} />
          )}
        </Button>
      </Grid>
    </Grid>
  )
}

export interface AccordionContainerProps {
  text?: string
  background?: string
  accordionContent: React.ReactNode
  conditionalRendering?: boolean
}

export const AccordionContainer = ({
  text,
  accordionContent,
  background,
  conditionalRendering,
}: AccordionContainerProps) => {
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

interface FooterButtonsContainerProps {
  edit: boolean
  setEdit: React.Dispatch<React.SetStateAction<boolean>>
  onClick?: () => void
  button?: React.ReactNode
  type?: string
  disabled?: boolean
}

export const FooterButtonsContainer: React.FC<FooterButtonsContainerProps> = ({
  edit,
  setEdit,
  disabled,
  type,
  onClick,
  button,
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

export type GridTextFieldProps = TextFieldProps & {
  xs: number
  searchIcon?: boolean
}

export const GridTextField = ({ xs, label, value, error, searchIcon, ...props }: GridTextFieldProps) => {
  return (
    <Grid item xs={xs} sx={{ display: 'flex', justifyContent: 'center' }}>
      <TextField
        label={label}
        variant='outlined'
        sx={{ width: '100%' }}
        value={value}
        error={!!error}
        helperText={error}
        InputProps={{
          startAdornment: searchIcon ? (
            <InputAdornment position='start'>
              <IconButton edge='start'>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ) : null,
        }}
        {...props}
      />
    </Grid>
  )
}

export const FormikGridTextField = ({ xs, label, values, form, section, touched, errors, name, ...props }) => {
  return (
    <Grid item xs={xs} sx={{ display: 'flex', justifyContent: 'center' }}>
      <TextField
        label={label}
        variant='outlined'
        sx={{ width: '100%' }}
        name={section ? section + '.' + name : name}
        value={values?.[name] ?? ''}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        error={Boolean(errors?.[name] && touched?.[name])}
        helperText={touched?.[name] ? errors?.[name] : null}
        {...props}
      />
    </Grid>
  )
}

type FormikGridSelectProps = Omit<TextFieldProps, 'variant'> & {
  xs: number
  label: string
  form: FormikProps<any>
  section: string
  touched?: FormikTouched<any>
  errors?: FormikErrors<any>
  name: string
  menuItems: { label: string; value: string | number }[]
  values: Record<string, any>
}

export const FormikGridSelect: React.FC<FormikGridSelectProps> = ({
  xs,
  label,
  values,
  form,
  section,
  touched,
  errors,
  name,
  menuItems,
  ...props
}) => {
  return (
    <Grid container item xs={xs} sx={{ display: 'flex', justifyContent: 'center' }}>
      <TextField
        label={label}
        select
        variant='outlined'
        sx={{ width: '100%' }}
        name={section ? section + '.' + name : name}
        value={values[name]}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        error={Boolean(errors?.[name] && touched?.[name])}
        helperText={touched?.[name] ? <>{trlb(errors?.[name])}</> : null}
        {...props}
      >
        {menuItems?.map(menuItem => (
          <MenuItem value={menuItem.value} key={menuItem.value}>
            {trlb(menuItem.label)}
          </MenuItem>
        ))}
      </TextField>
    </Grid>
  )
}

type GridSelectProps = SelectProps & {
  xs: number
  label?: string
  name: string
  menuItems: { label: string; value: string | number }[]
  background?: string
  helperText?: string
  value?: string
}

export const GridSelect: React.FC<GridSelectProps> = ({
  xs,
  label,
  menuItems,
  value,
  onChange,
  background,
  helperText,
  disabled = false,
  ...props
}) => {
  return (
    <Grid container item xs={xs} sx={{ display: 'flex', justifyContent: 'center' }}>
      <FormControl sx={{ width: '100%' }} disabled={disabled} error={props.error}>
        <InputLabel>{label}</InputLabel>
        <Select
          sx={{ background: background || null }}
          id={label}
          label={label}
          value={value}
          onChange={onChange}
          {...props}
        >
          {menuItems.map(menuItem => {
            return (
              <MenuItem
                value={menuItem.value}
                key={menuItem.value}
                style={{ display: value === menuItem.value ? 'none' : 'block' }}
              >
                {menuItem.label}
              </MenuItem>
            )
          })}
        </Select>
        <FormHelperText>{helperText}</FormHelperText>
      </FormControl>
    </Grid>
  )
}

export const RoleSelect = ({ xs, label, roles, value, onChange, background, helperText, ...props }: any) => {
  return (
    <Grid container item xs={xs} sx={{ display: 'flex', justifyContent: 'center' }}>
      <FormControl sx={{ width: '100%' }}>
        <InputLabel>{label}</InputLabel>
        <Select
          sx={{ background: background || null }}
          id={label}
          label={label}
          value={value}
          onChange={onChange}
          {...props}
        >
          {roles.map((role: Role) => {
            return (
              <MenuItem key={role.id} value={role.id}>
                {role.name}
              </MenuItem>
            )
          })}
        </Select>
        <Typography variant='caption' color='textSecondary'>
          {helperText}
        </Typography>
      </FormControl>
    </Grid>
  )
}

export const UserSelect = ({ xs, label, users, value, onChange, background, helperText, ...props }: any) => {
  return (
    <Grid container item xs={xs} sx={{ display: 'flex', justifyContent: 'center' }}>
      <FormControl sx={{ width: '100%' }}>
        <InputLabel>{label}</InputLabel>
        <Select
          sx={{ background: background || null }}
          id={label}
          label={label}
          value={value}
          onChange={onChange}
          {...props}
        >
          {users.map((user: IUser) => {
            return (
              <MenuItem key={user.id} value={user.id}>
                {getFullName(user)}
              </MenuItem>
            )
          })}
        </Select>
        <Typography variant='caption' color='textSecondary'>
          {helperText}
        </Typography>
      </FormControl>
    </Grid>
  )
}

type GridAutocompleteProps = TextFieldProps & {
  xs: number
  label: string
  options: any[]
  searchIcon?: boolean
  selected?: string | number
  getOptionLabel?: (option: any) => string
  onSelectValue?: (
    e: SyntheticEvent<Element, Event>,
    value: any,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<any>,
  ) => void
  disabled?: boolean
}

export const GridAutocomplete: React.FC<GridAutocompleteProps> = ({
  onSelectValue,
  xs,
  label,
  options,
  selected,
  searchIcon,
  getOptionLabel,
  disabled,
  ...props
}) => {
  return (
    <Grid item xs={xs} sx={{ display: 'flex', justifyContent: 'center' }}>
      <Autocomplete
        id='combo-box'
        options={options}
        renderInput={(params: any) => <TextField {...params} label={label} {...props} />}
        sx={{ width: '100%' }}
        popupIcon={searchIcon ? <SearchIcon /> : <ArrowDropDownIcon />}
        value={selected}
        getOptionLabel={getOptionLabel}
        onChange={onSelectValue}
        disabled={disabled}
      />
    </Grid>
  )
}
export const FormikGridAutocomplete = ({
  xs,
  label,
  options,
  searchIcon,
  values,
  form,
  section,
  touched,
  errors,
  name,
  ...props
}) => {
  return (
    <GridAutocomplete
      xs={xs}
      label={label}
      name={section + '.' + name}
      error={Boolean(errors?.[name] && touched?.[name])}
      onBlur={form.handleBlur}
      helperText={props.helperText ?? (touched?.[name] ? errors?.[name] : null)}
      selected={options.find(option => option.value === values[name])?.label || values[name]}
      options={options}
      disabled={props.disabled}
      searchIcon={searchIcon}
      onSelectValue={props.onSelectValue ?? ((e, option) => form.setFieldValue(section + '.' + name, option.value))}
      onChange={props.onChange ?? ((e, option) => form.setFieldValue(section + '.' + name, option.value))}
    />
  )
}

export const FormikGridCheckbox = ({ xs, label, values, form, section, touched, errors, name, ...props }) => {
  const checked = props.value ?? values[name]
  const onChange = () => {
    form.setFieldValue(section + '.' + name, !checked)
  }
  return (
    <Grid item xs={xs}>
      <FormControlLabel
        control={<Checkbox checked={checked} />}
        label={label}
        onChange={onChange}
        name={section + '.' + name}
        onBlur={form.handleBlur}
        error={Boolean(errors?.[name] && touched?.[name])}
        helperText={touched?.[name] ? errors?.[name] : null}
        {...props}
      />
    </Grid>
  )
}

export const FormikGridStaticDateTimePicker = ({
  xs,
  label,
  values,
  form,
  section,
  touched,
  errors,
  name,
  ...props
}) => {
  return (
    <Grid
      item
      xs={xs}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 1,
      }}
    >
      <DesktopDateTimePicker
        label={label}
        value={values[name]}
        ampm={false}
        renderInput={(params: any) => (
          <TextField
            {...params}
            helperText={touched?.[name] ? errors?.[name] : null}
            onBlur={e => {
              form.handleBlur(e)
            }}
            name={section + '.' + name}
            error={Boolean(errors?.[name] && touched?.[name])}
          />
        )}
        disableOpenPicker
        {...props}
        onChange={newDatetime => {
          if (isValid(newDatetime) && !isAfter(newDatetime, props.maxDate) && !isBefore(newDatetime, props.minDate))
            if (props.onChange) props.onChange(newDatetime)
            else form.setFieldValue(section + '.' + name, newDatetime)
        }}
      />
      <StaticDatePicker
        displayStaticWrapperAs='desktop'
        openTo='day'
        value={values[name]}
        onChange={props.onChange ?? (newValue => form.setFieldValue(section + '.' + name, newValue))}
        onBlur={form.handleBlur}
        renderInput={(params: any) => <TextField {...params} />}
        {...props}
      />
    </Grid>
  )
}
export const FormikGridInlineDatePicker = ({ xs, label, values, form, section, touched, errors, name, ...props }) => {
  return (
    <Grid
      item
      xs={xs}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 1,
      }}
    >
      <DesktopDatePicker
        label={label}
        value={values[name]}
        onChange={newValue => form.setFieldValue(section + '.' + name, newValue)}
        renderInput={(params: any) => (
          <TextField
            {...params}
            helperText={touched?.[name] ? errors?.[name] : null}
            onBlur={form.handleBlur}
            name={section + '.' + name}
            error={Boolean(errors?.[name] && touched?.[name])}
          />
        )}
        {...props}
      />
    </Grid>
  )
}

export const AddPositionField = ({
  disabledDeleteButton,
  label,
  menuItems,
  showTimeStamp,
  timeStampLabel,
  values,
  form,
  section,
  touched,
  errors,
  name,
  onDelete,
  onTimestampChange,
  timestampValue,
  showPositionsTimestamps = false,
  disableTimestamp = false,
  ...props
}) => {
  return (
    <Grid
      item
      xs={12}
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        maxHeight: '80px',
        mb: 2,
      }}
    >
      <FormikGridSelect
        xs={showPositionsTimestamps ? 8 : 11}
        {...{
          label,
          menuItems,
          values,
          form,
          section,
          name,
          touched,
          errors,
          ...props,
        }}
        background='#fff'
      />
      {showPositionsTimestamps && (
        <Grid
          item
          xs={4}
          sx={{
            marginLeft: '20px',
          }}
        >
          <TimestampPicker
            disabled={disableTimestamp}
            label={timeStampLabel}
            value={timestampValue}
            onChange={newValue => onTimestampChange(newValue)}
          />
        </Grid>
      )}
      {!disabledDeleteButton && (
        <Grid item xs={1}>
          <IconButton onClick={onDelete}>
            <CloseIcon />
          </IconButton>
        </Grid>
      )}
    </Grid>
  )
}
export const TimeStampField = ({ timeStampLabel }) => {
  return (
    <div
      style={{
        width: '200px',
        margin: '0px 20px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <TextField label={timeStampLabel || 'Time'} variant='outlined' />
      <Stack>
        <KeyboardArrowUpIcon />
        <KeyboardArrowDownIcon />
      </Stack>
    </div>
  )
}
export const SetTimeStamp = ({ text, onClick, edit }) => {
  return (
    <Stack>
      <Typography variant='body1' sx={{ textAlign: 'center' }}>
        {text}
      </Typography>
      <Space20 />
      <DefaultButton text='Set timestamp' icon={<AccessTimeIcon sx={{ marginRight: '10px' }} />} onClick={onClick} />
    </Stack>
  )
}
export const ShowTimeStampSet = ({ text }) => {
  return (
    <Stack>
      <Typography variant='body1' sx={{ textAlign: 'center' }}>
        {text}
      </Typography>
      <Space20 />
      <TimeStampField timeStampLabel={undefined} />
    </Stack>
  )
}

type GridDateSelectorProps = Omit<DatePickerProps<any, any>, 'renderInput'> & {
  xs?: number
  error?: boolean
  helperText?: string
  onBlur?: () => void
}

export const GridDateSelector: React.FC<GridDateSelectorProps> = ({ xs, value, label, ...props }) => {
  return (
    <Grid item xs={xs} sx={{ display: 'flex', justifyContent: 'center' }}>
      <DatePicker
        label={label}
        value={value}
        {...props}
        renderInput={(params: any) => (
          <TextField
            {...params}
            style={{ width: '100%' }}
            onBlur={props.onBlur}
            error={Boolean(props.error)}
            helperText={props.helperText}
          />
        )}
      />
    </Grid>
  )
}

export const FormikGridDateSelector = <T,>({
  xs,
  label,
  values,
  form,
  section,
  touched,
  errors,
  name,
  ...props
}: {
  xs: number
  label: string
  values: T
  form: FormikProps<T>
  section: string
  touched: FormikTouched<T>
  errors: FormikErrors<T>
  name: keyof T
}) => {
  return (
    <Grid item xs={xs} sx={{ display: 'flex', justifyContent: 'center' }}>
      <DatePicker
        onChange={(e, event) => {
          form.setFieldValue(section ? `${section}.${String(name)}` : String(name), e)
          form.setFieldTouched(section ? `${section}.${String(name)}` : String(name))
        }}
        label={label}
        value={values[name]}
        {...props}
        renderInput={(params: any) => (
          <TextField
            {...params}
            style={{ width: '100%' }}
            onChange={e => {
              form.setFieldValue(section ? `${section}.${String(name)}` : String(name), e)
            }}
            onBlur={form.handleBlur}
            name={section ? `${section}.${String(name)}` : name}
            error={Boolean(errors?.[name] && touched?.[name])}
            helperText={touched?.[name] ? errors?.[name] : null}
          />
        )}
      />
    </Grid>
  )
}

export const DateSelector = ({ onChange, label }) => {
  return (
    <TextField
      label={label || 'Date'}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <CalendarMonthIcon />
          </InputAdornment>
        ),
      }}
      variant='outlined'
      sx={{ width: '100%' }}
      onChange={onChange || null}
    />
  )
}

type GridDateRangeSelectorProps = {
  xs?: number
  value?: [Date | null, Date | null]
  error?: boolean
  helperText?: string
  onChange: (value: [Date, Date]) => void
}

export const GridDateRangeSelector: React.FC<GridDateRangeSelectorProps> = ({ xs, value, onChange, ...props }) => {
  const [tempValue, setTempValue] = React.useState<[Date | null, Date | null]>([null, null])

  React.useEffect(() => {
    if (value) setTempValue(value)
  }, [value])

  React.useEffect(() => {
    if (tempValue[0] && tempValue[1]) {
      const date0 = new Date(tempValue[0])
      const date1 = new Date(tempValue[1])
      if (isValid(date0) && isValid(date1) && !isAfter(startOfDay(date0), endOfDay(date1)))
        onChange?.([startOfDay(date0), endOfDay(date1)])
    }
  }, [tempValue])

  const error =
    tempValue[0] &&
    tempValue[1] &&
    isValid(tempValue[0]) &&
    isValid(tempValue[1]) &&
    isAfter(startOfDay(tempValue[0]), endOfDay(tempValue[1]))

  return (
    <Grid item xs={xs} sx={{ display: 'flex', justifyContent: 'start' }}>
      <DatePicker
        {...props}
        label='Start Date'
        value={tempValue?.[0] ?? null}
        onChange={newValue => {
          setTempValue([newValue, tempValue[1]])
        }}
        renderInput={(params: any) => (
          <TextField {...params} style={{ width: '100%' }} error={Boolean(props.error)} helperText={props.helperText} />
        )}
      />
      <Box sx={{ mx: 2, display: 'flex', alignItems: 'center' }}>{trlb('dateTime_dateRange_separator')}</Box>
      <DatePicker
        {...props}
        label='End Date'
        value={tempValue?.[1] ?? null}
        onChange={newValue => {
          setTempValue([tempValue[0], newValue])
        }}
        renderInput={(params: any) => (
          <TextField
            {...params}
            style={{ width: '100%' }}
            error={Boolean(error || props.error)}
            helperText={props.helperText}
          />
        )}
      />
    </Grid>
  )
}

export const GridDateTimeSelector = ({
  xs,
  label,
  form,
  onChange = (value: Date) => {},
  value,
  error,
  helperText,
  onBlur,
  ...props
}) => {
  return (
    <Grid item xs={xs} sx={{ display: 'flex', justifyContent: 'center' }}>
      <DateTimePicker
        {...props}
        label={label}
        value={value}
        onChange={onChange}
        renderInput={params => <TextField {...params} onBlur={onBlur} error={Boolean(error)} helperText={helperText} />}
      />
    </Grid>
  )
}

type GridMultiDateSelector = StaticDatePickerProps<any, any> & {
  xs: number
  label?: string
}

export const GridMultiDateSelector: React.FC<GridMultiDateSelector> = ({
  xs,
  onChange = () => {},
  minDate,
  maxDate,
  value,
  label,
}) => {
  const [values, setValues] = React.useState(
    value?.map((obj: Date) => startOfDay(new Date(obj))) ?? [startOfDay(new Date())],
  )

  const findDate = (dates: Date[], date: Date) => {
    const dateTime = format(date, 'dd/MM/yyyy')
    return dates.find(item => {
      const itemDate = format(item, 'dd/MM/yyyy')
      return itemDate === dateTime
    })
  }

  const findIndexDate = (dates: Date[], date: Date) => {
    const dateTime = format(date, 'dd/MM/yyyy')
    return dates.findIndex(item => {
      const itemDate = format(item, 'dd/MM/yyyy')
      return itemDate === dateTime
    })
  }

  const renderPickerDay = (date: Date, selectedDates: Date[], pickersDayProps: PickersDayProps<Date>) => {
    if (!values) return <PickersDay {...pickersDayProps} />

    const selected = !!findDate(values, startOfDay(date))

    return <PickersDay {...pickersDayProps} disableMargin selected={selected} />
  }

  useEffect(() => {
    if (value) setValues(value)
  }, [value])

  return (
    <Grid item xs={xs} sx={{ display: 'flex', justifyContent: 'center' }}>
      <StaticDatePicker
        displayStaticWrapperAs='desktop'
        value={value ?? values}
        onChange={newValue => {
          const array = [...values]
          const date = startOfDay(newValue ?? minDate)
          const index = findIndexDate(array, date)
          if (index >= 0) array.splice(index, 1)
          else array.push(date)

          setValues(array)
          onChange(array)
        }}
        renderDay={renderPickerDay}
        label={label}
        renderInput={params => <TextField {...params} />}
        minDate={minDate}
        maxDate={maxDate}
      />
    </Grid>
  )
}

export const GridTimeSelector = ({
  xs,
  label,
  form,
  onChange = (value: Date) => {},
  value,
  error,
  helperText,
  onBlur,
  ...props
}) => {
  return (
    <Grid item xs={xs} sx={{ display: 'flex', justifyContent: 'center' }}>
      <TimePicker
        {...props}
        label={label}
        value={value}
        onChange={onChange}
        renderInput={params => <TextField {...params} onBlur={onBlur} error={Boolean(error)} helperText={helperText} />}
      />
    </Grid>
  )
}
export const GridNotesSection = ({ xs, label }) => {
  return (
    <Grid container xs={12} sx={{ justifyContent: 'center' }} spacing={2}>
      <Grid item xs={xs} sx={{ display: 'flex', justifyContent: 'center' }}>
        <TextField sx={{ width: '100%' }} label={label} variant='outlined' multiline rows={4} />
      </Grid>
    </Grid>
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
export const DataTable = ({
  rows,
  columns,
  onRowClick,
  height,
  rowHeight,
  background,
  checkboxSelection,
  onSelectionModelChange,
  selectionModel,
  showToolbar,
  toolbar,
  ...props
}: any) => {
  return (
    <Grid item xs={12} style={{ height: height || 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={7}
        rowsPerPageOptions={[7]}
        onRowClick={onRowClick}
        sx={{ background: background || null }}
        checkboxSelection={checkboxSelection || false}
        onSelectionModelChange={onSelectionModelChange}
        selectionModel={selectionModel}
        rowHeight={rowHeight || 52}
        initialState={{
          columns: {
            columnVisibilityModel: {
              id: false,
            },
          },
        }}
        components={{
          Toolbar: showToolbar ? toolbar : null,
        }}
        {...props}
      />
    </Grid>
  )
}

// TODO remove
// export const SurgeryNotes = ({ tabValue }) => {
//   return (
//     <>
//       <SectionSubtitle text={trlb('surgeryNotes_title')} />
//       {!tabValue ? (
//         <Grid
//           item
//           xs={12}
//           sx={{
//             width: '100%',
//             border: '1px solid lightGrey',
//             borderRadius: '4px',
//             display: 'flex',
//             alignContent: 'center',
//             marginBottom: '20px',
//             padding: '20px 0px',
//           }}
//         >
//           <SurgeryNoteSection text={trlb('surgeryNotes_preOp')} borderRight xs={undefined} />
//           <SurgeryNoteSection text={trlb('surgeryNotes_intraOp')} borderRight xs={undefined} />
//           <SurgeryNoteSection text={trlb('surgeryNotes_postOp')} borderRight={undefined} xs={undefined} />
//         </Grid>
//       ) : (
//         <Grid
//           item
//           xs={12}
//           sx={{
//             width: '100%',
//             border: '1px solid lightGrey',
//             borderRadius: '4px',
//             display: 'flex',
//             alignContent: 'center',
//             marginBottom: '20px',
//             padding: '20px 0px',
//           }}
//         >
//           {tabValue == 'pre-op' ? <SurgeryNoteSection text='Pre-op notes' borderRight={false} xs={12} /> : null}
//           {tabValue == 'intra-op' ? <SurgeryNoteSection text='Intra-op notes' borderRight={false} xs={12} /> : null}
//           {tabValue == 'post-op' ? <SurgeryNoteSection text='Post-op notes' borderRight={false} xs={12} /> : null}
//         </Grid>
//       )}
//     </>
//   )
// }

// TODO remove
// const SurgeryNoteSection = ({ text, borderRight, xs }) => {
//   return (
//     <Grid
//       item
//       xs={xs || 4}
//       style={{
//         display: 'flex',
//         flexDirection: 'column',
//         padding: '20px',
//         borderRight: borderRight ? '1px solid lightGrey' : null,
//       }}
//     >
//       <Typography sx={{ textAlign: 'center', fontSize: '16px', marginBottom: '10px' }}>{text}</Typography>
//       <Typography
//         sx={{
//           borderBottom: '1px solid lightGrey',
//           paddingBottom: '20px',
//           marginBottom: '10px',
//         }}
//       >
//         <li style={{ paddingLeft: '5px' }}>{trlb('commons_note1')}</li>
//         <li style={{ paddingLeft: '5px' }}>{trlb('commons_note2')}</li>
//       </Typography>
//       <TextField
//         variant='standard'
//         sx={{ width: '100%' }}
//         label='Additional notes'
//         multiline
//         rows={4}
//         InputProps={{
//           disableUnderline: true,
//         }}
//       />
//     </Grid>
//   )
// }

export const TabPanelHeader = ({ date, editWeek, edit, setEdit }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Grid container xs={8} sx={{ alignItems: 'center' }}>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          <Typography
            variant='h6'
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <NavigateBeforeOutlinedIcon sx={{ marginRight: '10px' }} />
            {date}
            <NavigateNextOutlinedIcon sx={{ marginLeft: '10px' }} />
          </Typography>
        </Grid>
        <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          {editWeek && !edit ? <EditButton variant='text' {...{ setEdit }} /> : null}
        </Grid>
      </Grid>
      <Space20 />
    </Box>
  )
}

export const BillingHistory = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const patientBillingHistory = [
    {
      surgery: 'Surgery name',
      recipient: 'Recipient name',
      date: '26/07/22',
      time: '9:45',
    },
    {
      surgery: 'Surgery name',
      recipient: 'Recipient name',
      date: '18/01/22',
      time: '10:25',
    },
    {
      surgery: 'Surgery name',
      recipient: 'Recipient name',
      date: '09/04/20',
      time: '16:50',
    },
  ]
  return (
    <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      {patientBillingHistory.map((bill, index) => {
        return (
          <div
            key={index}
            style={{
              background: 'white',
              width: '600px',
              boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.2), 0px 2px 10px rgba(0, 0, 0, 0.1)',
              borderRadius: '4px',
              margin: '10px',
              padding: '5px 10px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                width: '90%',
                padding: '10px',
              }}
            >
              <Typography sx={{ marginLeft: '10px' }}>Bill {index + 1}</Typography>
              <Typography sx={{ margin: '0px 20px' }}>-</Typography>
              {location === routes.patientDetails ? (
                <Typography sx={{ marginLeft: '10px' }}>{bill.surgery}</Typography>
              ) : (
                <Typography sx={{ marginLeft: '10px' }}>{bill.recipient}</Typography>
              )}
              <Typography variant='subtitle1' sx={{ marginLeft: '80px' }}>
                {trlb('commons_date')} {bill.date}
              </Typography>
              <Typography variant='subtitle1' sx={{ marginLeft: '10px' }}>
                {trlb('commons_divider')}
              </Typography>
              <Typography variant='subtitle1' sx={{ marginLeft: '5px' }}>
                {trlb('commons_time')} {bill.time}
              </Typography>
            </div>
            <InfoOutlinedIcon sx={{ width: '20px', marginLeft: '10px' }} />
          </div>
        )
      })}

      <Space20 />
      <TextIconButton
        text='See all bills'
        onClick={() => navigate('/cases')}
        icon={<FolderOpenIcon sx={{ marginRight: '10px' }} />}
      />
    </Grid>
  )
}

export type FlexContainerProps = {
  children: ReactNode | ReactNode[]
  isFull?: boolean
}

export const FlexContainer = ({ children, isFull }: FlexContainerProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 1,
        ...(isFull ? { width: '100%' } : {}),
      }}
    >
      {children}
    </Box>
  )
}
