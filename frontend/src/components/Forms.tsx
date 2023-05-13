import React, { useEffect, useMemo, useState } from 'react'
import {
  FormControlLabel,
  Typography,
  Grid,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  FormGroup,
  FormControl,
  FormHelperText,
  TextField,
} from '@mui/material'
import { DefaultButton, TextIconButton } from './Buttons'
import AddIcon from '@mui/icons-material/Add'
import {
  Space20,
  AddPositionField,
  FormikGridAutocomplete,
  GridSelect,
  GridTextField,
  SectionSubtitle,
  FormikGridTextField,
  FormikGridSelect,
  FormikGridCheckbox,
  FormikGridStaticDateTimePicker,
  FormikGridInlineDatePicker,
  Panel,
} from './Commons'
import { routes } from 'routes/routes'
import {
  Contract,
  Gender_Name,
  InsuranceStatus,
  OpStandardSide_Name,
  RecipientType,
  IUser,
  formatCaseForm,
  RoomType,
  NewContractMatchOpStandard,
  getCaseContract,
} from '@empty/lib.constants'
import { getFieldError, getFieldTouched, trlb } from 'utilities'
import { isAfter, isBefore, min, max, isValid, startOfDay, endOfDay } from 'date-fns'
import { useGetContractsByDoctorId, useNewContractMatchOpStandard } from 'hooks/contractHooks'
import { DatePicker } from '@mui/x-date-pickers'
import { useAppSelector } from 'store'
import { useLoggedUserIsDoctor } from 'hooks/userHooks'

export const ThirdPartyForm = ({ readOnly, section, form }) => {
  return (
    <Grid container xs={12} sx={{ justifyContent: 'center' }} spacing={2}>
      <Space20 />
      <GridTextField
        label={trlb('thirdPartyForm_company')}
        xs={4}
        disabled={readOnly}
        {...form.getFieldProps(`${section}.company`)}
        error={getFieldTouched(form, `${section}.company`) && getFieldError(form, `${section}.company`)}
      />
      <GridTextField
        label={trlb('thirdPartyForm_name')}
        xs={4}
        disabled={readOnly}
        {...form.getFieldProps(`${section}.name`)}
        error={getFieldTouched(form, `${section}.name`) && getFieldError(form, `${section}.name`)}
      />
      <GridTextField
        label={trlb('thirdPartyForm_surname')}
        xs={4}
        disabled={readOnly}
        {...form.getFieldProps(`${section}.surname`)}
        error={getFieldTouched(form, `${section}.surname`) && getFieldError(form, `${section}.surname`)}
      />
      <Space20 />
      <Typography variant='subtitle1' sx={{ width: '100%', textAlign: 'center' }}>
        {trlb('addressForm_Title')}
      </Typography>
      <AddressFormFields {...{ readOnly, section: section + '.address', form }} />
    </Grid>
  )
}

interface FormProps {
  readOnly: boolean
  form: any
  section?: string
}

export const AddressFormFields = ({ readOnly, form, section = 'address' }: FormProps) => {
  return (
    <>
      <GridTextField
        label={trlb('addressForm_Street')}
        xs={8}
        disabled={readOnly}
        {...form.getFieldProps(`${section}.street`)}
        error={getFieldTouched(form, `${section}.street`) && getFieldError(form, `${section}.street`)}
      />
      <GridTextField
        label={trlb('addressForm_HouseNumber')}
        xs={4}
        disabled={readOnly}
        {...form.getFieldProps(`${section}.houseNumber`)}
        error={getFieldTouched(form, `${section}.houseNumber`) && getFieldError(form, `${section}.houseNumber`)}
      />
      <GridTextField
        label={trlb('addressForm_PostalCode')}
        xs={4}
        disabled={readOnly}
        {...form.getFieldProps(`${section}.postalCode`)}
        error={getFieldTouched(form, `${section}.postalCode`) && getFieldError(form, `${section}.postalCode`)}
      />
      <GridTextField
        label={trlb('addressForm_City')}
        xs={4}
        disabled={readOnly}
        {...form.getFieldProps(`${section}.city`)}
        error={getFieldTouched(form, `${section}.city`) && getFieldError(form, `${section}.city`)}
      />
      <GridTextField
        label={trlb('addressForm_Country')}
        xs={4}
        disabled={readOnly}
        {...form.getFieldProps(`${section}.country`)}
        error={getFieldTouched(form, `${section}.country`) && getFieldError(form, `${section}.country`)}
      />
    </>
  )
}

export const SecondTabAddressFormFields = ({ readOnly, form }: FormProps) => {
  return (
    <Grid container xs={12} sx={{ justifyContent: 'center' }} spacing={2}>
      <GridTextField
        label={trlb('addressForm_Street')}
        xs={8}
        disable={readOnly}
        {...form.getFieldProps('billingSection.thirdPartyBillingContact.address.street')}
        error={form.touched.address?.street ? form.errors.address?.street : ''}
      />
      <GridTextField
        label={trlb('addressForm_HouseNumber')}
        xs={4}
        disable={readOnly}
        {...form.getFieldProps('billingSection.thirdPartyBillingContact.address.houseNumber')}
        error={form.touched.address?.houseNumber ? form.errors.address?.houseNumber : ''}
      />
      <GridTextField
        label={trlb('addressForm_PostalCode')}
        xs={4}
        disable={readOnly}
        {...form.getFieldProps('billingSection.thirdPartyBillingContact.address.postalCode')}
        error={form.touched.address?.postalCode ? form.errors.address?.postalCode : ''}
      />
      <GridTextField
        label={trlb('addressForm_City')}
        xs={4}
        disable={readOnly}
        {...form.getFieldProps('billingSection.thirdPartyBillingContact.address.city')}
        error={form.touched.address?.city ? form.errors.address?.city : ''}
      />
      <GridTextField
        label={trlb('addressForm_Country')}
        xs={4}
        disable={readOnly}
        {...form.getFieldProps('billingSection.thirdPartyBillingContact.address.country')}
        error={form.touched.address?.country ? form.errors.address?.country : ''}
      />
    </Grid>
  )
}

export const BookingInformationFormFields = ({
  readOnly,
  form,
  values,
  errors,
  touched,
  section,
  setOutsideDoctorSlots,
  BGList,
}) => {
  // not sure this is the right place to extract them, since this should be as a generic cmponent as possible
  const getContractsByDoctorId = useGetContractsByDoctorId()
  const patient = form.values.patientRef ? form.values.associatedPatient : form.values.bookingPatient
  const [workRelated, setWorkRelated] = React.useState(
    Boolean(form.values.bookingSection?.bgId || form.values.bookingSection?.customBG?.company) &&
      patient?.germanInsuranceStatus !== InsuranceStatus.NONE,
  )
  const [customBG, setCustomBG] = React.useState(
    form.values.bookingSection?.customBG?.company && patient?.germanInsuranceStatus !== InsuranceStatus.NONE,
  )
  const [overnight, setOvernight] = React.useState(Boolean(form.values.bookingSection?.roomType))
  const loggedUserIsDoctor = useLoggedUserIsDoctor()
  const loggedUserId = useAppSelector(state => state.auth?.user?.id)
  const users = useAppSelector(state => state.users)
  const doctorList = React.useMemo(
    () =>
      Object.values(users)
        .filter((user: Partial<IUser>) => user?.isDoctor)
        .map(doctor => doctor.id),
    [users],
  )
  const doctorOptions = useMemo(
    () =>
      doctorList.map(id => {
        const user = Object.values(users).find(item => item?.id === id)
        return { value: id, label: user?.firstName + ' ' + user?.lastName }
      }),
    [users, doctorList],
  )
  const [lastValidDate, setLastValidDate] = React.useState<Date>(values.date)
  const allContracts = useAppSelector(state => state.contracts)
  const contracts = Object.values(allContracts).filter(
    (contract: Contract) => contract?.details?.doctorId === values.doctorId,
  )
  const caseItem = useAppSelector(state => state.cases[form.values.caseId])
  const contract: Contract | null = useMemo(() => {
    return values.doctorId && isValid(lastValidDate)
      ? getCaseContract({
          caseForm: form.values,
          contracts: allContracts,
        })
      : null
  }, [values.doctorId, lastValidDate, allContracts, caseItem, values.contractId])
  const opStandardsOptions = useMemo(
    () =>
      contract
        ? Object.keys(contract?.opStandards ?? {}).reduce(
            (acc, val) =>
              acc.concat({
                value: val,
                label: contract?.opStandards?.[val]?.name,
              }),
            [],
          )
        : [],
    [contract],
  )
  // calculate min and max date considering all contract versions
  React.useEffect(() => {
    if (contracts.length === 0) {
      form.setFieldValue(section + '._minDate', startOfDay(new Date()))
      return
    }
    const minContractsDate = min(contracts.map((contract: Contract) => contract.details.validFrom))
    form.setFieldValue(section + '._minDate', startOfDay(minContractsDate))
  }, [allContracts, form.values?.caseId])

  React.useEffect(() => {
    const newMaxDate: Date = max(contracts.map((contract: Contract) => contract.details.validUntil))
    form.setFieldValue(section + '._maxDate', endOfDay(newMaxDate))
  }, [allContracts, form.values?.caseId])
  // pre-select doctorId if only one is available
  useEffect(() => {
    if (!values.doctorId) form.setFieldValue(section + '.doctorId', doctorList.length === 1 ? doctorList[0] : '')
  }, [])
  useEffect(() => {
    if (workRelated) form.setFieldValue(section + '.bg', true)
  }, [workRelated])
  // force opStandard to be compatible with doctorId and date, and save contractId
  useEffect(() => {
    const contractId = getContractIdFromDate(lastValidDate)
    if (contractId !== values.contractId) form.setFieldValue(section + '.contractId', contractId)
    if (contractId === values.contractId && !values.opStandardId)
      form.setFieldValue(section + '.opStandardId', opStandardsOptions.length === 1 ? opStandardsOptions[0]?.value : '')
  }, [values.doctorId, opStandardsOptions, lastValidDate, allContracts])
  // on doctor change, if the date is not compatible with the new doctor, empty the date
  useEffect(() => {
    if (
      !isValid(values.date) ||
      (values.doctorId &&
        contract?.contractId &&
        (isAfter(contract.details.validFrom, values.date) || isBefore(contract.details.validUntil, values.date)))
    )
      form.setFieldValue(section + '.date', null)
    if (loggedUserIsDoctor) form.setFieldValue(section + '.doctorId', loggedUserId)
  }, [values.doctorId, allContracts, values.date, loggedUserIsDoctor, loggedUserId, contract])

  // on date change, if the date change would trigger a change of contract (even a contract version change), trigger a warning
  const getContractIdFromDate = (date: Date) =>
    contracts.find(
      contract =>
        !isAfter(contract.details.validFrom, date) &&
        !isBefore(contract.details.validUntil, date) &&
        contract?.associatedDoctor?.id === values.doctorId,
    )?.contractId

  const [changeContractDate, setChangeContractDate] = useState(false)
  const clearAllFieldsApartPatientTab = () => {
    // reset all fields except for patient, doctor and date
    const doctorId = values.doctorId
    const emptyCaseForm = formatCaseForm()
    const date = new Date(form.values?.bookingSection?.date?.getTime())
    form.setFieldValue('bookingSection', {
      ...emptyCaseForm.bookingSection,
      date,
      doctorId,
    })
    form.setFieldValue('surgerySection', emptyCaseForm.surgerySection)
    form.setFieldValue('anesthesiaSection', emptyCaseForm.anesthesiaSection)
    form.setFieldValue('preOpSection', emptyCaseForm.preOpSection)
    form.setFieldValue('postOpSection', emptyCaseForm.postOpSection)
    form.setFieldValue('intraOpSection', emptyCaseForm.intraOpSection)
  }
  const clearFieldsWithConflicts = () => {
    if (conflicts?.positions) form.setFieldValue('surgerySection.positions', [])
    if (conflicts?.bodyRegions) form.setFieldValue('surgerySection.surgeryBodyLocations', [])
  }
  const handleChangeContract = async () => {
    // if the case number is empty is a booking reuest and we need to clear all fields
    // if the case number is not empty is a case edit and we need to clear only the fields that make conflicts
    if (form?.values?.caseNumber === '' || newContractMatch === NewContractMatchOpStandard.noMatch)
      clearAllFieldsApartPatientTab()
    else clearFieldsWithConflicts()

    if (isValid(changeContractDate)) {
      form.setFieldValue(section + '.date', changeContractDate)
      setLastValidDate(changeContractDate)
    }
    setChangeContractDate(false)
  }
  const handleDeclineChangeContract = async () => {
    form.setFieldValue(section + '.date', lastValidDate)
    setChangeContractDate(false)
  }

  const outOfSurgerySlots = useMemo(() => {
    if (!contract || !isValid(values.date)) return false
    return !contract?.details?.surgerySlots?.some(
      slot => isBefore(values.date, slot.to) && isAfter(values.date, slot.from),
    )
  }, [contract, values.date])

  useEffect(() => setOutsideDoctorSlots(outOfSurgerySlots), [outOfSurgerySlots])

  const roomTypes = Object.values(RoomType).map(el => ({
    value: el,
    label: trlb(el),
  }))

  const { newContractMatch, conflicts } = useNewContractMatchOpStandard({
    currentContractId: values.contractId,
    changeContractId: getContractIdFromDate(changeContractDate),
    currentBodyRegions: form.values.surgerySection.surgeryBodyLocations,
    currentOpStandardId: values.opStandardId,
    currentPositions: form.values.surgerySection.positions,
  })
  return (
    <>
      <Grid container sx={{ justifyContent: 'center' }} spacing={2}>
        <Grid item lg={5} md={12}>
          {outOfSurgerySlots ? (
            <Typography
              sx={{
                backgroundColor: theme => theme.palette.secondary.light,
                width: '100%',
                textAlign: 'center',
                borderRadius: theme => theme.constants.radius,
                mb: 2,
                p: 2,
              }}
            >
              <strong>{trlb('warning_dateNotInContract')}</strong>
            </Typography>
          ) : null}
          <FormikGridStaticDateTimePicker
            xs={12}
            label={trlb('bookingTab_BookingDate')}
            {...{
              disabled: readOnly,
              form,
              section,
              errors,
              values,
              touched,
              name: 'date',
              minDate: isBefore(values._minDate, new Date()) ? new Date() : values._minDate,
              maxDate: values._maxDate,
              onChange: newValue => {
                if (
                  values.doctorId &&
                  values.date &&
                  isValid(newValue) &&
                  getContractIdFromDate(newValue) !== getContractIdFromDate(values.date)
                ) {
                  setChangeContractDate(newValue)
                } else if (isValid(newValue)) {
                  setLastValidDate(newValue)
                  form.setFieldValue(section + '.date', newValue)
                }
                // TODO THIS IS THE WORST THING THAT HAS EVER BEEN DONE BY A HUMAN BEING WE MUST SOLVE THIS SOME OTHER WAY
                setTimeout(() => form.validateForm(), 500)
              },
              onBlur: () => {
                if (values.doctorId && values.date && isValid(values.date))
                  if (contract && getContractIdFromDate(values.date) !== contract.contractId)
                    setChangeContractDate(values.date)
                  else setLastValidDate(values.date)

                // TODO THIS IS THE WORST THING THAT HAS EVER BEEN DONE BY A HUMAN BEING WE MUST SOLVE THIS SOME OTHER WAY
                setTimeout(() => form.validateForm(), 500)
              },
            }}
          />
        </Grid>
        <Grid item lg={7} md={12}>
          <Grid container spacing={2}>
            <FormikGridAutocomplete
              searchIcon={undefined}
              xs={12}
              label={trlb('formBooking_Doctor')}
              options={doctorOptions}
              {...{
                disabled: readOnly || doctorList.length === 1 || loggedUserIsDoctor,
                form,
                section,
                errors,
                values,
                touched,
                name: 'doctorId',
              }}
              onSelectValue={(e, option) => {
                if (option?.value !== values.doctorId) {
                  clearAllFieldsApartPatientTab()
                  form.setFieldValue(section + '.opStandardId', '')
                  form.setFieldValue(section + '.doctorId', option?.value)
                }
              }}
            />
            <FormikGridAutocomplete
              searchIcon={undefined}
              xs={12}
              label={trlb('formBooking_OpStandard')}
              options={opStandardsOptions}
              {...{
                disabled: readOnly,
                form,
                section,
                errors,
                values,
                touched,
                name: 'opStandardId',
                helperText:
                  opStandardsOptions.length === 0
                    ? trlb('noResultFromCombination')
                    : touched?.opStandardId
                    ? errors?.opStandardId
                    : null,
              }}
              onSelectValue={(e, option) => {
                if (option?.value !== values.opStandardId) {
                  const emptyForm = formatCaseForm()
                  form.setFieldValue(section + '.opStandardId', option?.value)
                  form.setFieldValue('surgerySection', emptyForm.surgerySection)
                }
              }}
            />
            {patient?.germanInsuranceStatus !== InsuranceStatus.NONE && (
              <Grid item xs={workRelated ? 4 : 12}>
                <FormControlLabel
                  control={<Checkbox checked={workRelated} disabled={readOnly} />}
                  label={trlb('formBooking_workRelated')}
                  onChange={() => {
                    if (workRelated) {
                      form.setFieldValue(section + '.bgId', null)
                      form.setFieldValue(section + '.customBG', null)
                      setCustomBG(false)
                    }
                    form.setFieldValue(section + '.bg', !workRelated)
                    setWorkRelated(prev => !prev)
                  }}
                />
              </Grid>
            )}
            {workRelated && (
              <>
                <FormikGridSelect
                  label={trlb('formBooking_BG')}
                  menuItems={BGList}
                  xs={8}
                  {...{
                    disabled: readOnly || customBG,
                    form,
                    section,
                    errors,
                    values,
                    touched,
                    name: 'bgId',
                  }}
                />
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox checked={customBG} disabled={readOnly} />}
                    label={trlb('formBooking_customBG_prompt')}
                    onChange={() => {
                      if (customBG) form.setFieldValue(section + '.customBG', null)
                      form.setFieldValue(section + '.bgId', null)
                      setCustomBG(prev => !prev)
                    }}
                  />
                </Grid>
              </>
            )}
            {customBG && workRelated && (
              <>
                <GridTextField
                  label={trlb('formBooking_customBG_company')}
                  xs={6}
                  disabled={readOnly}
                  {...form.getFieldProps(section + '.customBG.company')}
                />
                <GridTextField
                  label={trlb('formBooking_customBG_name')}
                  xs={6}
                  disabled={readOnly}
                  {...form.getFieldProps(section + '.customBG.name')}
                  error={form.touched[section]?.customBG?.name ? form.errors[section]?.customBG?.name : ''}
                />
                <GridTextField
                  label={trlb('formBooking_customBG_surname')}
                  xs={6}
                  disabled={readOnly}
                  {...form.getFieldProps(section + '.customBG.surname')}
                />
                <GridTextField
                  label={trlb('formBooking_customBG_address')}
                  xs={6}
                  disabled={readOnly}
                  {...form.getFieldProps(section + '.customBG.address')}
                  error={form.touched[section]?.customBG?.address ? form.errors[section]?.customBG?.address : ''}
                />
              </>
            )}
            <Grid item xs={4}>
              <FormControlLabel
                control={<Checkbox checked={overnight} disabled={readOnly} />}
                label={trlb('formBooking_overnight')}
                onChange={() => {
                  if (overnight) form.setFieldValue(section + '.roomType', null)
                  setOvernight(prev => !prev)
                }}
              />
            </Grid>
            {overnight && (
              <FormikGridSelect
                label={trlb('formBooking_roomType')}
                menuItems={roomTypes}
                xs={8}
                {...{
                  disabled: readOnly,
                  form,
                  section,
                  errors,
                  values,
                  touched,
                  name: 'roomType',
                }}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
      <Dialog
        open={Boolean(changeContractDate)}
        onClose={handleDeclineChangeContract}
        aria-labelledby='responsive-dialog-title'
      >
        <DialogTitle id='responsive-dialog-title'>{trlb('booking_confirm_change_contract_title')}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {form.values.caseNumber === ''
              ? trlb('new_booking_confirm_change_contract')
              : newContractMatch === NewContractMatchOpStandard.noMatch
              ? trlb('booking_confirm_change_contract_no_match_text')
              : newContractMatch === NewContractMatchOpStandard.matchWithConflict
              ? trlb('booking_confirm_change_contract_match_conflit_text')
              : trlb('booking_confirm_change_contract_text')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleDeclineChangeContract}>
            {trlb('commons_cancel')}
          </Button>
          <Button onClick={handleChangeContract} autoFocus>
            {trlb('commons_confirm')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export const BookingInformationBillingDetailsFormFields = ({ readOnly, form, values, errors, touched, section }) => {
  const patient = form.values.patientRef ? form.values.associatedPatient : form.values.bookingPatient
  React.useEffect(() => {
    form.setFieldValue(section + '._billingContactRequired', patient?.germanInsuranceStatus === InsuranceStatus.NONE)
  }, [form.values.patientRef, form.values.bookingPatient])

  return (
    <>
      <Grid container sx={{ justifyContent: 'flex-start', alignItems: 'center' }} spacing={2}>
        <FormikGridCheckbox
          xs={4}
          label={trlb('bookingRequest_cost_estimate_required')}
          {...{
            disabled: readOnly,
            form,
            section,
            errors,
            values,
            touched,
            name: 'costEstimateRequired',
          }}
        />

        {patient?.germanInsuranceStatus === InsuranceStatus.NONE && (
          <>
            <FormikGridSelect
              label={trlb('bookingRequest_recipientType')}
              menuItems={Object.values(RecipientType).map(type => ({
                value: type,
                label: type,
              }))}
              xs={8}
              {...{
                disabled: readOnly,
                form,
                section,
                errors,
                values,
                touched,
                name: 'billingContact',
                onChange: e => {
                  if (e.target.value === RecipientType.THIRD_PARTY)
                    form.setFieldValue(section + '.thirdPartyBillingContact', {
                      company: '',
                      name: '',
                      surname: '',
                      address: {
                        street: '',
                        houseNumber: '',
                        postalCode: '',
                        city: '',
                        country: '',
                      },
                    })
                  else form.setFieldValue(section + '.thirdPartyBillingContact', null)
                  form.handleChange(e)
                },
              }}
            />
            {values.billingContact === RecipientType.THIRD_PARTY ? (
              <Grid item xs={12}>
                <Space20 />
                <SectionSubtitle text={trlb('thirdPartyForm_info')} />
                <ThirdPartyForm
                  {...{
                    readOnly,
                    form,
                    section: section + '.thirdPartyBillingContact',
                  }}
                />
              </Grid>
            ) : null}
          </>
        )}
      </Grid>
    </>
  )
}

export const BookingNotesFormFields = ({ readOnly, form, values, errors, touched, section }) => {
  return (
    <Grid>
      <FormikGridTextField
        label={trlb('formBooking_Notes')}
        xs={12}
        multiline
        rows={4}
        fullWidth
        {...{
          disabled: readOnly,
          form,
          section,
          errors,
          values,
          touched,
          name: 'notes',
        }}
      />
    </Grid>
  )
}

export const BillingDetailsFormFields = ({ readOnly, form, values, errors, touched, section }) => {
  // TODO: this components need to be imported from the constants or the backend
  const insuranceTypes = ['Public', 'Private'].map(el => ({
    value: el,
    label: el,
  }))
  const goaNumbers = [440, 441, 442, 443, 444, 445].map(el => ({
    value: el,
    label: el.toString(),
  }))
  const billingCategoriesList = ['A', 'B', 'C1', 'C2', 'C3', 'D', 'E', 'F', 'G'].map(el => ({ value: el, label: el }))
  const [goaNumber, setGoaNumber] = useState('')
  return (
    <>
      <Grid container xs={12} sx={{ justifyContent: 'center', alignItems: 'center' }} spacing={2}>
        {location.pathname != routes.newBookingRequest ? (
          <>
            <FormikGridSelect
              label='Billing category'
              xs={11}
              menuItems={billingCategoriesList}
              {...{
                disabled: readOnly,
                form,
                section,
                errors,
                values,
                touched,
                name: 'billingCategory',
              }}
            />
            <Grid item xs={1}>
              <TextIconButton text='Auto' />
            </Grid>
            <GridTextField label='OPS Code' xs={4} />
            <GridTextField label='ICD Code' xs={4} />
            <GridSelect label='GoÄ number' xs={4} value={goaNumber} menuItems={goaNumbers} background='#fff' />
          </>
        ) : null}
        <FormikGridSelect
          label={trlb('bookingRequest_billingInsurance')}
          menuItems={insuranceTypes}
          xs={5}
          {...{
            disabled: readOnly,
            form,
            section,
            errors,
            values,
            touched,
            name: 'insuranceId',
          }}
        />
        <FormikGridCheckbox
          xs={2}
          label={trlb('bookingRequest_SelfPayer')}
          {...{
            disabled: readOnly,
            form,
            section,
            errors,
            values,
            touched,
            name: 'selfPayer',
          }}
        />
        <FormikGridSelect
          label={trlb('bookingRequest_BillingContact')}
          menuItems={Object.values(RecipientType).map(el => ({
            value: el,
            label: el,
          }))}
          xs={5}
          {...{
            disabled: readOnly,
            form,
            section,
            errors,
            values,
            touched,
            name: 'billingContact',
            onChange: e => {
              if (e.target.value === RecipientType.THIRD_PARTY)
                form.setFieldValue(section + '.thirdPartyBillingContact', {
                  company: '',
                  name: '',
                  surname: '',
                  address: {
                    street: '',
                    houseNumber: '',
                    postalCode: '',
                    city: '',
                    country: '',
                  },
                })
              else form.setFieldValue(section + '.thirdPartyBillingContact', null)
              form.handleChange(e)
            },
          }}
        />
        {values.billingContact === RecipientType.THIRD_PARTY ? (
          <>
            <Space20 />
            <SectionSubtitle text={trlb('thirdPartyForm_info')} />
            <ThirdPartyForm
              {...{
                readOnly,
                form,
                section: section + '.thirdPartyBillingContact',
              }}
            />
            {
              <SecondTabAddressFormFields
                {...{
                  readOnly,
                  values: values?.address,
                  errors: errors?.address,
                  touched: touched?.address,
                  section: section + '.address',
                  form,
                }}
              />
            }
          </>
        ) : null}
      </Grid>
    </>
  )
}

export const SurgeryInformationFormFields = ({ readOnly, form, values, errors, touched, section, opStandard }) => {
  const possibilePositions = useMemo(
    () => (opStandard?.bookingSection?.positions?.length > 0 ? opStandard.bookingSection.positions : []),
    [opStandard],
  )
  const { possiblePositions, sideRequired } = React.useMemo(() => {
    return {
      sideRequired: opStandard?.bookingSection?.sideRequired,
      possiblePositions: opStandard?.bookingSection.positions.length > 0 ? opStandard?.bookingSection.positions : [],
    }
  }, [opStandard])
  const [positions, setPositions] = React.useState(
    form.values?.surgerySection?.positions.length
      ? form.values?.surgerySection?.positions.filter(p => possibilePositions?.includes(p))
      : [],
  )
  React.useEffect(() => {
    let newPositions = positions.filter(p => possiblePositions.includes(p))
    if (newPositions.length > 0) setPositions(newPositions)
    form.setFieldValue(section + '.positions', newPositions)

    form.setFieldValue(section + '._sideRequired', opStandard?.bookingSection?.sideRequired)
    form.setFieldValue(section + '._surgeryBodyLocationsRequired', opStandard?.bookingSection.bodyRegions?.length > 0)
  }, [possiblePositions, opStandard])

  return (
    <>
      <Space20 />
      <Panel>
        <Grid container spacing={2}>
          {sideRequired && (
            <FormikGridSelect
              xs={6}
              label={trlb('booking_tab_surgery_SideInformation')}
              menuItems={Object.values(OpStandardSide_Name).map(el => ({
                value: el,
                label: el,
              }))}
              {...{
                disabled: readOnly,
                form,
                section,
                errors,
                values,
                touched,
                name: 'side',
              }}
            />
          )}
        </Grid>
      </Panel>
      <Space20 />
      <Grid container>
        <Grid
          item
          xs={6}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingRight: '16px',
          }}
        >
          <Panel>
            <Typography variant='body1' sx={{ textAlign: 'center' }}>
              {trlb('booking_tab_surgery_positionOrder')}
            </Typography>
            <Space20 />
            {positions.map((position, index) => {
              return (
                <AddPositionField
                  disabledDeleteButton={positions.length === 1 || readOnly}
                  label={'Position' + ' ' + (index + 1)}
                  key={index}
                  menuItems={possiblePositions.map(el => ({
                    value: el,
                    label: el,
                  }))}
                  {...{
                    disabled: readOnly,
                    form,
                    section,
                    errors,
                    values,
                    touched,
                    name: 'positions',
                    value: position,
                    onChange: e => {
                      let newPositions = [...positions]
                      newPositions[index] = e.target.value
                      setPositions(newPositions)
                      form.setFieldValue(section + '.positions', newPositions)
                    },
                    onDelete: () => {
                      let newPositions = [...positions]
                      newPositions.splice(index, 1)
                      setPositions(newPositions)
                      form.setFieldValue(section + '.positions', newPositions)
                    },
                  }}
                />
              )
            })}
            {positions.every(x => x) && (
              <>
                <Space20 />
                <DefaultButton
                  onClick={() => {
                    const newPositions = [...positions]
                    newPositions[positions.length] = possiblePositions[0]
                    setPositions(newPositions)
                    form.setFieldValue(section + '.positions', newPositions)
                  }}
                  disabled={readOnly}
                  text={trlb('booking_surgery_tab_addPosition')}
                  icon={<AddIcon sx={{ marginRight: '10px' }} />}
                />
              </>
            )}
          </Panel>
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingLeft: '16px',
          }}
        >
          <Panel>
            <Typography variant='body1' sx={{ textAlign: 'center' }}>
              {trlb('booking_tab_surgery_bodyRegions')}
            </Typography>
            <Space20 />
            <div style={{ width: '100%', margin: '10px' }}>
              {opStandard?.bookingSection?.bodyRegions?.length > 0 ? (
                <FormControl error={Boolean(errors?.surgeryBodyLocations)}>
                  <FormGroup>
                    {opStandard?.bookingSection?.bodyRegions?.map((region, index) => (
                      <FormikGridCheckbox
                        key={index}
                        label={trlb(region)}
                        {...{
                          disabled: readOnly,
                          form,
                          section,
                          errors,
                          values,
                          touched,
                          name: 'bodyRegions',
                          value: values.surgeryBodyLocations.includes(region),
                          onChange: e => {
                            if (values.surgeryBodyLocations.includes(region))
                              form.setFieldValue(
                                section + '.surgeryBodyLocations',
                                values.surgeryBodyLocations.filter(bodyRegion => bodyRegion !== region),
                              )
                            else
                              form.setFieldValue(section + '.surgeryBodyLocations', [
                                ...values.surgeryBodyLocations,
                                region,
                              ])
                          },
                        }}
                      />
                    ))}
                  </FormGroup>
                  <FormHelperText>{errors?.surgeryBodyLocations}</FormHelperText>
                </FormControl>
              ) : null}
            </div>
          </Panel>
        </Grid>
      </Grid>
    </>
  )
}

interface UserInformationFormFieldsProps {
  readOnly: boolean
  form: any
  debtorNumber: number
}

export const UserInformationFormFields = ({ readOnly, form, debtorNumber }: UserInformationFormFieldsProps) => {
  return (
    <Grid container sx={{ justifyContent: 'center' }} spacing={2}>
      <GridTextField
        label={trlb('userField_Title')}
        xs={debtorNumber ? 2 : 4}
        disabled={readOnly}
        {...form.getFieldProps('title')}
        error={form.touched.title ? form.errors.title : ''}
      />
      <GridTextField
        label={trlb('userField_Name') + '*'}
        xs={4}
        disabled={readOnly}
        {...form.getFieldProps('firstName')}
        error={form.touched.firstName ? form.errors.firstName : ''}
      />
      <GridTextField
        label={trlb('userField_Surname') + '*'}
        xs={4}
        disabled={readOnly}
        {...form.getFieldProps('lastName')}
        error={form.touched.lastName ? form.errors.lastName : ''}
      />
      {debtorNumber && <GridTextField label={trlb('userField_DebtorNumber')} xs={2} disabled value={debtorNumber} />}
      <Grid item xs={4}>
        <DatePicker
          label={trlb('userField_BirthDate')}
          disabled={readOnly}
          onChange={value => form.setFieldValue('birthDate', value)}
          value={form.values.birthDate}
          renderInput={params => (
            <TextField
              {...params}
              onBlur={form.handleBlur('birthDate')}
              error={Boolean(form.touched.birthDate && form.errors.birthDate)}
              helperText={form.touched.birthDate ? form.errors.birthDate : ''}
            />
          )}
        />
      </Grid>
      <GridTextField
        label={trlb('userField_PhoneNumber')}
        xs={4}
        disabled={readOnly}
        {...form.getFieldProps('phoneNumber')}
        error={form.touched.phoneNumber ? form.errors.phoneNumber : ''}
      />
      <GridTextField
        label={trlb('userField_Email') + '*'}
        xs={4}
        disabled={readOnly}
        {...form.getFieldProps('email')}
        error={form.touched.email ? form.errors.email : ''}
      />
    </Grid>
  )
}

export const PatientInformationFormFields = ({ readOnly, form, values, errors, touched, section, insurancesList }) => {
  const otherGender = values?.gender === Gender_Name.OTHER
  return (
    <Grid container sx={{ justifyContent: 'center' }} spacing={2}>
      <Grid item md={12} lg={6}>
        <Panel>
          <Grid container spacing={2}>
            <FormikGridTextField
              label={trlb('patientForm_Title')}
              xs={4}
              {...{
                disabled: readOnly,
                form,
                section,
                errors,
                values,
                touched,
                name: 'title',
              }}
            />
            <FormikGridTextField
              label={trlb('patientForm_Name')}
              xs={8}
              {...{
                disabled: readOnly,
                form,
                section,
                errors,
                values,
                touched,
                name: 'name',
              }}
            />
            <FormikGridTextField
              label={trlb('patientForm_PatientNumber')}
              xs={4}
              {...{
                disabled: true,
                form,
                section,
                errors,
                values,
                touched,
                name: 'patientNumber',
              }}
            />
            <FormikGridTextField
              label={trlb('patientForm_Surname')}
              xs={8}
              {...{
                disabled: readOnly,
                form,
                section,
                errors,
                values,
                touched,
                name: 'surname',
              }}
            />
            <FormikGridTextField
              label={trlb('patientForm_DebtorNumber')}
              xs={4}
              {...{
                disabled: true,
                form,
                section,
                errors,
                values,
                touched,
                name: 'debtorNumber',
              }}
            />
          </Grid>
        </Panel>
      </Grid>
      <Grid item md={12} lg={6}>
        <Panel>
          <Grid container spacing={2}>
            <FormikGridInlineDatePicker
              label={trlb('patientForm_Birthdate')}
              xs={otherGender ? 4 : 6}
              {...{
                disabled: readOnly,
                form,
                section,
                errors,
                values,
                touched,
                name: 'birthDate',
                disableOpenPicker: true,
              }}
            />
            <FormikGridSelect
              label={trlb('patientForm_Gender')}
              xs={otherGender ? 4 : 6}
              {...{
                disabled: readOnly,
                form,
                section,
                errors,
                values,
                touched,
                name: 'gender',
                menuItems: Object.values(Gender_Name).map(el => ({
                  value: el,
                  label: el,
                })),
              }}
            />
            {otherGender ? (
              <FormikGridTextField
                label={trlb('patientForm_GenderSpecifics')}
                xs={otherGender ? 4 : 6}
                {...{
                  disabled: readOnly,
                  form,
                  section,
                  errors,
                  values,
                  touched,
                  name: 'genderSpecifics',
                }}
              />
            ) : null}
            <FormikGridTextField
              label={trlb('patientForm_Nationality')}
              xs={6}
              {...{
                disabled: readOnly,
                form,
                section,
                errors,
                values,
                touched,
                name: 'nationality',
              }}
            />
            <FormikGridSelect
              label={trlb('patientForm_BirthGender')}
              xs={6}
              {...{
                disabled: readOnly,
                form,
                section,
                errors,
                values,
                touched,
                name: 'genderBirth',
                menuItems: Object.values(Gender_Name)
                  .filter(gender => gender !== Gender_Name.OTHER)
                  .map(el => ({ value: el, label: el })),
              }}
            />
          </Grid>
        </Panel>
      </Grid>
      <Grid item md={12} lg={6}>
        <Typography variant='subtitle1' sx={{ width: '100%', textAlign: 'center' }}>
          {trlb('patientForm_Insurance')}
        </Typography>
        <Space20 />
        <Panel>
          <Grid container spacing={2}>
            <FormikGridSelect
              label={trlb('patientForm_InsuranceStatus')}
              xs={4}
              {...{
                disabled: readOnly,
                form,
                section,
                errors,
                values,
                touched,
                name: 'germanInsuranceStatus',
                menuItems: Object.values(InsuranceStatus).map(el => ({
                  value: el,
                  label: el,
                })),
              }}
            />
            {values?.germanInsuranceStatus === InsuranceStatus.NONE ? null : (
              <FormikGridTextField
                label={trlb('patientForm_cardInsuranceNumber')}
                xs={4}
                {...{
                  disabled: readOnly,
                  form,
                  section,
                  errors,
                  values,
                  touched,
                  name: 'cardInsuranceNumber',
                }}
              />
            )}
            {values?.germanInsuranceStatus === InsuranceStatus.NONE ? null : (
              <FormikGridSelect
                label={trlb('patientForm_Insurance')}
                xs={4}
                {...{
                  disabled: readOnly,
                  form,
                  section,
                  errors,
                  values,
                  touched,
                  name: 'germanInsuranceId',
                  menuItems: insurancesList,
                }}
              />
            )}
          </Grid>
        </Panel>
        <Space20 />
        <Typography variant='subtitle1' sx={{ width: '100%', textAlign: 'center' }}>
          {trlb('patientForm_Contacts')}
        </Typography>
        <Space20 />
        <Panel>
          <Grid container spacing={2}>
            <FormikGridTextField
              label={trlb('patientForm_PhoneNumber')}
              xs={6}
              {...{
                disabled: readOnly,
                form,
                section,
                errors,
                values,
                touched,
                name: 'phoneNumber',
              }}
            />
            <FormikGridTextField
              label={trlb('patientForm_Email')}
              xs={6}
              {...{
                disabled: readOnly,
                form,
                section,
                errors,
                values,
                touched,
                name: 'email',
              }}
            />
          </Grid>
        </Panel>
      </Grid>
      <Grid item md={12} lg={6}>
        <Typography variant='subtitle1' sx={{ width: '100%', textAlign: 'center' }}>
          {trlb('patientForm_Address')}
        </Typography>
        <Space20 />
        <Panel>
          <Grid container spacing={2}>
            <AddressFormFields {...{ readOnly, section: section ? section + '.address' : undefined, form }} />
          </Grid>
        </Panel>
      </Grid>
    </Grid>
  )
}
