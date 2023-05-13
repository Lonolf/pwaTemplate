import React, { ChangeEvent, Dispatch, SetStateAction, SyntheticEvent, useEffect, useState } from 'react'
import {
  Button,
  Grid,
  Typography,
  Menu,
  Stack,
  useTheme,
  Paper,
  Modal,
  TextField,
  FormControlLabel,
  Checkbox,
  IconButton,
  SelectChangeEvent,
  Box,
} from '@mui/material'
import { CloseButton, DefaultButton, DeleteButton, SaveButton, TextIconButton } from './Buttons'
import {
  GridDateSelector,
  GridMultiDateSelector,
  GridNotesSection,
  GridSelect,
  GridTextField,
  GridTimeSelector,
  PageHeader,
  SectionSubtitle,
  SectionTitle,
  Space20,
  Space40,
} from './Commons'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import FolderOpenIcon from '@mui/icons-material/FolderOpen'
import SaveIcon from '@mui/icons-material/Save'
import DoneIcon from '@mui/icons-material/Done'
import CloseIcon from '@mui/icons-material/Close'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import MaterialPricesManagement from 'components/pages/MaterialPricesManagement'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import { trlb } from '../utilities/translator/translator'
import { useNavigate } from 'react-router'
import { Contract, IUser, InsuranceEntry, MaterialPriceOverride, NewMaterial, SurgerySlot } from '@empty/lib.constants'
import { addDays, addHours, differenceInCalendarDays, format, getDay, isValid, setSeconds } from 'date-fns'
import { Add, Restore } from '@mui/icons-material'
import { FormikProps } from 'formik'
import uniqid from 'uniqid'

// TODO this is most likely unused
// export const BookingInfo = ({ showBookingInfo, setShowBookingInfo }) => {
//   const navigate = useNavigate()
//   return (
//     <Modal
//       open={showBookingInfo}
//       onClose={() => setShowBookingInfo(false)}
//       BackdropProps={{ style: { backgroundColor: 'rgba(0,0,0, 0.3)' } }}
//       style={{
//         height: '100%',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//       }}
//     >
//       <Paper style={{ minHeight: '65%', width: '50%', padding: '20px' }}>
//         <Grid container sx={{ justifyContent: 'center' }}>
//           <Space20 />
//           <PageHeader pageTitle={trlb('booking_info_title')}>
//             <CloseButton onClick={() => setShowBookingInfo(false)} />
//           </PageHeader>
//           <Space20 />
//           {location.pathname === '/schedule' ? (
//             <TextIconButton
//               text={trlb('booking_info_delete')}
//               icon={<DeleteIcon sx={{ marginRight: '10px', fill: 'red' }} />}
//             />
//           ) : null}

//           <Grid
//             item
//             xs={8}
//             sx={{
//               margin: '10px',
//               marginTop: '20px',
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'center',
//             }}
//           >
//             <Typography
//               variant='body2'
//               sx={{
//                 fontSize: '20px',
//                 margin: '10px',
//                 width: '100%',
//                 textAlign: 'center',
//                 fontWeight: '700',
//               }}
//             >
//               Doctor's name - Surgery 7
//             </Typography>
//             <Typography variant='body2' sx={{ fontSize: '20px', margin: '10px' }}>
//               {trlb('commons_date')}: Thursday 15:00-17:00
//             </Typography>
//             <Typography variant='body2' sx={{ fontSize: '20px', margin: '10px' }}>
//               {trlb('commons_details')}: Public - overnight
//             </Typography>
//             <Typography variant='body2' sx={{ fontSize: '20px', margin: '10px' }}>
//               {trlb('calendarCard_patient')}: Mario Rossi - 19/05/1976
//             </Typography>
//             <Typography variant='body2' sx={{ fontSize: '20px', margin: '10px' }}>
//               {trlb('commons_narcosis')}: LA
//             </Typography>
//             <SectionSubtitle text={trlb('booking_info_bookingNotes')} />
//             <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
//               <TextField
//                 sx={{ width: '100%' }}
//                 label={trlb('formBooking_Notes')}
//                 variant='outlined'
//                 multiline
//                 rows={4}
//               />
//             </Grid>
//           </Grid>
//           <Grid
//             item
//             xs={12}
//             sx={{
//               margin: '10px',
//               display: 'flex',
//               justifyContent: 'space-between',
//             }}
//           >
//             <TextIconButton
//               text={trlb('booking_info_go_to_details')}
//               icon={<FolderOpenIcon sx={{ marginRight: '10px' }} />}
//               onClick={() => navigate('/cases/casedetails')}
//             />
//             <TextIconButton
//               text={trlb('booking_info_edit_bookingRequest')}
//               icon={<EditIcon sx={{ marginRight: '10px' }} onClick={() => navigate('/bookings/edit')} />}
//             />
//           </Grid>
//         </Grid>
//       </Paper>
//     </Modal>
//   )
// }

export const SaveTimetable = ({ setEdit, saveTimetable, setSaveTimetable }) => {
  const theme = useTheme()
  const [showNotes, setShowNotes] = useState(false)
  return (
    <Modal
      open={saveTimetable}
      onClose={() => setSaveTimetable(false)}
      BackdropProps={{ style: { backgroundColor: 'rgba(0,0,0, 0.3)' } }}
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper style={{ minHeight: '45%', width: '50%', padding: '20px' }}>
        <Grid container sx={{ justifyContent: 'center' }}>
          <PageHeader pageTitle={trlb('calendar_confirm_timetable')}>
            <CloseButton onClick={() => setSaveTimetable(false)} />
          </PageHeader>
          <Space20 />
          <SectionTitle text='' margin='0px' />
          <Space20 />
          <Typography variant='body1' sx={{ width: '100%', textAlign: 'center', fontSize: '20px' }}>
            {trlb('calendar_confirm_timetable_string')}
          </Typography>
          <Space20 />
          <Typography variant='body1' sx={{ width: '100%', textAlign: 'center', fontSize: '20px' }}>
            25/07/22 - 31/07/22
          </Typography>
          <Space20 />
          <SectionSubtitle text={trlb('calendar_appointments')} />
          <Grid
            container
            sx={{
              justifyContent: 'center',
              border: '1px solid lightGrey',
              borderRadius: '4px',
              padding: '20px',
            }}
          >
            <Typography variant='body1' sx={{ width: '100%', textAlign: 'center', fontSize: '18px' }}>
              Doctor 1 - surgery 1
            </Typography>
            <Space20 />
            <Typography variant='body1' sx={{ width: '100%', textAlign: 'center', fontSize: '18px' }}>
              {trlb('commons_from')}: 25/07/22 13:00-15:00 {trlb('commons_to')}: 26/07/22 13:00-15:00
            </Typography>
            <Space20 />
            <FormControlLabel
              control={<Checkbox />}
              label={trlb('booking_noDoctor_confirmation')}
              sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
              onChange={() => setShowNotes(!showNotes)}
            />
            <Space20 />
            {showNotes ? <GridNotesSection label={trlb('formBooking_Notes')} xs={8} /> : null}
          </Grid>

          <Space20 />
          <TextIconButton
            onClick={() => {
              setEdit(false), setSaveTimetable(false)
            }}
            text={trlb('calendar_confirm_timetable')}
            icon={<SaveIcon sx={{ marginRight: '10px' }} />}
          />
        </Grid>
      </Paper>
    </Modal>
  )
}

export const ChangeRequested = () => {
  const navigate = useNavigate()
  // faccio vedere il popover con location.pathname, ovviamente poi sarà un'altra logica e il click del CloseButton non potrà essere history.push
  return (
    <Modal
      open={location.pathname === '/schedule/changerequested'}
      BackdropProps={{ style: { backgroundColor: 'rgba(0,0,0, 0.3)' } }}
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper style={{ minHeight: '45%', width: '50%', padding: '20px' }}>
        <Grid container sx={{ justifyContent: 'center' }}>
          <PageHeader pageTitle={trlb('booking_changeRequested')}>
            <CloseButton onClick={() => navigate('/schedule')} />
          </PageHeader>
          <SectionTitle text={trlb('booking_changeRequested_msg')} />
          <SectionSubtitle text={trlb('booking_changeRequested_doctorMsg')} />
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <TextField sx={{ width: '100%' }} label={trlb('formBooking_Notes')} variant='outlined' multiline rows={4} />
          </Grid>
          <Space20 />
          <TextIconButton text={trlb('booking_sendRequest')} icon={<DoneIcon sx={{ marginRight: '10px' }} />} />
        </Grid>
      </Paper>
    </Modal>
  )
}
export const BillExternally = ({ showBillExternally, setShowBillExternally, caseNr }) => {
  const [confirmationMessage, setConfirmationMessage] = useState(false)
  const handleClose = () => {
    setShowBillExternally(false), setConfirmationMessage(false)
  }

  // faccio vedere il popover con location.pathname, ovviamente poi sarà un'altra logica e il click del CloseButton non potrà essere history.push
  return (
    <Modal
      open={showBillExternally}
      BackdropProps={{ style: { backgroundColor: 'rgba(0,0,0, 0.3)' } }}
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper style={{ minHeight: '30%', width: '50%', padding: '20px' }}>
        <Grid
          container
          sx={{
            minHeight: '100%',
            justifyContent: 'center',
            alignItems: 'end',
          }}
        >
          <PageHeader pageTitle={trlb('bill_externally_title')}>
            <CloseButton onClick={handleClose} />
          </PageHeader>
          {!confirmationMessage ? (
            <>
              <SectionTitle text={trlb('bill_externally_case') + caseNr + trlb('bill_externally_caseString')} />
              <Space20 />
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <TextIconButton
                  text={trlb('commons_confirm')}
                  onClick={() => setConfirmationMessage(true)}
                  icon={<DoneIcon sx={{ marginRight: '10px' }} />}
                />
                <TextIconButton
                  text={trlb('commons_cancel')}
                  onClick={handleClose}
                  icon={<CloseIcon sx={{ marginRight: '10px' }} />}
                />
              </Grid>
            </>
          ) : (
            <>
              <Space20 />
              <SectionSubtitle text={trlb('bill_externally_caseMarked')} />
            </>
          )}
        </Grid>
      </Paper>
    </Modal>
  )
}
export const CreateCostEstimate = ({
  showCreateCostEstimate,
  setShowCreateCostEstimate,
  showDownloadCostEstimate,
  setShowDownloadCostEstimate,
}) => {
  const [showMaterials, setShowMaterials] = useState(false)
  const handleClose = () => {
    setShowCreateCostEstimate(false)
  }
  const doctorsList = ['Doctor 1', 'Doctor 2', 'Doctor 3'].map(el => ({
    label: el,
    value: el,
  }))

  return (
    <Modal
      open={showCreateCostEstimate}
      BackdropProps={{ style: { backgroundColor: 'rgba(0,0,0, 0.3)' } }}
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper
        style={{
          maxHeight: '98%',
          width: '50%',
          padding: '20px',
          overflow: 'scroll',
        }}
      >
        <PageHeader pageTitle={trlb('costEstimate_page_title')}>
          <CloseButton onClick={handleClose} />
        </PageHeader>
        <Grid
          container
          xs={12}
          spacing={2}
          sx={{
            minHeight: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            paddingLeft: '16px',
          }}
        >
          <Space40 />
          <Typography variant='subtitle' sx={{ width: '100%', textAlign: 'center' }}>
            {trlb('costEstimate_patient_info')}
          </Typography>
          <GridTextField label={trlb('patientForm_Name')} xs={4} />
          <GridTextField label={trlb('patientForm_Surname')} xs={4} />
          <GridTextField label={trlb('patientForm_Birthdate')} xs={4} />
          <Space20 />
          <Typography variant='subtitle' sx={{ width: '100%', textAlign: 'center' }}>
            {trlb('costEstimate_surgery_info')}
          </Typography>
          <GridTextField label={trlb('formBooking_OpStandard')} xs={4} />
          <GridDateSelector label={trlb('costEstimate_surgeryDate')} xs={4} />
          <GridSelect xs={4} label={trlb('costEstimate_doctorSeleciton')} menuItems={doctorsList} value='' />

          <Space20 />
          <Typography variant='subtitle' sx={{ width: '100%', textAlign: 'center' }}>
            {trlb('costEstimate_prices')}
          </Typography>
          <GridTextField label={trlb('costEstimate_OPV')} xs={12} />
          <GridTextField label={trlb('costEstimate_StandBy')} xs={12} />
          <GridTextField label={trlb('costEstimate_anesthesia')} xs={12} />

          <GridTextField label={trlb('costEstimate_materials')} xs={11} />
          <Grid item xs={1}>
            <IconButton onClick={() => setShowMaterials(!showMaterials)}>
              <InfoOutlinedIcon />
            </IconButton>
          </Grid>
          {showMaterials ? (
            <>
              <Space20 />
              <MaterialPricesManagement />
            </>
          ) : null}
          <GridTextField label={trlb('costEstimate_msg')} xs={12} />

          <Space40 />
          <Typography sx={{ width: '100%', textAlign: 'right', fontSize: '20px' }}>
            <b>{trlb('costEstimate_total')}</b> 1235,00€
          </Typography>
          <Space20 />
          <SaveButton
            onClick={() => {
              setShowDownloadCostEstimate(true), handleClose()
            }}
          />
        </Grid>
      </Paper>
    </Modal>
  )
}
export const CreateReceipt = ({ showCreateReceipt, setShowCreateReceipt, setShowDownloadReceipt }) => {
  const handleClose = () => {
    setShowCreateReceipt(false)
  }
  const receiptOptions = ['Deposit', 'Final payment', 'Refund']
  const [receiptOptionSelected, setReceiptOptionSelected] = useState('')

  return (
    <Modal
      open={showCreateReceipt}
      BackdropProps={{ style: { backgroundColor: 'rgba(0,0,0, 0.3)' } }}
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper
        style={{
          maxHeight: '98%',
          width: '50%',
          padding: '20px',
          overflow: 'scroll',
        }}
      >
        <PageHeader pageTitle={trlb('createReceipt_title')} button={<CloseButton onClick={handleClose} />} />
        <Grid
          container
          xs={12}
          spacing={2}
          sx={{
            minHeight: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            paddingLeft: '16px',
          }}
        >
          <Space40 />
          <GridSelect
            xs={12}
            label={trlb('createReceipt_for')}
            menuItems={receiptOptions.map(el => ({ value: el, label: el }))}
            value={receiptOptionSelected}
            onChange={event => setReceiptOptionSelected(event.target.value)}
          />
          <Space20 />
          <Typography variant='subtitle' sx={{ width: '100%', textAlign: 'center' }}>
            {trlb('createReceipt_patient_info')}
          </Typography>
          <GridTextField label={trlb('patientForm_Name')} xs={6} />
          <GridTextField label={trlb('patientForm_Surname')} xs={6} />
          <Space20 />
          <Typography variant='subtitle' sx={{ width: '100%', textAlign: 'center' }}>
            {trlb('createReceipt_amount')}
          </Typography>
          <GridTextField label={trlb('createReceipt_amount_net')} xs={12} />
          <GridTextField label={trlb('createReceipt_amount_vat')} xs={12} />
          <Space40 />
          <Typography sx={{ width: '100%', textAlign: 'right', fontSize: '20px' }}>
            <b>{trlb('createReceipt_total')}</b> 305,00€
          </Typography>
          <Space20 />
          <SaveButton
            onClick={() => {
              setShowDownloadReceipt(true), handleClose()
            }}
          />
        </Grid>
      </Paper>
    </Modal>
  )
}
export const UploadCsv = ({ setShowUploadCsv, showUploadCsv }) => {
  const [showChooseVersion, setShowChooseVersion] = useState(false)

  return (
    <Modal
      open={showUploadCsv}
      BackdropProps={{ style: { backgroundColor: 'rgba(0,0,0, 0.3)' } }}
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper style={{ minHeight: '45%', width: '70%', padding: '20px' }}>
        <Grid container sx={{ justifyContent: 'center' }}>
          <PageHeader
            pageTitle={trlb('uploadcsv_page_title')}
            button={<CloseButton onClick={() => setShowUploadCsv(false)} />}
          />
          <Space20 />
          <DefaultButton icon={<FileUploadIcon />} text={trlb('uploadcsv_page_title')} />
          <Space20 />
          <Grid container spacing={2}>
            <Space20 />
            <Typography variant='subtitle' sx={{ width: '100%', textAlign: 'center' }}>
              {trlb('uploadcsv_validity')}
            </Typography>
            <GridDateSelector xs={6} label={trlb('uploadcsv_validFrom')} />
            <GridDateSelector
              xs={6}
              label={trlb('uploadcsv_validUntil')}
              onChange={() => setShowChooseVersion(!showChooseVersion)}
            />
            {showChooseVersion ? (
              <>
                <Space20 />
                <Typography sx={{ color: 'red', width: '100%', textAlign: 'center' }}>
                  <b>{trlb('commons_warning')}:</b> {trlb('uploadcsv_another_version_exists_msg')} 01/01/2023
                </Typography>
                <Space20 />
                <SectionSubtitle text={trlb('commons_choose_option')} />
                <Stack sx={{ paddingLeft: '20px' }}>
                  <FormControlLabel
                    control={<Checkbox />}
                    label={trlb('uploadcsv_overrideVersion')}
                    onChange={() => setShowBGOption(!showBGOption)}
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label={trlb('uploadcsv_set_version_validity') + '01/01/2023'}
                    onChange={() => setShowBGOption(!showBGOption)}
                  />
                </Stack>
              </>
            ) : null}
          </Grid>
          <Space40 />
          <SaveButton onClick={() => setShowUploadCsv(false)} />
        </Grid>
      </Paper>
    </Modal>
  )
}
export const AddBGAddress = ({ showAddBGAddress, setShowAddBGAddress, BGName }) => {
  return (
    <Modal
      open={showAddBGAddress}
      BackdropProps={{ style: { backgroundColor: 'rgba(0,0,0, 0.3)' } }}
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper style={{ minHeight: '45%', width: '80%', padding: '20px' }}>
        <Grid container sx={{ justifyContent: 'center' }}>
          <PageHeader
            pageTitle={trlb('add_bg_address')}
            button={<CloseButton onClick={() => setShowAddBGAddress(false)} />}
          />
          <Space20 />
          <SectionTitle text={BGName} />
          <Grid container spacing={2}>
            {/* <AddressFormFields /> */}
          </Grid>
          <Space40 />
          <SaveButton onClick={() => setShowAddBGAddress(false)} />
        </Grid>
      </Paper>
    </Modal>
  )
}
export const ChangeNotified = () => {
  const navigate = useNavigate()

  // faccio vedere il popover con location.pathname, ovviamente poi sarà un'altra logica e il click del CloseButton non potrà essere history.push
  return (
    <Modal
      open={location.pathname === '/schedule/changenotified'}
      BackdropProps={{ style: { backgroundColor: 'rgba(0,0,0, 0.3)' } }}
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper style={{ minHeight: '45%', width: '50%', padding: '20px' }}>
        <Grid container sx={{ justifyContent: 'center' }}>
          <PageHeader
            pageTitle={trlb('changeNotified_title')}
            button={<CloseButton onClick={() => navigate('/schedule')} />}
          />
          <SectionTitle text={trlb('changeNotified_rescheduledAppointment')} />
          <Typography variant='h6' sx={{ width: '100%', textAlign: 'center' }}>
            {trlb('commons_from')}: 25/07/22 13:00{trlb('commons_divider')}15:00{' '}
          </Typography>

          <Typography variant='h6'>
            {trlb('commons_to')}: 26/07/22 13:00{trlb('commons_divider')}15:00{' '}
          </Typography>

          <Space20 />
          <FormControlLabel
            control={<Checkbox />}
            label={trlb('booking_noDoctor_confirmation')}
            sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
          />
          <Space20 />
          <TextIconButton text={trlb('commons_send_notification')} icon={<DoneIcon sx={{ marginRight: '10px' }} />} />
        </Grid>
      </Paper>
    </Modal>
  )
}
export const AddTimeSlot = ({
  showAddTimeSlot,
  setShowAddTimeSlot,
  singleSlotProp,
  form,
  surgerySlots,
  setSurgerySlots,
  setSingleSlotProp,
}: {
  showAddTimeSlot: boolean
  setShowAddTimeSlot: (value: boolean) => void
  singleSlotProp: boolean
  setSingleSlotProp: (value: boolean) => void
  form: FormikProps<Omit<Contract, 'contractId'>>
  surgerySlots: SurgerySlot[]
  setSurgerySlots: (value: SurgerySlot[]) => void
}) => {
  const fromDate = setSeconds(new Date(form.values.details.validFrom), 0)
  const untilDate = setSeconds(new Date(form.values.details.validUntil), 0)
  const [error, setError] = useState<string>('')
  const [slots, setSlots] = useState<{ id?: string; to: Date; from: Date }[]>(
    singleSlotProp ? [{ from: fromDate, to: addHours(fromDate, 1) }] : [],
  )

  const handleSetSurgerySlots = () => {
    const sortedSurgerySlots = [...surgerySlots, ...slots].sort((a, b) => (a.from > b.from ? 1 : -1))
    let error = null
    for (let i = 0; i < sortedSurgerySlots.length - 1; i++) {
      if (new Date(sortedSurgerySlots[i].from).getTime() > new Date(sortedSurgerySlots[i].to).getTime())
        error = 'contract_slotDatesMismatch'
      if (new Date(sortedSurgerySlots[i].to).getTime() > new Date(sortedSurgerySlots[i + 1].from).getTime()) {
        error = 'contract_slotsDatesOverlap'
        break
      }
    }

    if (!error) {
      setError('')
      setSurgerySlots(
        [...surgerySlots, ...slots].map(obj => ({
          id: obj.id ?? uniqid(),
          from: new Date(obj.from),
          to: new Date(obj.to),
        })),
      )
      setShowAddTimeSlot(false)
      setSingleSlotProp(false)
    } else {
      setError(error)
    }
  }

  const onClose = () => {
    setShowAddTimeSlot(false)
  }

  const handleDate = (data: any) => {
    const date = new Date(data)
    if (!isValid(date)) return
    const from = new Date(date)
    from.setHours((slots[0]?.from ?? new Date()).getHours(), (slots[0]?.from ?? new Date()).getMinutes(), 0, 0)
    const to = new Date(date)
    to.setHours((slots[0]?.to ?? new Date()).getHours(), (slots[0]?.to ?? new Date()).getMinutes(), 0, 0)
    const newSlot = { ...(slots[0] ?? {}), from, to }
    setSlots([newSlot])
  }

  const handleTimeFrom = (data: any) => {
    const date = new Date(data)
    if (!isValid(date)) return
    const from = new Date(slots[0]?.from)
    from.setHours(date.getHours(), date.getMinutes(), 0, 0)
    const newSlot = { ...(slots[0] ?? {}), from }
    setSlots([newSlot])
  }

  const handleTimeTo = (data: any) => {
    const date = new Date(data)
    if (!isValid(date)) return
    const to = new Date(slots[0]?.to)
    to.setHours(date.getHours(), date.getMinutes(), 0, 0)
    const newSlot = { ...(slots[0] ?? {}), to }
    setSlots([newSlot])
  }

  return (
    <Modal
      open={showAddTimeSlot}
      onClose={onClose}
      BackdropProps={{ style: { backgroundColor: 'rgba(0,0,0, 0.3)' } }}
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper
        sx={{ maxHeight: '90%', maxWidth: '60%', padding: '20px', pt: 0, overflowY: 'auto', position: 'relative' }}
      >
        <PageHeader
          toolbarSx={{ top: 0 }}
          pageTitle={singleSlotProp ? trlb('addTimeSlot_pageTitle') : trlb('addSlots_pageTitle')}
          button={<CloseButton onClick={onClose} />}
        />
        <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
          <Space20 />
          {singleSlotProp ? (
            <>
              <GridDateSelector
                xs={4}
                value={slots[0]?.from}
                error={Boolean(error)}
                helperText={trlb(error)}
                minDate={fromDate}
                maxDate={untilDate}
                onChange={value => handleDate(value)}
              />
              <GridTimeSelector
                value={slots[0]?.from}
                label={trlb('commons_from')}
                error={error}
                xs={4}
                onChange={value => handleTimeFrom(value)}
                minTime={fromDate}
              />
              <GridTimeSelector
                value={slots[0]?.to}
                label={trlb('commons_to')}
                error={error}
                xs={4}
                onChange={value => handleTimeTo(value)}
                maxTime={untilDate}
              />
              <Space40 />
              <SaveButton onClick={handleSetSurgerySlots} />
            </>
          ) : (
            <MultipleSlots {...{ form, slots, setSlots, error, setError, onSave: handleSetSurgerySlots }} />
          )}
        </Grid>
      </Paper>
    </Modal>
  )
}

interface RemoveTimeSlotProps {
  showRemoveTimeSlot: boolean
  setShowRemoveTimeSlot: React.Dispatch<React.SetStateAction<boolean>>
  onSave: (slots: SurgerySlot[]) => void
  currentSlots: SurgerySlot[]
}

export const RemoveTimeSlot: React.FC<RemoveTimeSlotProps> = ({
  showRemoveTimeSlot,
  setShowRemoveTimeSlot,
  onSave = () => {},
  currentSlots,
}) => {
  const [slots, setSlots] = useState<SurgerySlot[]>(currentSlots)

  const handleRemoveSlots = () => {
    onSave(slots)
    setShowRemoveTimeSlot(false)
  }

  useEffect(() => {
    setSlots(currentSlots)
  }, [currentSlots])

  return (
    <Modal
      open={showRemoveTimeSlot}
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClose={() => setShowRemoveTimeSlot(false)}
    >
      <Paper style={{ maxWidth: '60%', padding: '20px' }}>
        <PageHeader
          pageTitle={trlb('removeSlots_pageTitle')}
          button={<CloseButton onClick={() => setShowRemoveTimeSlot(false)} />}
        />
        <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
          <Space20 />
          <MultipleSlots remove={true} {...{ slots, setSlots, onSave: handleRemoveSlots }} />
        </Grid>
      </Paper>
    </Modal>
  )
}
const MultipleSlots = ({ form, slots, setSlots, remove, error, setError, onSave }) => {
  const validFrom = form?.values?.details.validFrom
  const validUntil = form?.values?.details.validUntil
  const [from, setFrom] = useState<Date>(new Date(validFrom))
  const [to, setTo] = useState<Date>(new Date(validUntil))
  const [chosenDays, setChosenDay] = useState<string[]>([])
  const [repeatedOption, setRepeatedOption] = useState<number | string>('')
  const [multipleDaysSelected, setMultipleDaysSelected] = useState<Date[]>([])
  const distance = differenceInCalendarDays(new Date(validUntil), new Date(validFrom))

  const days = [
    trlb('dateTime_MONDAY'),
    trlb('dateTime_TUESDAY'),
    trlb('dateTime_WEDNESDAY'),
    trlb('dateTime_THURSDAY'),
    trlb('dateTime_FRIDAY'),
    trlb('dateTime_SATURDAY'),
  ]

  const calculateSchedule = () => {
    let selectedSlots: SurgerySlot[] = []
    const fromHour = from.getHours()
    const fromMinute = from.getMinutes()
    const toHour = to.getHours()
    const toMinute = to.getMinutes()
    if (chosenDays.length) {
      let _days = [trlb('dateTime_SUNDAY'), ...days]
      let weekIndex = 0
      let tempSelectedSlots: Record<string, SurgerySlot[]> = {}

      for (let i = 0; i < distance + 1; i++) {
        const currentDay = addDays(new Date(validFrom), i)
        const dayOfWeek = getDay(currentDay)
        if (dayOfWeek === 1 && !!i) weekIndex++
        if (chosenDays.includes(_days[dayOfWeek]))
          tempSelectedSlots = {
            ...tempSelectedSlots,
            [weekIndex.toString()]: [
              ...(tempSelectedSlots[weekIndex.toString()] ?? []),
              {
                id: uniqid(),
                from: currentDay.setHours(fromHour, fromMinute, 0, 0),
                to: currentDay.setHours(toHour, toMinute, 0, 0),
              },
            ],
          }
      }
      if (repeatedOption)
        Object.keys(tempSelectedSlots).forEach(key => {
          if (Number(key) % Number(repeatedOption) !== 0) delete tempSelectedSlots[key]
        })

      Object.values(tempSelectedSlots).forEach(_value => {
        selectedSlots = selectedSlots.concat(_value)
      })
    } else if (multipleDaysSelected.length) {
      selectedSlots = multipleDaysSelected.map((date, index) => ({
        id: uniqid(),
        from: date.setHours(fromHour, fromMinute, 0, 0),
        to: date.setHours(toHour, toMinute, 0, 0),
      }))
    } else {
      selectedSlots = [
        {
          id: uniqid(),
          from: new Date(validFrom).setHours(fromHour, fromMinute, 0, 0),
          to: new Date(validUntil).setHours(toHour, toMinute, 0, 0),
        },
      ]
    }

    setSlots(selectedSlots)
  }

  const calculateSchceduleForRemoving = () => {
    let finalItems = [...slots]
    if (multipleDaysSelected.length) {
      const deletedDates = multipleDaysSelected.map(day => format(day, 'dd/MM/yyyy'))
      finalItems = finalItems.filter(item => !deletedDates.includes(format(new Date(item.from), 'dd/MM/yyyy')))
    } else {
      finalItems = finalItems.filter(item => !chosenDays.includes(['Sunday', ...days][getDay(new Date(item.from))]))
    }

    setSlots(finalItems)
  }

  const handleSelectMultiDays = (values: Date[]) => {
    setMultipleDaysSelected(values)
  }

  const onChangeSelectedDay = (date: string) => (e: SyntheticEvent<Element, Event>, value: boolean) => {
    if (!value) {
      setChosenDay([...chosenDays].filter(day => day !== date))
      return
    }
    if (chosenDays.includes(date)) return
    setChosenDay([...chosenDays, date])
  }

  useEffect(() => {
    if (!remove) setError(false)
  }, [repeatedOption, chosenDays, from, to, multipleDaysSelected, remove])

  useEffect(() => {
    if (multipleDaysSelected.length && (chosenDays.length || repeatedOption)) {
      setRepeatedOption('')
      setChosenDay([])
    }
    if (!remove) calculateSchedule()
    else calculateSchceduleForRemoving()
  }, [multipleDaysSelected])

  useEffect(() => {
    if (multipleDaysSelected.length && (chosenDays.length || repeatedOption)) {
      setMultipleDaysSelected([])
      if (!remove) calculateSchedule()
      else calculateSchceduleForRemoving()
    }
  }, [repeatedOption, chosenDays])

  const errorState = !multipleDaysSelected.length && !chosenDays.length ? 'contract_multipleSlots_noDaysSelected' : ''

  return (
    <>
      {!remove ? (
        <>
          <SectionSubtitle text={trlb('commons_time')} />
          <GridTimeSelector
            label={trlb('commons_from')}
            xs={4}
            minTime={validFrom}
            onChange={setFrom}
            error={error}
            helperText={error ? trlb('contract_invalid_slot_time') : ''}
          />
          <GridTimeSelector label={trlb('commons_to')} xs={4} minTime={from} onChange={setTo} error={error} />
        </>
      ) : null}

      <SectionSubtitle text={remove ? trlb('removeEvery') : trlb('repeatEvery')} />
      <Grid
        item
        xs={8}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          paddingLeft: '0',
        }}
      >
        {days.map(day => (
          <FormControlLabel
            key={day}
            sx={{ width: '150px' }}
            control={<Checkbox />}
            label={day}
            checked={chosenDays.includes(day)}
            onChange={onChangeSelectedDay(day)}
          />
        ))}
      </Grid>
      {!remove ? (
        <GridSelect
          xs={8}
          disabled={!chosenDays.length}
          menuItems={[
            { label: '', value: '' },
            ...[trlb('dateTime_two_weeks'), trlb('dateTime_three_weeks'), trlb('dateTime_four_weeks')].map(
              (el, index) => ({
                value: index + 2,
                label: el,
              }),
            ),
          ]}
          label={trlb('onlyOnce_every')}
          value={repeatedOption}
          onChange={(e: SelectChangeEvent<unknown>) => setRepeatedOption(e.target.value as string)}
        />
      ) : null}

      <SectionSubtitle text={trlb('chooseSpecific_Dates')} />
      {/* todo: make date selector multi select */}
      <GridMultiDateSelector
        minDate={new Date(validFrom)}
        maxDate={new Date(validUntil)}
        value={multipleDaysSelected}
        onChange={handleSelectMultiDays}
      />
      <Space40 />
      <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
        <SaveButton disabled={errorState} onClick={onSave} />
        {errorState && (
          <Typography sx={{ color: 'red', mt: 1 }} variant='body1'>
            {trlb(errorState)}
          </Typography>
        )}
      </Box>
    </>
  )
}
export const FilterDropdownMenu = ({ buttonText, menuItems }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = anchorEl
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div style={{ width: '100%' }}>
      <Button
        variant='contained'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{ width: '100%', height: 55 }}
      >
        {buttonText}
      </Button>

      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        sx={{
          '.MuiMenu-paper': {
            marginTop: '20px',
            width: '31%',
            padding: '20px 30px',
          },
        }}
      >
        <Grid container spacing={2}>
          <GridDateSelector label={trlb('commons_start_date')} xs={6} />
          <GridDateSelector label={trlb('commons_end_date')} xs={6} />
        </Grid>
        <Space20 />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <TextIconButton
            text={trlb('commons_filter')}
            icon={<DoneIcon sx={{ marginRight: '10px', fontSize: '20px' }} />}
            onClick={handleClose}
          />
        </div>
      </Menu>
    </div>
  )
}

interface ConfirmDeleteContractProps {
  showConfirm: boolean
  setShowConfirm: Dispatch<SetStateAction<boolean>>
  onConfirm: () => void
  doctorInfo?: null | IUser
}

export const ConfirmDeleteContract: React.FC<ConfirmDeleteContractProps> = ({
  showConfirm,
  setShowConfirm,
  onConfirm,
  doctorInfo,
}) => {
  const [doctorName, setDoctorName] = useState<string>()
  const doctorInfoName = `${doctorInfo?.firstName ?? ''} ${doctorInfo?.lastName ?? ''}`
  return (
    <Modal
      open={showConfirm}
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClose={() => setShowConfirm(false)}
    >
      <Paper style={{ minHeight: '45%', width: 'auto', padding: '20px' }}>
        <Grid container sx={{ justifyContent: 'center' }}>
          <PageHeader
            pageTitle={trlb('Warning')}
            button={<CloseButton onClick={() => setShowConfirm(false)} />}
            xs={{ width: '100%' }}
          />
          <Space20 />
          <Typography>{trlb('contract_reenter_doctor_name_to_confirm', { doctorInfoName })}</Typography>
          <Space20 />
          <GridTextField
            value={doctorName}
            label={trlb('doctor')}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setDoctorName(e.target.value)}
            variant='outlined'
            xs={12}
          />
        </Grid>
        <Space20 />
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
          <DeleteButton onClick={onConfirm} disabled={doctorName !== doctorInfoName} />
        </Grid>
      </Paper>
    </Modal>
  )
}

interface ConfirmCreateContractProps {
  showConfirm: boolean
  setShowConfirm: Dispatch<SetStateAction<boolean>>
  onConfirm: () => void
  doctorInfo: IUser
  distance: number
}

export const ConfirmCreateContract: React.FC<ConfirmCreateContractProps> = ({
  showConfirm,
  setShowConfirm,
  onConfirm,
  doctorInfo,
  distance,
}) => {
  const [doctorName, setDoctorName] = useState<string>()
  const doctorInfoName = `${doctorInfo?.firstName ?? ''} ${doctorInfo?.lastName ?? ''}`

  return (
    <Modal
      open={showConfirm}
      BackdropProps={{ style: { backgroundColor: 'rgba(0,0,0, 0.3)' } }}
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper style={{ minHeight: '45%', width: 'auto', padding: '20px' }}>
        <Grid container sx={{ justifyContent: 'center' }}>
          <PageHeader
            pageTitle={trlb('Warning')}
            button={<CloseButton onClick={() => setShowConfirm(false)} />}
            xs={{ width: '100%' }}
          />
          <Space20 />
          <Typography style={{ textAlign: 'center' }}>
            {trlb('contract_leave_doctor_selected_date_contract', {
              fullName: `${doctorInfo.firstName} ${doctorInfo.lastName}`,
              distance: distance.toString(),
            })}
          </Typography>
          <Space20 />
          <Typography>{trlb('contract_reenter_doctor_name_to_confirm', { doctorInfoName })}</Typography>
          <Space20 />
          <GridTextField
            xs={12}
            value={doctorName}
            label={trlb('doctor')}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setDoctorName(e.target.value)}
          />
        </Grid>
        <Space20 />
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
          <SaveButton onClick={onConfirm} disabled={doctorName !== doctorInfoName} />
        </Grid>
      </Paper>
    </Modal>
  )
}

interface ConfirmEditContractProps {
  showConfirm: boolean
  setShowConfirm: Dispatch<SetStateAction<boolean>>
  onConfirm: () => void
  lastCaseBookingDate: Date
  newValidFromDate: Date
}

export const ConfirmEditContract: React.FC<ConfirmEditContractProps> = ({
  showConfirm,
  setShowConfirm,
  onConfirm,
  lastCaseBookingDate,
  newValidFromDate,
}) => {
  if (!isValid(lastCaseBookingDate) || !isValid(newValidFromDate)) return null
  return (
    <Modal
      open={showConfirm}
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClose={() => setShowConfirm(false)}
    >
      <Paper style={{ minHeight: '45%', width: 'auto', padding: '20px' }}>
        <Grid container sx={{ justifyContent: 'center' }}>
          <PageHeader
            pageTitle={trlb('Warning')}
            button={<CloseButton onClick={() => setShowConfirm(false)} />}
            xs={{ width: '100%' }}
          />
          <Space20 />
          <Typography style={{ textAlign: 'center' }}>{trlb('contract_conflict_between_contract_case')}</Typography>
          <Space20 />
          <Typography style={{ textAlign: 'center' }}>
            {trlb('contract_conflict_between_contract_case_dates', {
              lastCaseBookingDate: format(lastCaseBookingDate, trlb('dateTime_date_string')),
              newValidFromDate: format(newValidFromDate, trlb('dateTime_date_string')),
            })}
          </Typography>
          <Space20 />
          <Typography>{trlb('contract_continue_edit')}</Typography>
          <Space20 />
        </Grid>
        <Space20 />
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
          <SaveButton onClick={onConfirm} />
        </Grid>
      </Paper>
    </Modal>
  )
}

interface MaterialPricePairPopoverProps {
  showMaterialPopover: boolean
  setShowMaterialPopover: Dispatch<SetStateAction<boolean>>
  edit?: boolean
  materials: NewMaterial[]
  materialPriceList?: MaterialPriceOverride[]
  setMaterialPriceList: Dispatch<SetStateAction<MaterialPriceOverride[]>>
  defaultPrices: MaterialPriceOverride[] | undefined
}

export const MaterialPricePairPopover: React.FC<MaterialPricePairPopoverProps> = ({
  showMaterialPopover,
  setShowMaterialPopover,
  edit,
  materials,
  setMaterialPriceList,
  materialPriceList,
  defaultPrices,
}) => {
  const [materialPrices, setMaterialPrices] = useState<{ id: string; price: number }[]>([])
  useEffect(() => {
    if (materialPriceList) setMaterialPrices(materialPriceList)
  }, [materialPriceList])

  const handleClickAddMaterial = () => {
    setMaterialPrices([
      ...materialPrices,
      {
        id: '',
        price: 0,
      },
    ])
  }

  const handleChangeMaterialPrices = (list: MaterialPriceOverride[]) => {
    setMaterialPrices(list)
  }

  const handleClickSave = () => {
    setMaterialPriceList(materialPrices)
    setShowMaterialPopover(false)
  }

  const error = materialPrices.some(item => !item.id)

  return (
    <Modal
      open={showMaterialPopover}
      sx={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClose={() => setShowMaterialPopover(false)}
    >
      <Paper style={{ minHeight: '45%', maxHeight: '90%', width: '80%', padding: '20px' }}>
        <Grid container sx={{ justifyContent: 'center' }}>
          <Typography variant='h6'>{trlb('material_prices')}</Typography>
          <Space20 />
          <MaterialPricesManagement
            {...{
              setAddMaterial: handleClickAddMaterial,
              materials,
              materialPriceList: materialPrices,
              onChange: handleChangeMaterialPrices,
              defaultPrices,
              edit,
            }}
          />
        </Grid>
        <Space20 />
        {edit && (
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <SaveButton disabled={error} onClick={handleClickSave} />
          </Grid>
        )}
      </Paper>
    </Modal>
  )
}
