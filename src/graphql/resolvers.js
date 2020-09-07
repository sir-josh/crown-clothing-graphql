import { gql } from "apollo-boost";

import { addItemToCart } from "./cart.utils";

export const typeDefs = gql`
    extend type Item {
        quantity: Int
    }

    extend type Mutation {
        ToggleCartDropdownHidden: Boolean!
        AddItemToCart(item: Item!): [Item]!
    }
`;

const GET_CART_DROPDOWN_HIDDEN = gql`
    {
        cartDropdownHidden @client
    }
`;

const GET_CART_ITEMS = gql`
    {
        cartItems @client
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
        },

        addItemToCart: (__root, { item }, { cache }) => {
            const { cartItems } = cache.readQuery({
                query: GET_CART_ITEMS
            });

            const newCartItems = addItemToCart(cartItems, item);

            cache.writeQuery({
                query: GET_CART_ITEMS,
                data: { cartItems: newCartItems }
            });

            return newCartItems;
        }
    }
}