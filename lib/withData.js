import withApollo from "next-with-apollo";
import ApolloClient from "apollo-boost";
import { endpoint, prodEndpoint } from "../config";
import { LOCAL_STATE_QUERY } from "../components/Cart";

function createClient({ headers }) {
  const ept = process.env.NODE_ENV === "development" ? endpoint : prodEndpoint;
  console.log("endpoint:", ept);

  return new ApolloClient({
    uri: ept,
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: "include",
        },
        headers,
      });
    },
    // local data
    clientState: {
      resolvers: {
        Mutation: {
          toggleCart(_, variables, client) {
            const { cache } = client;

            const { cartOpen } = cache.readQuery({
              query: LOCAL_STATE_QUERY,
            });

            const data = {
              data: {
                cartOpen: !cartOpen,
              },
            };

            cache.writeData(data);

            return data;
          },
        },
      },
      defaults: {
        cartOpen: false,
      },
    },
  });
}

export default withApollo(createClient);
