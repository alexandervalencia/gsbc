export function email(value) {
  let error;

  if (!value) {
    error = '*Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address';
  }

  return error;
}

export function link(value) {
  let error;

  if (!value) {
    error = '*Required';
  }

  return error;
}

export function password(value) {
  let error;

  if (!value) {
    error = '*Required';
  } else if (3 > value.length) {
    error = 'Passwords are a minimum of four characters in length';
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
