import React from 'react';
import { Mutation, Query, graphql } from "react-apollo";
import { gql } from "apollo-boost";
import { flowRight } from "lodash";

import CartIcon from './cart-icon.component';

const TOGGLE_CART_DROPDOWN = gql`
    mutation ToggleCartDropdownHidden {
        toggleCartDropdownHidden @client
    }
`;

const GET_ITEM_COUNT = gql`
    {
        itemCount @client
    }
`;

// const CartIconContainer = () => (
//     <Query query={GET_ITEM_COUNT}>
//         {
//             ({data: { itemCount}}) => (
//                 <Mutation mutation={TOGGLE_CART_DROPDOWN}>
//                     {
//                         toggleCartDropdown => <CartIcon itemCount={itemCount} toggleCartHidden={toggleCartDropdown} />
//                     }
//                 </Mutation>
//             )
//         }
//     </Query>
// );

const CartIconContainer = ({data: { itemCount }, toggleCartHidden}) => ( 
    <CartIcon itemCount={itemCount} toggleCartHidden={toggleCartHidden} />
);

export default flowRight(
    graphql(TOGGLE_CART_DROPDOWN, { name: "toggleCartHidden" }),
    graphql(GET_ITEM_COUNT)
)(CartIconContainer);