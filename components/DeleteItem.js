import React, { Component } from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { ALL_ITEMS_QUERY } from "./Items";

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`;

class DeleteItem extends Component {
  handleDelete = deleteItem => {
    // eslint-disable-next-line no-alert
    if (confirm("Are you sure you want to delete this item?")) {
      deleteItem().catch(err => alert(err.message));
    }
  };

  update = (cache, payload) => {
    // manually update client cache, to match server
    // 1. read the cache for the items we want
    const data = cache.readQuery({ query: ALL_ITEMS_QUERY });
    // 2. filter deleted item out of cache
    data.items = data.items.filter(item => item.id !== payload.data.deleteItem.id);
    // 3. put the items back in cache
    cache.writeQuery({ query: ALL_ITEMS_QUERY, data });
  };

  render() {
    const { children, id } = this.props;

    return (
      <Mutation mutation={DELETE_ITEM_MUTATION} variables={{ id }} update={this.update}>
        {(deleteItem, { error }) => (
          <button type="button" onClick={() => this.handleDelete(deleteItem)}>
            {children}
          </button>
        )}
      </Mutation>
    );
  }
}

DeleteItem.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
};

export default DeleteItem;
