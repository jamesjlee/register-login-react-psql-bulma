import React, { useEffect } from "react";
import { connect } from "react-redux";

export default (OriginalComponent) => {
  function MixedComponent(props) {
    useEffect(() => {
      if (!props.isAuth && !props.jwtToken) {
        props.history.push("/login");
      }
    });

    return <OriginalComponent {...props} />;
  }

  function mapStateToProps(state) {
    return {
      isAuth: state.auth.isAuthenticated,
      jwtToken: state.auth.token
    };
  }
  return connect(mapStateToProps)(MixedComponent);
};
