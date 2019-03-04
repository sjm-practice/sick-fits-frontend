import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import { CURRENT_USER_QUERY } from "./User";
import Signin from "./Signin";

const PleaseSignIn = ({ children }) => (
  <Query query={CURRENT_USER_QUERY}>
    {({ data, loading }) => {
      if (loading) return <p>Loading...</p>;
      return !data.me ? (
        <Fragment>
          <p>Please sign in before continuing...</p>
          <Signin />
        </Fragment>
      ) : (
        children
      );
    }}
  </Query>
);

PleaseSignIn.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PleaseSignIn;
