import { gql } from "apollo-boost";

export const typeDefs = gql`
    extend type Mutation {
        ToggleCartDropdownHidden: Boolean!
    }
`;

const GET_CART_DROPDOWN_HIDDEN = gql`
    {
        cartDropdownHidden @client
    }
`;

export const resolvers = {
    Mutation: {
        toggleCartDropdownHidden: (_root, _args, _context, _info) => {
            const { cache } = _context;
            const data = cache.readQuery({
                query: GET_CART_DROPDOWN_HIDDEN
            });

            const { cartDropdownHidden } = data;

            cache.writeQuery({
                query: GET_CART_DROPDOWN_HIDDEN,
                data: { cartDropdownHidden: !cartDropdownHidden }
            });

            return !cartDropdownHidden;
        }
    }
}