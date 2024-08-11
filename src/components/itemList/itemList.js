import { ListGroup, ListGroupItem } from 'reactstrap';
import React, {Component} from 'react';

import GotService from '../../services/gotService';
import Spinner from '../spinner';
import styled from 'styled-components';

const ItemListBlock = styled.div`
    .item-list .list-group-item {
        cursor: pointer;
    }
`

export default class ItemList extends Component {
    gotService = new GotService();

    state = {
        charList: null
    }

    componentDidMount() {
        this.gotService.getAllCharacters()
            .then( (charList) => {
                this.setState({
                    charList: charList
                })
            })
    }

    render() {
        const {charList} = this.state;

        if (!charList) {
            return <Spinner/>
        }

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