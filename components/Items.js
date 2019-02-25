import React, { Component } from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Item from "./Item";
import Pagination from "./Pagination";

export const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY {
    items {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`;

const Center = styled.div`
  text-align: center;
`;

const ItemsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`;

class Items extends Component {
  static propTypes = {
    page: PropTypes.number.isRequired,
  };

  render() {
    const { page } = this.props;
    return (
      <Center>
        <Pagination page={page} />
        <Query query={ALL_ITEMS_QUERY}>
          {({ data, error, loading }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error: {error.message}</p>;
            return (
              <ItemsList>
                {data.items.map(item => (
                  <Item key={item.id} item={item} />
                ))}
              </ItemsList>
            );
          }}
        </Query>
        <Pagination />
      </Center>
    );
  }
}

export default Items;
