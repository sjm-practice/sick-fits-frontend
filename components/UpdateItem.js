import React, { Component } from "react";
import PropTypes from "prop-types";
import { Mutation, Query } from "react-apollo";
import Router from "next/router";
import gql from "graphql-tag";
import Form from "./styles/Form";
import ErrorMessage from "./ErrorMessage";
import formatMoney from "../lib/formatMoney";

export const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      price
    }
  }
`;

export const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $id: ID!
    $title: String
    $description: String
    $price: Int
  ) {
    updateItem(id: $id, title: $title, description: $description, price: $price) {
      id
    }
  }
`;

class UpdateItem extends Component {
  state = {};

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;

    this.setState({ [name]: val });
  };

  handleSubmit = async (e, updateItem) => {
    e.preventDefault();
    const { id } = this.props;
    const res = await updateItem({
      variables: {
        id,
        ...this.state,
      },
    });
    console.log(res);
  };

  render() {
    const { title, price, description } = this.state;
    const { id } = this.props;

    return (
      <Query query={SINGLE_ITEM_QUERY} variables={{ id }}>
        {({ data, loading }) => {
          if (loading) return <p>Loading...</p>;
          if (!data.item) return <p>No Item found for ID {id}.</p>;
          return (
            <Mutation mutation={UPDATE_ITEM_MUTATION} variables={this.state}>
              {(updateItem, { loading, error }) => (
                <Form onSubmit={e => this.handleSubmit(e, updateItem)}>
                  <ErrorMessage error={error} />
                  <fieldset disabled={loading} aria-busy={loading}>
                    <label htmlFor="title">
                      Title
                      <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Title"
                        required
                        defaultValue={data.item.title}
                        onChange={this.handleChange}
                      />
                    </label>

                    <label htmlFor="price">
                      Price
                      <input
                        type="number"
                        id="price"
                        name="price"
                        required
                        defaultValue={data.item.price}
                        onChange={this.handleChange}
                      />
                    </label>

                    <label htmlFor="description">
                      Description
                      <textarea
                        id="description"
                        name="description"
                        placeholder="Enter A Description"
                        required
                        defaultValue={data.item.description}
                        onChange={this.handleChange}
                      />
                    </label>
                  </fieldset>
                  <button type="submit">Sav{loading ? "ing" : "e"} Changes</button>
                </Form>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

UpdateItem.propTypes = {
  id: PropTypes.string.isRequired,
};

export default UpdateItem;
