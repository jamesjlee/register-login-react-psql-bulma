import React from "react";

export default function CustomInput(props) {
  const {
    field: { name, value, onChange },
    form: { touched, onFocus, errors }
  } = props;
  return (
    <>
      <label className="label" htmlFor={props.id}>
        {props.label}
      </label>
      <div
        className={[
          touched[name] && errors[name]
            ? "control has-icons-left has-background-danger"
            : "control has-icons-left",
          onFocus ? "is-active" : ""
        ].join(" ")}
      >
        <input
          name={name}
          className="input is-rounded"
          type={props.type}
          placeholder={props.placeholder}
          value={value}
          onChange={onChange}
        />

        <span className="icon is-small is-left">
          <i className={`${props.icon}`} />
        </span>
      </div>
      {touched[name] &&
        ((errors[name] && (
          <article className="message is-danger is-small">
            <div className="message-body">{errors[name]}</div>
          </article>
        )) ||
          (errors[name] && <div>{errors[name]}</div>))}
    </>
  );
}
