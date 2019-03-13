import React, { Component } from "react";
// import Downshift from "downshift";
// import Router from "next/router";
import { ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import debounce from "lodash.debounce";
import { DropDown, DropDownItem, SearchStyles } from "./styles/DropDown";

const SEARCH_ITEMS_QUERY = gql`
  query SEARCH_ITEMS_QUERY($searchTerm: String!) {
    items(
      where: {
        OR: [{ title_contains: $searchTerm }, { description_contains: $searchTerm }]
      }
    ) {
      id
      image
      title
    }
  }
`;

class AutoComplete extends Component {
  state = {
    items: [],
    loading: false,
  };

  onChange = debounce(async (e, client) => {
    const {
      target: { value },
    } = e;

    this.setState({ loading: true });

    // manually query apollo client
    const res = await client.query({
      query: SEARCH_ITEMS_QUERY,
      variables: { searchTerm: value },
    });

    this.setState({
      items: [...res.data.items],
      loading: false,
    });
  }, 350);

  render() {
    const { items } = this.state;
    return (
      <SearchStyles>
        <div>
          <ApolloConsumer>
            {client => (
              <input
                type="search"
                onChange={e => {
                  e.persist();
                  this.onChange(e, client);
                }}
              />
            )}
          </ApolloConsumer>

          <DropDown>
            {items.map(({ id, image, title }) => (
              <DropDownItem key={id}>
                <img src={image} width="50" alt={title} />
                {title}
              </DropDownItem>
            ))}
          </DropDown>
        </div>
      </SearchStyles>
    );
  }
}

export default AutoComplete;
