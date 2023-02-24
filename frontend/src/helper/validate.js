import toast from 'react-hot-toast';

/** validate login form */
export async function loginValidate(values) {
  const errors = loginVerify({}, values);
  return errors;
}

/** validate register form */
export async function registerValidation(values) {
  const errors = usernameVerify({}, values);
  passwordVerify(errors, values);
  emailVerify(errors, values);
  userTypeVerify(errors, values);

  return errors;
}

/** validate reset password */
export async function resetPasswordValidation(values) {
  const errors = passwordVerify({}, values);

  if (values.password !== values.confirm_pwd) {
    errors.exist = toast.error('Password not match!');
  }

  return errors;
}

/** validate profile page */
export async function profileValidation(values) {
  const errors = emailVerify({}, values);
  return errors;
}

/** validate Login username and Password */
function loginVerify(error = {}, values) {
  if (!values.username) {
    error.username = toast.error('Username Required!');
  } else if (values.username.includes(' ')) {
    error.username = toast.error('Invalid Username!');
  }

  /* eslint-disable no-useless-escape */
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  const numbersPwd = /[1, 2, 3, 4, 5, 6, 7, 8, 9, 0]/;

  if (!values.password) {
    error.password = toast.error('Password Required!');
  } else if (values.password.includes(' ')) {
    error.password = toast.error('Wrong Password!');
  } else if (values.password.length < 4) {
    error.password = toast.error(
      'Password must be more than 4 characters long'
    );
  } else if (!specialChars.test(values.password)) {
    error.password = toast.error('Password must have special character');
  } else if (!numbersPwd.test(values.password)) {
    error.password = toast.error('Password must have at least one number');
  }
}

/** validate Password for reset component*/
function passwordVerify(error = {}, values) {
  /* eslint-disable no-useless-escape */
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  const numbersPwd = /[1, 2, 3, 4, 5, 6, 7, 8, 9, 0]/;

  if (!values.password) {
    error.password = toast.error('Password Required!');
  } else if (values.password.includes(' ')) {
    error.password = toast.error('Wrong Password!');
  } else if (values.password.length < 4) {
    error.password = toast.error(
      'Password must be more than 4 characters long'
    );
  } else if (!specialChars.test(values.password)) {
    error.password = toast.error('Password must have special character');
  } else if (!numbersPwd.test(values.password)) {
    error.password = toast.error('Password must have at least one number');
  }
}

/** validate username */
function usernameVerify(error = {}, values) {
  if (!values.username) {
    error.username = toast.error('Username Required!');
  } else if (values.username.includes(' ')) {
    error.username = toast.error('Invalid Username!');
  }

  return error;
}

/** validate email */
function emailVerify(error = {}, values) {
  if (!values.email) {
    error.email = toast.error('Email Required!');
  } else if (values.email.includes(' ')) {
    error.email = toast.error('Wrong Email...!');
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    error.email = toast.error('Invalid email address!');
  }

  return error;
}

/** validate userType */
function userTypeVerify(error = {}, values) {
  if (!values.userType) {
    error.userType = toast.error('Please select user type');
  }

  return error;
}
