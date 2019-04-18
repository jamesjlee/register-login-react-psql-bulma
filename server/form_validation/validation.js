module.exports = {
  regex: {
    emailRe: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
    passwordRe: new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    ),
    phoneRe: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
    nameRe: new RegExp("^(?=.{1,40}$)[a-zA-Z]+(?:[-'s][a-zA-Z]+)*$")
  }
};
