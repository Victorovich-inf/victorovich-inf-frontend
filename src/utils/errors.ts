import { showToast } from './toast';

interface ErrorValidationMessage {
  location: string
  msg: string
  param: string
  value: string
}

export interface ErrorValidation {
  error: {
    data: ErrorValidationMessage[] | {message: string},
    status: number
  }
}

export function showErrors (errors: ErrorValidation) {
  let error = '';
  if (Array.isArray(errors.error.data)) {
    error = errors.error.data.map(el => el.msg).join(', ');
  } else if (errors.error.data?.message) {
    error = errors.error.data?.message;
  }
  return showToast({variant: 'close', content: error})
}

export function showMessage (message: string) {
  return showToast({variant: 'check', content: message})
}
