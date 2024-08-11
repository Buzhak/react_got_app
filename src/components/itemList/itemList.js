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

    renderItems(arr) {
        return  arr.map((item, k) => {
            return (
                <ListGroupItem 
                    key={k}
                    // onClick={this.props.onCharSelected(k)}
                    >
                    {item.name}
                </ListGroupItem>
            )
        })
    }

    render() {
        const {charList} = this.state;

        if (!charList) {
            return <Spinner/>
        }

        const items = this.renderItems(charList)

        return (
            <ItemListBlock>
                <ListGroup className="item-list">
                    {items}
                </ListGroup>
            </ItemListBlock>
        );
    }
}