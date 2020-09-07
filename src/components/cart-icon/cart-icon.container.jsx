import React from 'react';
import { Mutation, Query } from "react-apollo";
import { gql } from "apollo-boost";

import CartIcon from './cart-icon.component';

const TOGGLE_CART_DROPDOWN = gql`
    mutation ToggleCartDropdownHidden {
        toggleCartDropdownHidden @client
    }
`;

const GET_CART_ICON = gql`
    {
        itemCount @client
    }
`;

const CartIconContainer = () => (
    <Query query={GET_CART_ICON}>
        {
            ({data: { itemCount}}) => (
                <Mutation mutation={TOGGLE_CART_DROPDOWN}>
                    {
                        toggleCartDropdown => <CartIcon itemCount={itemCount} toggleCartHidden={toggleCartDropdown} />
                    }
                </Mutation>
            )
        }
    </Query>
);

export default CartIconContainer;