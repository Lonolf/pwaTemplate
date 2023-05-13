const dateTime = {
  dateTime_MONDAY: 'Monday',
  dateTime_TUESDAY: 'Tuesday',
  dateTime_WEDNESDAY: 'Wednesday',
  dateTime_THURSDAY: 'Thursday',
  dateTime_FRIDAY: 'Friday',
  dateTime_SATURDAY: 'Saturday',
  dateTime_SUNDAY: 'Sunday',
  dateTime_date_string: 'dd/MM/yyyy',
  dateTime_date_regex: '^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[012])/[0-9]{4}$',
  dateTime_time_string: 'HH:mm',
  dateTime_date_time_string: 'dd/MM/yyyy HH:mm',
  dateTime_two_weeks: 'two weeks',
  dateTime_three_weeks: 'three weeks',
  dateTime_four_weeks: 'four weeks',
  dateTime_dateRange_separator: 'to',
}

const error = {
  error_reload_button: 'Please reload the page',
  error_passedDownError_text: 'This was unexpected!',
  error_passedDownError_title: 'Oops... ^^"',
  error_validationFailed: 'Validation failed',
  error_invalidToken: 'Invalid token',
  error_noAuthorizationHeader: 'No authorization header',
  error_goHome_button: 'Go home',
}

const commons = {
  commons_menubar_title: 'Menu',
  commons_error: 'Error',
  commons_success: 'Success',
  commons_warning: 'Warning',
  commons_reload: 'Reload',
  welcomeTo: 'Welcome to',
  commons_loading: 'Loading...',
  commons_edit: 'Edit',
  commons_save: 'Save',
  commons_back: 'Back',
  commons_cancel: 'Cancel',
  commons_confirm: 'Confirm',
  commons_required: 'This field is required and cannot be empty',
  commons_phoneNotValid: 'This field must be a valid phone number',
  commons_unique: 'This field must be unique',
  commons_notANumber: 'This field must be a number',
  commons_min0: 'This field must be greater than or equal to 0',
  commons_invalid_date: 'Invalid date',
  commons_emailNotValid: 'Email not valid',
  commons_search: 'Search',
  commons_delete: 'Delete',
  commons_previous: 'Previous',
  commons_date: 'Date',
  commons_time: 'Time',
  commons_divider: '-',
  commons_details: 'Details',
  commons_narcosis: 'Narcosis',
  commons_from: 'from',
  commons_to: 'to',
  commons_choose_option: 'Choose one option',
  commons_send_notification: 'Send notification',
  commons_start_date: 'Start date',
  commons_end_date: 'End date',
  commons_filter: 'Filter',
  commons_download: 'Download',
  commons_add: 'add',
  commons_year: 'Year',
  commons_month: 'Month',
  commons_tot: 'Tot.',
  go_back: 'Go back',
  commons_home: 'Home',
  commons_email_required: 'Email is required',
  commons_password_required: 'Password is required',
  commons_view: 'view',
  commons_yes: 'Yes',
  commons_no: 'No',

  commons_error_toast: 'Error',
  commons_success_toast: 'Success',
  commons_warning_toast: 'Warning',
  commons_info_toast: 'Info',
  commons_discardChanges: 'Discard changes',

  commons_next: 'Next',
  common_no_permission: 'No permission',
  common_material: 'Material',
}

export const english = {
  locale: 'en',
  ...error,
  ...commons,
  ...dateTime,
}
