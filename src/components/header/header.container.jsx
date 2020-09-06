import React from 'react';
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

import Header from './header.component';

const GET_CART_DROPDOWN_HIDDEN = gql`{
    cartDropdownHidden @client
}`;

const HeaderContainer = () => (
    <Query query={GET_CART_DROPDOWN_HIDDEN}>
        {
            ({ data: { cartDropdownHidden }}) => <Header hidden={cartDropdownHidden} />
        }
    </Query>
);

export default HeaderContainer;