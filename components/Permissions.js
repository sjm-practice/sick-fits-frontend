import React, { Component } from "react";
import PropTypes from "prop-types";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import Error from "./ErrorMessage";
import Table from "./styles/Table";
import SickButton from "./styles/SickButton";

const possiblePermissions = [
  "ADMIN",
  "USER",
  "ITEMCREATE",
  "ITEMUPDATE",
  "ITEMDELETE",
  "PERMISSIONUPDATE",
];

const UPDATE_PERMISSIONS_MUTATION = gql`
  mutation UPDATE_PERMISSIONS_MUTATION($permissions: [Permission], $userId: ID!) {
    updatePermissions(permissions: $permissions, userId: $userId) {
      id
      permissions
      name
      email
    }
  }
`;

const ALL_USERS_QUERY = gql`
  query ALL_USERS_QUERY {
    users {
      id
      name
      email
      permissions
    }
  }
`;

const Permissions = () => (
  <Query query={ALL_USERS_QUERY}>
    {({ data, loading, error }) => (
      <div>
        {loading && <p>Loading...</p>}
        <Error error={error} />
        <h2>Manage Permissions</h2>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              {possiblePermissions.map(perm => (
                <th key={perm}>{perm}</th>
              ))}
              <th>👇</th>
            </tr>
          </thead>
          <tbody>
            {data.users.map(user => (
              <UserRow user={user} key={user.id} />
            ))}
          </tbody>
        </Table>
      </div>
    )}
  </Query>
);

class UserRow extends Component {
  static propTypes = {
    user: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      id: PropTypes.string,
      permissions: PropTypes.array,
    }).isRequired,
  };

  state = {
    permissions: this.props.user.permissions, // seed state with user permissions from props
  };

  handlePermissionChange = ({ target: { value, checked } }) => {
    const { permissions } = this.state;

    let updatedPermissions = [...permissions];
    if (checked) {
      updatedPermissions.push(value);
    } else {
      updatedPermissions = updatedPermissions.filter(perm => perm !== value);
    }
    this.setState({ permissions: updatedPermissions });
  };

  render() {
    const {
      user: { name, email, id },
    } = this.props;
    const { permissions } = this.state;

    return (
      <Mutation
        mutation={UPDATE_PERMISSIONS_MUTATION}
        variables={{
          permissions,
          userId: id,
        }}
      >
        {(updatePermissions, { loading, error }) => (
          <>
            {error && (
              <tr>
                <td colSpan="8">
                  <Error error={error} />
                </td>
              </tr>
            )}
            <tr>
              <td>{name}</td>
              <td>{email}</td>
              {possiblePermissions.map(permission => (
                <td key={permission}>
                  <label htmlFor={`${id}-permission-${permission}`}>
                    <input
                      id={`${id}-permission-${permission}`}
                      type="checkbox"
                      checked={permissions.includes(permission)}
                      value={permission}
                      onChange={this.handlePermissionChange}
                    />
                  </label>
                </td>
              ))}
              <td>
                <SickButton type="button" disabled={loading} onClick={updatePermissions}>
                  Updat{loading ? "ing" : "e"}
                </SickButton>
              </td>
            </tr>
          </>
        )}
      </Mutation>
    );
  }
}

export default Permissions;
