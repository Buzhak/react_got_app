// import './itemList.css';

import { ListGroup, ListGroupItem } from 'reactstrap';
import React, {Component} from 'react';

import styled from 'styled-components';

const ItemListBlock = styled.div`
    .item-list .list-group-item {
        cursor: pointer;
    }
`

export default class ItemList extends Component {

    render() {
        return (
            <ItemListBlock>
                <ListGroup className="item-list">
                    <ListGroupItem>
                        John Snow
                    </ListGroupItem>
                    <ListGroupItem>
                        Brandon Stark
                    </ListGroupItem>
                    <ListGroupItem>
                        Geremy
                    </ListGroupItem>
                </ListGroup>
            </ItemListBlock>
        );
    }
}