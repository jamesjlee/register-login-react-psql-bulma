export const emailRe = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
export const email = (value) =>
  value && !emailRe.test(value) ? "Invalid email address" : undefined;

export const required = (value) => (value ? undefined : "Required");

export const passwordRe = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
);
export const password = (value) =>
  value && !passwordRe.test(value) ? "Invalid password" : undefined;

export const phoneRe = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
export const phoneNumber = (value) =>
  value && !phoneRe.test(value) ? "Invalid phone number" : undefined;

export const nameRe = new RegExp("^(?=.{1,40}$)[a-zA-Z]+(?:[-'s][a-zA-Z]+)*$");
export const name = (value) =>
  value && !nameRe.test(value) ? "Invalid name" : undefined;

export const passwordsMatch = (value, allValues) =>
  value !== allValues.user_password ? "Passwords do not match" : undefined;
