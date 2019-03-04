import React, { Component } from "react";
import { Query } from "react-apollo";
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
            <th>Name</th>
            <th>Email</th>
            {possiblePermissions.map(perm => (
              <th>{perm}</th>
            ))}
            <th>👇</th>
          </thead>
          <tbody>
            {data.users.map(user => (
              <UserRow user={user} />
            ))}
          </tbody>
        </Table>
      </div>
    )}
  </Query>
);

class UserRow extends Component {
  render() {
    const {
      user: { name, email, id }, // eslint-disable-line react/prop-types
    } = this.props;

    return (
      <tr>
        <td>{name}</td>
        <td>{email}</td>
        {possiblePermissions.map(permission => (
          <td>
            <label htmlFor={`${id}-permission-${permission}`}>
              <input type="checkbox" />
            </label>
          </td>
        ))}
        <td>
          <SickButton>Update</SickButton>
        </td>
      </tr>
    );
  }
}

export default Permissions;
