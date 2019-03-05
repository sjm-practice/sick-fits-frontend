import React, { Component } from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Form from "./styles/Form";
import ErrorMessage from "./ErrorMessage";
import { CURRENT_USER_QUERY } from "./User";

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $resetToken: String!
    $password: String!
    $confirmPassword: String!
  ) {
    resetPassword(
      resetToken: $resetToken
      password: $password
      confirmPassword: $confirmPassword
    ) {
      id
      email
      name
    }
  }
`;

class Reset extends Component {
  static propTypes = {
    resetToken: PropTypes.string.isRequired,
  };

  state = {
    password: "",
    confirmPassword: "",
  };

  saveToState = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = async (e, reset) => {
    e.preventDefault();
    await reset();
    this.setState({
      password: "",
      confirmPassword: "",
    });
  };

  render() {
    const { password, confirmPassword } = this.state;
    const { resetToken } = this.props;

    // ! Important to set Form method to 'post' to prevent showing password
    // ! in url bar on form errors

    return (
      <Mutation
        mutation={RESET_MUTATION}
        variables={{
          resetToken,
          password,
          confirmPassword,
        }}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(reset, { error, loading }) => (
          <Form method="post" onSubmit={e => this.handleSubmit(e, reset)}>
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Reset Your Password</h2>
              <ErrorMessage error={error} />
              <label htmlFor="password">
                Password
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  value={password}
                  onChange={this.saveToState}
                />
              </label>
              <label htmlFor="confirmPassword">
                Confirm Password
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="confirm password"
                  value={confirmPassword}
                  onChange={this.saveToState}
                />
              </label>
              <button type="submit">Reset Password</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default Reset;
