import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Form from "./styles/Form";
import ErrorMessage from "./ErrorMessage";

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`;

class RequestReset extends Component {
  state = {
    email: "",
  };

  saveToState = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = async (e, reset) => {
    e.preventDefault();
    await reset();
    this.setState({ email: "" });
  };

  render() {
    const { email, password } = this.state;

    // ! Important to set Form method to 'post' to prevent showing password
    // ! in url bar on form errors

    return (
      <Mutation mutation={REQUEST_RESET_MUTATION} variables={this.state}>
        {(reset, { error, loading, called }) => (
          <Form method="post" onSubmit={e => this.handleSubmit(e, reset)}>
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Request Password Reset</h2>
              <ErrorMessage error={error} />
              {!error && !loading && called && (
                <p>Success! Check your email for a reset link.</p>
              )}
              <label htmlFor="email">
                Email
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  value={email}
                  onChange={this.saveToState}
                />
              </label>
              <button type="submit">Request Reset!</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default RequestReset;
