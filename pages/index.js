import React from "react";
import PropTypes from "prop-types";
import Items from "../components/Items";

const Home = ({ query: { page } }) => (
  <div>
    <Items page={parseFloat(page) || 1} />
  </div>
);

Home.propTypes = {
  query: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default Home;
