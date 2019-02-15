import React from "react";
import PropTypes from "prop-types";
import SingleItem from "../components/SingleItem";

const Item = ({ query }) => (
  <div>
    <SingleItem id={query.id} />
  </div>
);

Item.propTypes = {
  query: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default Item;
