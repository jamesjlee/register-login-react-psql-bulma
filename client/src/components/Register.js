import React from "react";
// import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { compose } from "redux";
import GoogleLogin from "react-google-login";
import Header from "../components/Header";
import Footer from "../components/Footer";
import * as validation from "../form_validation/validation";

import * as actions from "../actions";
import CustomInput from "./CustomInput";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useThemeValue } from "./ThemeContext";

// import { useTheme } from "./HeaderUserControls";

function Register(props) {
  const [state, dispatch] = useThemeValue();

  let styles = {
    marginRight: ".5rem"
  };

  styles.registerBtn = {
    marginTop: "1rem"
  };

  styles.notificationErrorMessage = {
    marginTop: "1rem"
  };

  async function handleSubmit(values) {
    await props.register(values);
    console.log(props.registerErrMessage);
    if (!!props.registerErrMessage) {
      props.history.push("/collection");
    }
  }

  async function responseGoogle(response) {
    await props.oauthGoogle(response.accessToken);
    if (!props.registerErrMessage) {
      props.history.push("/collection");
    }
  }

  const googleClientId = process.env.REACT_APP_GOOGLE_ID;

  return (
    <section className={`hero is-fullheight ` + `${state.style}`}>
      <Header />
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-6-tablet is-5-desktop is-4-widescreen">
              <Formik
                initialValues={{
                  user_first_name: "",
                  user_last_name: "",
                  user_phone_number: "",
                  user_email: "",
                  user_password: "",
                  user_confirm_password: ""
                }}
                onSubmit={handleSubmit}
                validationSchema={RegisterSchema}
              >
                {({
                  values,
                  errors,
                  touched,
                  isSubmitting,
                  handleSubmit,
                  handleBlur,
                  handleChange
                }) => (
                  <Form className="box" onSubmit={handleSubmit}>
                    <fieldset>
                      <div className="field has-text-centered">
                        Register form with Bulma
                      </div>
                      <Field
                        className="field"
                        name="user_first_name"
                        id="user_first_name"
                        type="text"
                        label="First Name"
                        placeholder="e.g. John"
                        icon="fa fa-envelope"
                        value={values.user_first_name}
                        component={CustomInput}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        touched={touched}
                        errors={errors}
                      />
                      <Field
                        className="field"
                        name="user_last_name"
                        id="user_last_name"
                        type="text"
                        label="Last Name"
                        placeholder="e.g. Doe"
                        icon="fa fa-envelope"
                        value={values.user_last_name}
                        component={CustomInput}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        touched={touched}
                        errors={errors}
                      />

                      <Field
                        className="field"
                        name="user_phone_number"
                        id="user_phone_number"
                        type="text"
                        label="Phone Number"
                        placeholder="e.g. 703-123-1234"
                        icon="fa fa-phone"
                        value={values.user_phone_number}
                        component={CustomInput}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        touched={touched}
                        errors={errors}
                      />

                      <Field
                        className="field"
                        name="user_email"
                        id="user_email"
                        type="email"
                        label="Email"
                        placeholder="e.g. johndoe@gmail.com"
                        icon="fa fa-envelope"
                        value={values.user_email}
                        component={CustomInput}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        touched={touched}
                        errors={errors}
                      />

                      <Field
                        className="field"
                        name="user_password"
                        id="user_password"
                        type="password"
                        label="Password"
                        placeholder="********"
                        icon="fa fa-lock"
                        value={values.user_password}
                        component={CustomInput}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        touched={touched}
                        errors={errors}
                      />

                      <Field
                        className="field"
                        name="user_confirm_password"
                        id="user_confirm_password"
                        type="password"
                        label="Confirm Password"
                        placeholder="********"
                        icon="fa fa-lock"
                        value={values.user_confirm_password}
                        component={CustomInput}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        touched={touched}
                        errors={errors}
                      />
                    </fieldset>

                    {props.registerErrMessage ? (
                      <div
                        className="message is-danger is-small"
                        style={styles.notificationErrorMessage}
                      >
                        <div className="message-body">
                          {props.registerErrMessage}
                        </div>
                      </div>
                    ) : null}

                    <div className="field has-text-centered">
                      <button
                        className="button is-success"
                        style={styles.registerBtn}
                        type="submit"
                      >
                        Register
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>

              <div className="column has-text-centered">
                <div className="is-divider" data-content="OR" />
              </div>

              <div className="column has-text-centered">
                <GoogleLogin
                  clientId={googleClientId}
                  scope="profile"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  buttonText="Login With Google"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}

const RegisterSchema = Yup.object().shape({
  user_first_name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  user_last_name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  user_email: Yup.string()
    .email("Invalid email")
    .required("Required"),
  user_phone_number: Yup.string()
    .matches(validation.phoneRe, "Invalid phone number")
    .required("Required"),
  user_password: Yup.string()
    .matches(validation.passwordRe, "Invalid password")
    .required("Required"),
  user_confirm_password: Yup.string()
    .oneOf([Yup.ref("user_password")], "Passwords do not match")
    .required("Password confirm is required")
});

function mapStateToProps(state) {
  return {
    registerErrMessage: state.auth.errMessage
  };
}

export default compose(
  connect(
    mapStateToProps,
    actions
  )
  // reduxForm({ form: "register" })
)(Register);
