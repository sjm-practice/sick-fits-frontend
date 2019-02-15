import React from "react";
import PropTypes from "prop-types";
import UpdateItem from "../components/UpdateItem";

const Update = ({ query }) => (
  <div>
    <UpdateItem id={query.id} />
  </div>
);

Update.propTypes = {
  query: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default Update;
