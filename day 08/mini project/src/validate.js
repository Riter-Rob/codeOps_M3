const TELEBIRR_RE = /^(?:\+251|0)9\d{8}$/
const VALID_AREAS = ['Bole', 'Kazanchis', 'Megenagna', 'Piassa']

export function validate(form) {
  const errors = {}

  if (!form.name || !form.name.trim()) {
    errors.name = 'Full name is required'
  } else if (form.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters'
  }

  if (!form.phone || !form.phone.trim()) {
    errors.phone = 'TeleBirr phone number is required'
  } else if (!TELEBIRR_RE.test(form.phone.trim())) {
    errors.phone = 'Use 09XXXXXXXX or +2519XXXXXXXX'
  }

  if (!form.area || !VALID_AREAS.includes(form.area)) {
    errors.area = 'Please select a valid delivery area'
  }

  if (form.notes && form.notes.length > 200) {
    errors.notes = 'Notes must not exceed 200 characters'
  }

  return errors
}
