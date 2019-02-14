import React, { Component } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import Title from "./styles/Title";
import ItemStyles from "./styles/ItemStyles";
import PriceTag from "./styles/PriceTag";

class Item extends Component {
  render() {
    const { item } = this.props;

    return (
      <ItemStyles>
        <Title>
          <Link
            href={{
              pathname: "/item",
              query: { id: item.id },
            }}
          >
            <a>{item.title}</a>
          </Link>
        </Title>
        <div>
          <PriceTag>{item.price}</PriceTag>
        </div>
      </ItemStyles>
    );
  }
}

Item.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    largeImage: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
};

export default Item;
