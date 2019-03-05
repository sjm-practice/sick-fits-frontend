import React from "react";
import PropTypes from "prop-types";
import Reset from "../components/Reset";

const ResetPage = ({ query: { resetToken } }) => (
  <div>
    <Reset resetToken={resetToken} />
  </div>
);

ResetPage.propTypes = {
  query: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default ResetPage;
