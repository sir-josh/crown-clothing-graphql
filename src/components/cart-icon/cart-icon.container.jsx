import React from 'react';
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";

import CartIcon from './cart-icon.component';

const TOGGLE_CART_DROPDOWN = gql`
    mutation ToggleCartDropdownHidden {
        toggleCartDropdownHidden @client
    }
`;

const CartIconContainer = () => (
    <Mutation mutation={TOGGLE_CART_DROPDOWN}>
        {
            toggleCartDropdown => <CartIcon toggleCartHidden={toggleCartDropdown} />
        }
    </Mutation>
);

export default CartIconContainer;