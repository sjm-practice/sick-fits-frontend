import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import Link from "next/link";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { perPage } from "../config";
import PaginationStyles from "./styles/PaginationStyles";

export const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    itemsConnection {
      aggregate {
        count
      }
    }
  }
`;

const Pagination = ({ page }) => (
  <Query query={PAGINATION_QUERY}>
    {({ data, loading }) => {
      if (loading) return <p>Loading...</p>;
      const {
        itemsConnection: {
          aggregate: { count },
        },
      } = data;

      const pages = Math.ceil(count / perPage);

      return (
        <PaginationStyles data-test="pagination">
          <Head>
            <title>
              Sick Fits! - {page} of {pages}
            </title>
          </Head>
          <Link
            prefetch
            href={{
              pathname: "items",
              query: { page: page - 1 },
            }}
          >
            <a className="prev" aria-disabled={page <= 1}>
              Prev
            </a>
          </Link>
          <p>
            Page {page} of <span className="totalPages">{pages}</span>
          </p>
          <p>{count} Items Total</p>
          <Link
            prefetch
            href={{
              pathname: "items",
              query: { page: page + 1 },
            }}
          >
            <a className="next" aria-disabled={page >= pages}>
              Next
            </a>
          </Link>
        </PaginationStyles>
      );
    }}
  </Query>
);

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
};

export default Pagination;
