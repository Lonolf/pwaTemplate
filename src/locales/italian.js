const error = {
  error_reload_button: 'Ricarica la pagina',
  error_passedDownError_proposed_action: 'Azione proposta',
  error_passedDownError_text: 'Questo non era previsto!',
  error_passedDownError_title: 'Oops... ^^"',
}

const months = {
  month01: 'Gennaio',
  month02: 'Febbraio',
  month03: 'Marzo',
  month04: 'Aprile',
  month05: 'Maggio',
  month06: 'Giugno',
  month07: 'Luglio',
  month08: 'Agosto',
  month09: 'Settembre',
  month10: 'Ottobre',
  month11: 'Novembre',
  month12: 'Dicembre',
}

const dates = {
  Sun: 'Dom',
  Mon: 'Lun',
  Tue: 'Mar',
  Wed: 'Mer',
  Thu: 'Gio',
  Fri: 'Ven',
  Sat: 'Sab',

  Jan: 'Gen',
  Feb: 'Feb',
  Mar: 'Mar',
  Apr: 'Apr',
  May: 'Mag',
  Jun: 'Giu',
  Jul: 'Lug',
  Aug: 'Ago',
  Sep: 'Set',
  Oct: 'Ott',
  Nov: 'Nov',
  Dec: 'Dic',
  datetime_string: 'HH:mm dd/MM/yyyy',
}

const toPrice = (price) => {
  return Number(price).toLocaleString() + ' €'
}

const generic = {
  generic_loading: 'Caricamento in corso',
  generic_email: 'Email',
  generic_password: 'Password',
  generic_name: 'Nome',
  generic_confirm: 'Conferma',
}

const commons = {
  menu_title: 'Titoli',
  menu_home: 'Home',
}

export const italian = {
  toPrice,
  locale: 'it',
  ...error,
  ...months,
  ...dates,
  ...generic,
  ...commons,
}
