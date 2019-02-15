import React, { Component } from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

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
      deleteItem();
    }
  };

  render() {
    const { children, id } = this.props;

    return (
      <Mutation mutation={DELETE_ITEM_MUTATION} variables={{ id }}>
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
