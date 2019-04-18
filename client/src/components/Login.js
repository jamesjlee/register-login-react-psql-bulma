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

function Login(props) {
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
    await props.login(values);
    if (!props.loginErrMessage) {
      props.history.push("/collection");
    }
  }

  async function responseGoogle(response) {
    await props.oauthGoogle(response.accessToken);
    if (!props.loginErrMessage) {
      props.history.push("/collection");
    }
  }

  // const { handleSubmit } = props;

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
                  user_email: "",
                  user_password: ""
                }}
                onSubmit={handleSubmit}
                validationSchema={LoginSchema}
              >
                <Form className="box">
                  <fieldset>
                    <div className="field has-text-centered">
                      Login form with Bulma
                    </div>
                    <Field
                      className="field"
                      name="user_email"
                      type="email"
                      id="login_user_email"
                      label="Email"
                      placeholder="e.g. johndoe@gmail.com"
                      icon="fa fa-envelope"
                      component={CustomInput}
                      // validate={[validation.email, validation.required]}
                    />

                    <Field
                      className="field"
                      name="user_password"
                      type="password"
                      id="login_user_password"
                      label="Password"
                      placeholder="********"
                      icon="fa fa-lock"
                      component={CustomInput}
                      // validate={[validation.password, validation.required]}
                    />
                  </fieldset>

                  {props.loginErrMessage ? (
                    <div
                      className="message is-danger is-small"
                      style={styles.notificationErrorMessage}
                    >
                      <div className="message-body">
                        {props.loginErrMessage}
                      </div>
                    </div>
                  ) : null}

                  <div className="field has-text-centered">
                    <button
                      className="button is-success"
                      style={styles.registerBtn}
                    >
                      Login
                    </button>
                  </div>
                </Form>
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

const LoginSchema = Yup.object().shape({
  user_email: Yup.string()
    .email("Invalid email")
    .required("Required"),
  user_password: Yup.string()
    .matches(validation.passwordRe, "Invalid password")
    .required("Required")
});

function mapStateToProps(state) {
  return {
    loginErrMessage: state.auth.errMessage
  };
}
export default compose(
  connect(
    mapStateToProps,
    actions
  )
  // reduxForm({ form: "login" })
)(Login);
