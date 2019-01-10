export function email(value) {
  let error;

  if (!value) {
    error = '*Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address';
  }

  return error;
}

const AMAZON_URL = /^https?:\/\/(www|smile)\.amazon\.com\/([A-Za-z0-9-_]+)\/(?:gp|dp|asin)\/(\w{6,12})/i;

export function link(value) {
  let error;

  if (value && !AMAZON_URL.test(value)) {
    error = `Incorrect format, be sure to copy and paste the entire URL.`;
  }

  return error;
}

const maxLength = 32;
const minLength = 4;

export function password(value) {
  let error;
  let passwordLength = value.length;

  if (!value) {
    error = '*Required';
  } else if (/[^a-zA-Z0-9!@#$%^&]/.test(value)) {
    error =
      'Passwords may only contain alphanumeric or any of the following special characters: !@#$%^&';
  } else if (passwordLength < minLength || passwordLength > maxLength) {
    error = 'Passwords must be between 4 and 32 characters in length. ';
  }

  return error;
}

export function required(value) {
  let error;

  if (!value) {
    error = '*Required';
  }

  return error;
}
